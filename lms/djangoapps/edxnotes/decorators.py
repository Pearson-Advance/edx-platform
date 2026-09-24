"""
Decorators related to edXNotes.
"""


import json

from django.conf import settings
from xblock.exceptions import NoSuchServiceError

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
            generate_uid, get_edxnotes_id_token, get_public_endpoint, get_token_url, is_feature_enabled,
            notes_stored_at_master_course_enabled, to_notes_api_key
        )

        if not settings.FEATURES.get("ENABLE_EDXNOTES"):
            return original_get_html(self, *args, **kwargs)

        runtime = getattr(self, 'block', self).runtime
        if not hasattr(runtime, 'modulestore'):
            return original_get_html(self, *args, **kwargs)

        is_studio = getattr(self.runtime, "is_author_mode", False)
        course = getattr(self, 'block', self).runtime.modulestore.get_course(self.scope_ids.usage_id.context_key)

        # Must be disabled when:
        # - in Studio
        # - Harvard Annotation Tool is enabled for the course
        # - the feature flag or `edxnotes` setting of the course is set to False
        # - the user is not authenticated
        try:
            user = self.runtime.service(self, 'user').get_user_by_anonymous_id()
        except NoSuchServiceError:
            user = None

        if is_studio or not is_feature_enabled(course, user):
            return original_get_html(self, *args, **kwargs)
        else:
            # When the feature is on, re-key the CCX course id to its master equivalent (no-op for regular
            # courses). When it is off, keep the exact legacy behavior: strip the branch for a CCX and use
            # the course id unchanged otherwise.
            if notes_stored_at_master_course_enabled():
                notes_course_id = to_notes_api_key(course.id)
            elif is_ccx_course(course.id):
                notes_course_id = course.id.for_branch(branch=None)
            else:
                notes_course_id = course.id
            return render_to_string("edxnotes_wrapper.html", {
                "content": original_get_html(self, *args, **kwargs),
                "uid": generate_uid(),
                "edxnotes_visibility": json.dumps(
                    getattr(self, 'edxnotes_visibility', course.edxnotes_visibility)
                ),
                "params": {
                    # Use camelCase to name keys.
                    "usageId": to_notes_api_key(self.scope_ids.usage_id),
                    "courseId": notes_course_id,
                    "token": get_edxnotes_id_token(user),
                    "tokenUrl": get_token_url(course.id),
                    "endpoint": get_public_endpoint(),
                    "debug": settings.DEBUG,
                    "eventStringLimit": settings.TRACK_MAX_EVENT / 6,
                },
            })

    cls.get_html = get_html
    return cls
