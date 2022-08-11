"""
Registers the CCX feature for the edX platform.
"""


from django.conf import settings
from django.utils.translation import ugettext_noop
from openedx.core.djangoapps.plugins.plugins_hooks import run_extension_point
from openedx.core.djangoapps.site_configuration import helpers as configuration_helpers
from common.djangoapps.student.auth import is_ccx_course

from student.roles import CourseCcxCoachRole
from xmodule.tabs import CourseTab

from .permissions import VIEW_CCX_COACH_DASHBOARD


class CcxCourseTab(CourseTab):
    """
    The representation of the CCX course tab
    """

    type = "ccx_coach"
    title = ugettext_noop("CCX Coach")
    view_name = "ccx_coach_dashboard"
    is_dynamic = True    # The CCX view is dynamically added to the set of tabs when it is enabled

    @classmethod
    def is_enabled(cls, course, user=None):
        """
        Returns true if CCX has been enabled and the specified user is a coach
        """
        if not settings.FEATURES.get('CUSTOM_COURSES_EDX', False) or not course.enable_ccx:
            # If ccx is not enable do not show ccx coach tab.
            return False

        # Disable ccx coach tab for master courses if user is not allowed to create ccx.
        if (
            not is_ccx_course(course.id) and
            # site configuration PCO_ENABLE_LICENSE_ENFORCEMENT is to control platform default.
            configuration_helpers.get_value('PCO_ENABLE_LICENSE_ENFORCEMENT', False) and
            not run_extension_point(
                'PCO_IS_USER_ALLOWED_TO_CREATE_CCX',
                user=user,
                master_course=course.id,
            )
        ):
            # If course licensing is enable, then regular ccxs are disabled.
                return False

        if hasattr(course.id, 'ccx') and bool(user.has_perm(VIEW_CCX_COACH_DASHBOARD, course)):
            return True

        # check if user has coach access.
        role = CourseCcxCoachRole(course.id)
        return role.has_user(user)
