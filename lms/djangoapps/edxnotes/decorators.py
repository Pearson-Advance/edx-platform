"""
Decorators related to edXNotes.
"""


import json

from django.conf import settings
from xblock.exceptions import NoSuchServiceError
from openedx.core.djangoapps.plugins.plugins_hooks import run_extension_point

from common.djangoapps.edxmako.shortcuts import render_to_string
from common.djangoapps.student.auth import is_ccx_course


def edxnotes(cls):
    """
    Decorator that makes components annotatable.
    """
    original_get_html = cls.get_html

    def get_html(self, *args, **kwargs):
        """
        Returns raw html for the component.
        """
        # Import is placed here to avoid model import at project startup.
        from .helpers import (
            generate_uid, get_edxnotes_id_token, get_public_endpoint, get_token_url, is_feature_enabled
        )

        if not settings.FEATURES.get("ENABLE_EDXNOTES"):
            return original_get_html(self, *args, **kwargs)

        runtime = getattr(self, 'descriptor', self).runtime
        if not hasattr(runtime, 'modulestore'):
            return original_get_html(self, *args, **kwargs)

        is_studio = getattr(self.runtime, "is_author_mode", False)
        # Right now, if the course is a CCX, the course.id value contains a course id with branches.
        # This causes discrepancy in the notes data, since the course_id for the note is being saved using
        # branches and meanwhile the notes tab searches for the course without branches.
        course = getattr(self, 'descriptor', self).runtime.modulestore.get_course(self.scope_ids.usage_id.context_key)

        # Must be disabled when:
        # - in Studio
        # - Harvard Annotation Tool is enabled for the course
        # - the feature flag or `edxnotes` setting of the course is set to False
        # - the user is not authenticated
        try:
            user = self.runtime.service(self, 'user').get_user_by_anonymous_id()
        except NoSuchServiceError:
            user = None

        is_llm_summarize_enabled = run_extension_point('PEARSON_CORE_ENABLE_LLM_SUMMARIZE', course_id=str(course.id))

        if is_studio or not is_feature_enabled(course, user):
            return original_get_html(self, *args, **kwargs)
        else:
            return render_to_string("edxnotes_wrapper.html", {
                "content": original_get_html(self, *args, **kwargs),
                "uid": generate_uid(),
                "edxnotes_visibility": json.dumps(
                    getattr(self, 'edxnotes_visibility', course.edxnotes_visibility)
                ),
                "params": {
                    # Use camelCase to name keys.
                    "usageId": self.scope_ids.usage_id,
                    # We need to change the value when the course is a CCX because of the issue commented above.
                    "courseId": course.id if not is_ccx_course(course.id) else course.id.for_branch(branch=None),
                    "token": get_edxnotes_id_token(user),
                    "tokenUrl": get_token_url(course.id),
                    "endpoint": get_public_endpoint(),
                    "debug": settings.DEBUG,
                    "eventStringLimit": settings.TRACK_MAX_EVENT / 6,
                    "llmSummarize": {
                        "isEnabled": is_llm_summarize_enabled,
                        "courseId": str(course.id),
                    },
                },
            })

    cls.get_html = get_html
    return cls
