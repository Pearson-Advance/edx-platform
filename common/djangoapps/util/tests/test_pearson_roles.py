"""
Tests for common.djangoapps.util.pearson_roles.
"""
import ddt
import jwt
from django.test import TestCase
from django.test.client import RequestFactory

from common.djangoapps.util import pearson_roles
from openedx.core.djangoapps.site_configuration.tests.test_util import with_site_configuration_context

SUPPRESSION_SETTING = pearson_roles.ROLE_BASED_PANEL_SUPPRESSION_SETTING


def _build_jwt_cookies(roles):
    """
    Return the (header_payload, signature) cookie values for a JWT that carries
    the given ``permission_roles`` under ``extra_data``.
    """
    token = jwt.encode({'extra_data': {'permission_roles': roles}}, 'secret', algorithm='HS256')
    header, payload, signature = token.split('.')
    return f'{header}.{payload}', signature


def _request_with_roles(roles=None, include_signature=True):
    """Build a request whose JWT cookie encodes the given roles."""
    request = RequestFactory().get('/')
    if roles is None:
        return request
    header_payload, signature = _build_jwt_cookies(roles)
    request.COOKIES[pearson_roles.JWT_HEADER_PAYLOAD_COOKIE] = header_payload
    if include_signature:
        request.COOKIES[pearson_roles.JWT_SIGNATURE_COOKIE] = signature
    return request


@ddt.ddt
class PearsonRolesTest(TestCase):
    """Tests for reading permission roles from the JWT cookie."""

    def test_get_permission_roles_returns_roles(self):
        request = _request_with_roles(['INSTRUCTOR', 'INSTITUTION_ADMIN'])
        self.assertEqual(
            pearson_roles.get_permission_roles(request),
            ['INSTRUCTOR', 'INSTITUTION_ADMIN'],
        )

    def test_get_permission_roles_without_request(self):
        self.assertEqual(pearson_roles.get_permission_roles(None), [])

    def test_get_permission_roles_without_cookies(self):
        self.assertEqual(pearson_roles.get_permission_roles(_request_with_roles()), [])

    def test_get_permission_roles_without_signature(self):
        request = _request_with_roles(['INSTRUCTOR'], include_signature=False)
        self.assertEqual(pearson_roles.get_permission_roles(request), [])

    def test_get_permission_roles_with_invalid_jwt(self):
        request = RequestFactory().get('/')
        request.COOKIES[pearson_roles.JWT_HEADER_PAYLOAD_COOKIE] = 'not.a-jwt'
        request.COOKIES[pearson_roles.JWT_SIGNATURE_COOKIE] = 'signature'
        self.assertEqual(pearson_roles.get_permission_roles(request), [])

    def test_get_permission_roles_missing_extra_data(self):
        token = jwt.encode({'sub': 'user'}, 'secret', algorithm='HS256')
        header, payload, signature = token.split('.')
        request = RequestFactory().get('/')
        request.COOKIES[pearson_roles.JWT_HEADER_PAYLOAD_COOKIE] = f'{header}.{payload}'
        request.COOKIES[pearson_roles.JWT_SIGNATURE_COOKIE] = signature
        self.assertEqual(pearson_roles.get_permission_roles(request), [])

    @ddt.data(
        (['INSTRUCTOR'], True),
        (['INSTITUTION_ADMIN'], True),
        (['INSTITUTION_ADMIN', 'INSTRUCTOR'], True),
        (['GLOBAL_STAFF'], False),
        (['GLOBAL_STAFF', 'INSTRUCTOR'], False),
        (['GLOBAL_STAFF', 'INSTITUTION_ADMIN'], False),
        ([], False),
    )
    @ddt.unpack
    def test_is_suppressed_role(self, roles, expected):
        request = _request_with_roles(roles)
        with with_site_configuration_context(configuration={SUPPRESSION_SETTING: True}):
            self.assertEqual(pearson_roles.is_suppressed_role(request), expected)

    def test_is_suppressed_role_without_request(self):
        with with_site_configuration_context(configuration={SUPPRESSION_SETTING: True}):
            self.assertFalse(pearson_roles.is_suppressed_role(None))

    @ddt.data(
        ['INSTRUCTOR'],
        ['INSTITUTION_ADMIN'],
        ['INSTITUTION_ADMIN', 'INSTRUCTOR'],
    )
    def test_is_suppressed_role_disabled_when_flag_off(self, roles):
        """With the site configuration flag off, no role is ever suppressed."""
        request = _request_with_roles(roles)
        with with_site_configuration_context(configuration={SUPPRESSION_SETTING: False}):
            self.assertFalse(pearson_roles.is_suppressed_role(request))
