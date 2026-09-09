"""
Helpers to read Pearson permission roles from the request JWT cookie.

Pearson roles travel in the JWT cookie ``edx-jwt-cookie-header-payload`` under
``extra_data.permission_roles`` (populated by the course_operations pipeline).
This mirrors the decode logic used by the pearson-vue-theme header template so
the role suppression rules stay consistent between the theme, the MFE and the
backend.
"""
import jwt
from crum import get_current_request

from openedx.core.djangoapps.site_configuration import helpers as configuration_helpers

GLOBAL_STAFF = 'GLOBAL_STAFF'
INSTITUTION_ADMIN = 'INSTITUTION_ADMIN'
INSTRUCTOR = 'INSTRUCTOR'

JWT_HEADER_PAYLOAD_COOKIE = 'edx-jwt-cookie-header-payload'
JWT_SIGNATURE_COOKIE = 'edx-jwt-cookie-signature'

# Pearson portal roles whose native Open edX panels have been replaced by Pearson
# portals and must therefore be suppressed (unless the user is also Global Staff).
SUPPRESSED_ROLES = frozenset({INSTITUTION_ADMIN, INSTRUCTOR})

# Site configuration flag that turns the whole role-based panel suppression on.
# When absent/falsy, everything behaves exactly as before this feature.
ROLE_BASED_PANEL_SUPPRESSION_SETTING = 'ENABLE_ROLE_BASED_PANEL_SUPPRESSION'


def role_based_panel_suppression_enabled():
    """Return True when the Pearson role-based panel suppression flag is on for the site."""
    return bool(configuration_helpers.get_value(ROLE_BASED_PANEL_SUPPRESSION_SETTING, False))


def get_permission_roles(request=None):
    """
    Return the Pearson ``permission_roles`` list from the request JWT cookie.

    Falls back to the current request (via crum) when ``request`` is not given so
    it can be used from contexts without direct request access (e.g. course tab
    ``is_enabled``). Returns an empty list when no valid JWT cookie is present.
    """
    if request is None:
        request = get_current_request()
    if request is None:
        return []

    header_payload = request.COOKIES.get(JWT_HEADER_PAYLOAD_COOKIE)
    signature = request.COOKIES.get(JWT_SIGNATURE_COOKIE)
    if not header_payload or not signature:
        return []

    try:
        full_jwt = f'{header_payload}.{signature}'
        decoded = jwt.decode(full_jwt, options={'verify_signature': False})
    except Exception:  # pylint: disable=broad-except
        return []

    return decoded.get('extra_data', {}).get('permission_roles', []) or []


def is_suppressed_role(request=None):
    """
    Return True when the user must have Pearson-replaced native panels hidden.

    Suppression only applies when the ``ENABLE_ROLE_BASED_PANEL_SUPPRESSION`` site
    configuration flag is enabled AND the user holds ``INSTITUTION_ADMIN`` or
    ``INSTRUCTOR`` and does NOT hold ``GLOBAL_STAFF``. Global Staff always keeps
    full access, and when the flag is off nothing is suppressed.
    """
    if not role_based_panel_suppression_enabled():
        return False
    roles = get_permission_roles(request)
    if GLOBAL_STAFF in roles:
        return False
    return any(role in SUPPRESSED_ROLES for role in roles)
