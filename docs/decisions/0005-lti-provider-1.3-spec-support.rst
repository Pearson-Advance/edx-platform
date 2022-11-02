PADV-228: Add LTI 1.3 support to the LTI Provider app
=====================================================

Status
------

In progress.

Discovery
---------

The 1EdTech Learning Tools Interoperability® (LTI®) specification allows
Learning Management Systems (LMS) or platforms to integrate remote tools
and content in a standard way. LTI v1.3 builds on LTI v1.1 by
incorporating a new model for security for message and service
authentication.

Currently, the Open edX platform can work as an LTI 1.1 tool provider,
for XBlocks on any course. LTI 1.1 has been deprecated since 2019,
the current specification, LTI 1.3 is only supported on the platform
for Content Libraries V2 content, various changes have been made to the new
specification, mainly the change on how authentication works and how certain services
are exposed to tool consumers. There was a previous PR created to add LTI 1.3
support to the platform: https://github.com/openedx/edx-platform/pull/21435

LTI Terminology
~~~~~~~~~~~~~~~

-  **Platform (Tool Provider)**: LMS or any kind of platform that needs
   to delegate bits of functionality out to a suite of tools.
-  **Tool (Tool Consumer)**: The external application or service
   providing functionality to the platform is called a tool.
-  **Context**: LTI uses the term context where you might expect to see
   the word “course”. A context is roughly equivalent to a course,
   project, or other collection of resources with a common set of users
   and roles.
-  **Resource**: Typically, within a context, users can integrate many
   LTI content items, or resources, sometimes arranging them into
   folders like “Week 1” or “Pre-Work”. Conceptually, these platform
   integrations serve the same general purpose as any other type of item
   within the structure of a context’s available content. In particular,
   commonly, users may scatter multiple LTI links through the content
   structure for a context that is linked to a particular resource. A
   platform MUST distinguish between each of these LTI links by
   assigning a resource_link_id to an LTI Link.
-  **LTI Link**: An LTI Link is a reference to a specific tool stored by
   a platform which may, for example, lead to a specific resource or
   content hosted on the tool, depending on the message_type of the LTI
   Link. The LTI Link is presented by the platform that provides access
   to the content of the tool and may be used as a means of performing
   LTI launches within the context of the platform.
-  **LTI Launch**: An LTI Launch refers to the process in which a user
   interacts with an LTI Link within the platform and is subsequently
   “launched” into a tool. The data between tool and platform in
   establishing a launch are defined upon tool integration into the
   platform. LTI platforms and tools use messages to transfer the user
   agent from one host to another through an HTML form post redirection
   containing the message payload. The data of this payload is
   determined by the message_type
-  **LTI Message**: Messages between a platform and host are used to
   transfer the user agent between hosts. An LTI Message is the simplest
   way that a platform and tool communicate.
-  **AGS**: LTI Assignment and Grade Services.

Note that, historically, LTI referred to platforms as tool consumers
(TC) and referred to tools as tool providers (TP). As this does not
align with usage of these terms within the OAuth2 and OpenID Connect
communities, LTI 1.3 no longer uses these terms and shifts to the terms
platform and tool to describe the parties involved in an LTI
integration.

Open edX LTI Provider App
-------------------------

The LTI tool provider used for XBlocks on modulestore using the LTI 1.1
specification.

LTI Provider Models
~~~~~~~~~~~~~~~~~~~

-  **LTIConsumer**: Database model representing an LTI consumer. This
   model stores the consumer specific settings, such as the OAuth
   key/secret pair and any LTI fields that must be persisted.
-  **LTIUser**: Model mapping the identity of an LTI user to an account
   on the edX platform. The LTI user_id field is guaranteed to be unique
   per LTI consumer (per to the LTI spec), so we guarantee a unique
   mapping from LTI to edX account by using the lti_consumer/lti_user_id
   tuple.
-  **OutcomeService**: Model for a single outcome service associated
   with an lti consumer. Note that a given consumer may have more than
   one outcome service url over its lifetime, so we need to store the
   outcome service separately from the lticonsumer model.
-  **GradedAssignment**: Model representing a single launch of a graded
   assignment by an individual user. There will be a row created here
   only if the LTI consumer may require a result to be returned from the
   LTI launch (determined by the presence of the lis_result_sourcedid
   parameter in the launch POST). There will be only one row created for
   a given usage/consumer combination; repeated launches of the same
   content by the same user from the same LTI consumer will not add new
   rows to the table.

LTI Provider Launch
~~~~~~~~~~~~~~~~~~~

To start an LTI 1.1 launch, a POST request with the XBlock usage_id and
course_id will be sent to the ``lti_launch`` view URL:

.. code:: python

   from lms.djangoapps.lti_provider import views

   urlpatterns = [
       re_path(
           r'^courses/{course_id}/{usage_id}$'.format(
               course_id=settings.COURSE_ID_PATTERN,
               usage_id=settings.USAGE_ID_PATTERN
           ),
           views.lti_launch, name="lti_provider_launch"),
   ]

It will verify the POST contains the required data for a LTI 1.1 launch.
It will also add any additional data sent in the request:

.. code:: python

   # LTI launch parameters that must be present for a successful launch
   REQUIRED_PARAMETERS = [
       'roles', 'context_id', 'oauth_version', 'oauth_consumer_key',
       'oauth_signature', 'oauth_signature_method', 'oauth_timestamp',
       'oauth_nonce', 'user_id'
   ]

Once the parameters are verified, it will try to get consumer
information using the sent ``oauth_consumer_key`` or
``tool_consumer_instance_guid`` using the LtiConsumer manager method
``get_or_supplement``.

After verifying for an existing LtiConsumer, it will try to validate the
OAuth 1.0 signature sent in the POST request. using
``SignatureValidator`` class found in the ``signature_validator``
module.

It will transform ``course_id`` and ``usage_id`` into a ``course_key``
and ``usage_key`` using ``parse_course_and_usage_keys`` function an add
it to the to the dictionary containing the received data from the POST
request.

After all data is validated and transformed it will try to authenticate
into a user in the platform if a ``user_id`` was sent, otherwise it will
create a new account and associate it to an LtiUser:

.. code:: python

   # Create an edX account if the user identified by the LTI launch doesn't have
   # one already, and log the edX account into the platform.
   authenticate_lti_user(request, params['user_id'], lti_consumer)

It will send all the data into OutcomeService and GradedAssignment model
to be able to report scores back if required:

.. code:: python

   # Store any parameters required by the outcome service in order to report
   # scores back later. We know that the consumer exists, since the record was
   # used earlier to verify the oauth signature.
   store_outcome_parameters(params, request.user, lti_consumer)

And finally, it will use the usage_key to return back a HttpResponse
with the XBlock using ``render_courseware`` view.

Content Libraries App LTI 1.3 Provider
--------------------------------------

Open EdX can act as an LTI 1.3 tool provider for content managed by
Content Libraries and backed up by blockstore.

Content Libraries Models
~~~~~~~~~~~~~~~~~~~~~~~~

-  **ContentLibrary**: This Studio model is used to track settings
   specific to this this content library. The `PR
   27411 <https://github.com/openedx/edx-platform/pull/27411/>`__
   introduces a new field ``authorized_lti_configs`` to store any LTI
   tool associated to a content library, and method ``allow_lti`` to
   return any LTI config if any and ``authorize_lti_launch`` to identify
   if a given Issuer and Client ID are authorized to launch content from
   this library.
-  **LtiProfile**: Unless Anonymous, this should be a unique
   representation of the LTI subject (as per the client token ``sub``
   identify claim) that initiated an LTI launch through Content
   Libraries. This model is similar to LtiUser model role on
   lti_provider app.
-  **LtiGradedResource**: This model represents a successful LTI AGS
   (Assignment and Grade Services) launch. This model links the profile
   that launched the resource with the resource itself, allowing
   identification of the link through its blockstore usage key string
   and LtiProfile. This model includes a method to send messages back
   with updated scores, is uses pylti1.3 grade module for this.

Relationship with LMS’s ``lti_provider`` models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The data model above is similar to the one provided by the current LTI
1.1 implementation for modulestore and courseware content. But, Content
Libraries is orthogonal. Its use-case is to offer standalone, embedded
content from a specific backend (blockstore). As such, it decouples from
LTI 1.1. and the logic assume no relationship or impact across the two
applications. The same reasoning applies to steps beyond the data model,
such as at the XBlock runtime, authentication, and score handling, etc.

Content Libraries LTI 1.3 Launch
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In order to execute a launch, first the content library and LTI tool
must be setup on both the platform and the tools (Example: Canvas LMS).
you can follow the instructions in the PR
`27411 <https://github.com/openedx/edx-platform/pull/27411>`__ on how to
setup the content library and tool for an example.

LTI 1.3 uses a modified version of the OpenId Connect third party
initiate login flow. This means that to do an LTI 1.3 launch, you must
first receive a login initialization request and return to the platform,
the tool will initialize the login request by sending an GET or POST
request to LtiToolLoginView, this will receive the target_link_uri
previously setup on the tool and redirect to the launch view.

.. code:: python

   LAUNCH_URI_PARAMETER = 'target_link_uri'

   def get(self, request):
       return self.post(request)

   def post(self, request):
       """Initialize 3rd-party login requests to redirect."""
       oidc_login = DjangoOIDCLogin(
           self.request,
           self.lti_tool_config,
           launch_data_storage=self.lti_tool_storage)
       launch_url = (self.request.POST.get(self.LAUNCH_URI_PARAMETER)
                       or self.request.GET.get(self.LAUNCH_URI_PARAMETER))
       try:
           return oidc_login.redirect(launch_url)
       except OIDCException as exc:
           # Relying on downstream error messages, attempt to sanitize it up
           # for customer facing errors.
           log.error('LTI OIDC login failed: %s', exc)
           return HttpResponseBadRequest('Invalid LTI login request.')

On the redirected LtiToolLaunchView POST request, a launch message
object will be created using DjangoMessageLaunch from pylti1.3 library,
then the ``id`` parameter from the request will be used with
LibraryUsageLocatorV2 to retrieve the usage key of the content
requested, and also use that usage key to check is the current issuer
and authorization server are authorized to launch the content using the
``authorize_lti_launch`` function.

.. code:: python

   try:
       self.launch_message = self.get_launch_message()
   except LtiException as exc:
       log.exception('LTI 1.3: Tool launch failed: %s', exc)
       return self._bad_request_response()

   log.info("LTI 1.3: Launch message body: %s",
               json.dumps(self.launch_data))

   # Parse content key.

   usage_key_str = request.GET.get('id')
   if not usage_key_str:
       return self._bad_request_response()
   usage_key = LibraryUsageLocatorV2.from_string(usage_key_str)
   log.info('LTI 1.3: Launch block: id=%s', usage_key)

   # Authenticate the launch and setup LTI profiles.

   if not self._authenticate_and_login(usage_key):
       return self._bad_request_response()

``authorize_lti_launch`` function will get or create a new LtiProfile
and authenticate the user to the LMS platform, it will also verify the
current user permissions to the requested content:

.. code:: python

   LtiProfile.objects.get_or_create_from_claims(
       iss=self.launch_data['iss'],
       aud=self.launch_data['aud'],
       sub=self.launch_data['sub'])
   edx_user = authenticate(
       self.request,
       iss=self.launch_data['iss'],
       aud=self.launch_data['aud'],
       sub=self.launch_data['sub'])

After all request information has been processed, the view will load the
requested block, also setup the signal handler for AGS, and generating
the required context data that will be sent with the view response:

.. code:: python

   # Get the block.

   self.block = xblock_api.load_block(
       usage_key,
       user=self.request.user)

   # Handle Assignment and Grade Service request.

   self.handle_ags()

   # Render context and response.
   context = self.get_context_data()
   return self.render_to_response(context)

``handle_ags`` will check that the launch message has access to AGS
services, validate the AGS launch data and create a new
LtiGradedResource to track the grades of this resource launch.

Content Libraries LTI 1.3 AGS
-----------------------------

The receiver ``score_changed_handler`` on
``openedx/core/djangoapps/content_libraries/signal_handlers.py``, will
catch the signal PROBLEM_WEIGHTED_SCORE_CHANGED from
``lms.djangoapps.grades.api``, this will send a request to the LTI
platform to update the assignment score using the method
``update_score`` of the LtiGradedResource associated to the ``usage_id``
received from the signal.

.. code:: python

   try:
       usage_key = LibraryUsageLocatorV2.from_string(usage_id)
   except InvalidKeyError:
       log.debug("LTI 1.3: Score Signal: Not a content libraries v2 usage key, "
                   "ignoring: usage_id=%s", usage_id)
       return
   try:
       resource = LtiGradedResource.objects.get_from_user_id(
           user_id, usage_key=usage_key
       )
   except LtiGradedResource.DoesNotExist:
       log.debug("LTI 1.3: Score Signal: Unknown resource, ignoring: kwargs=%s",
                   kwargs)
   else:
       resource.update_score(weighted_earned, weighted_possible, modified)
       log.info("LTI 1.3: Score Signal: Grade upgraded: resource; %s",
                   resource)

The updated score will be sent with a message launch using pylti1.3
DjangoMessageLaunch, by sending a pylti1.3 Grade object to the
``put_grade`` method.

LTI 1.3 Support Roadmap
-----------------------

-  Add new settings to enable LTI 1.3 platform tool. (Ex:
   https://github.com/openedx/edx-platform/blob/bfe6494e9d71f42513885b83afae2664cc52a4cc/lms/envs/production.py#L799)
-  Add view for LTI 1.3 login. (Ex:
   https://github.com/openedx/edx-platform/pull/27411/files#diff-aee1ed7cd71a9cbd5d28d029e3589f4391e7ecc0259178a20a48cbb4f752aea5R849).
-  Add view for LTI 1.3 launch. (Ex:
   https://github.com/openedx/edx-platform/pull/27411/files#diff-aee1ed7cd71a9cbd5d28d029e3589f4391e7ecc0259178a20a48cbb4f752aea5R883).
-  Add model to store LTI 1.3 users. (Ex:
   https://github.com/openedx/edx-platform/pull/27411/files#diff-36022deef8607c7a4647c8f2620b4d9ed283d5b41077e966bfd097585e0ebe7cR314)
-  Add model to store LTI 1.3 graded resources. (Ex:
   https://github.com/openedx/edx-platform/pull/27411/files#diff-36022deef8607c7a4647c8f2620b4d9ed283d5b41077e966bfd097585e0ebe7cR434).
-  Add logic to get or automatically create LTI users for LTI launches.
   (Ex:
   https://github.com/openedx/edx-platform/pull/27411/files#diff-36022deef8607c7a4647c8f2620b4d9ed283d5b41077e966bfd097585e0ebe7cR374,
   https://github.com/openedx/edx-platform/blob/bfe6494e9d71f42513885b83afae2664cc52a4cc/lms/djangoapps/lti_provider/users.py#L47)
-  Add or modify PROBLEM_WEIGHTED_SCORE_CHANGED receiver to update
   graded resources scores. (Ex:
   https://github.com/openedx/edx-platform/blob/master/lms/djangoapps/lti_provider/signals.py#L40).

Approach A: Create new app
~~~~~~~~~~~~~~~~~~~~~~~~~~

This approach would be similar to the proposed on the `PR
21435 <https://github.com/openedx/edx-platform/pull/21435>`__). We will
create a new app (Example: lti1p3_tool), and integrate all logic related
to LTI 1.3 separated from the existing lti_provider app.

Approach B: Refactor lti_provider app
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We could refactor the existing lti_provider. With this approach we could
separate the logic of each specification per folder, and keep utilities
that are used on both specifications on the base folder of the app, here
is an example of the folder structure:

.. code:: bash

   .
   ├── __init__.py
   ├── apps.py
   ├── admin.py
   ├── tasks.py
   ├── urls.py
   ├── management
   │   ├── commands
   │   │   ├── __init__.py
   │   │   └── ...
   ├── migrations
   │   ├── __init__.py
   │   └── ...
   ├── models.py
   │   ├── __init__.py # LtiUser and GradedAssignment model could be store here
   │   ├── 1p1 # Create LtiUser1p1 using multi table inheritance with LtiUser
   │   └── 1p3 # Create LtiUser1p3 using multi table inheritance with LtiUser
   ├── utils
   │   ├── __init__.py
   │   ├── users.py
   │   ├── 1p3 # Store utilities for 1.3 specification
   │   └── 1p1 # Store utilities for 1.1 specification
   │       ├── __init__.py
   │       ├── signature_validator.py
   │       └── outcomes.py
   ├── signals.py # Use score_changed_handler for both specifications
   └── views.py
       ├── __init__.py
       ├── 1p1 # Define LTI 1.1 views here
       └── 1p3 # Define LTI 1.3 views here

LTI 1.3 Open edX community discussion
-------------------------------------

-  Deep dive into LTI 1.3 in the Open edX platform:
   https://openedx.org/video/deep-dive-into-lti-1-3-in-the-open-edx-platform/
-  LTI 1.3 and LTI Advantage:
   https://discuss.openedx.org/t/lti-1-3-and-lti-advantage/5672
-  LTI Provider in Nutmeg and future releases?:
   https://discuss.openedx.org/t/lti-provider-in-nutmeg-and-future-releases/8330/14
-  A question about LTI provider support in Open edX:
   https://discuss.openedx.org/t/a-question-about-lti-provider-support-in-open-edx/4866/2
-  Open edX Slack LTI channel:
   https://openedx.slack.com/archives/C0GR05YC

References
----------

1.  Using Open edX as an LTI Tool Provider:
    https://edx.readthedocs.io/projects/open-edx-building-and-running-a-course/en/latest/course_features/lti/index.html
2.  LTI Standard:
    https://www.imsglobal.org/activity/learning-tools-interoperability
3.  LTI 1.1 Implementation Guide:
    https://www.imsglobal.org/specs/ltiv1p1/implementation-guide
4.  LTI 1.3 Implementation Guide:
    https://www.imsglobal.org/spec/lti/v1p3/impl/
5.  LTI 1.3 Migration Guide:
    https://www.imsglobal.org/spec/lti/v1p3/migr#lti-migration-guide
6.  1EdTech Security Framework 1.0:
    https://www.imsglobal.org/spec/security/v1p0/
7.  LTI Assignment and Grade Services Specification 2.0:
    https://www.imsglobal.org/spec/lti-ags/v2p0/
8.  LTI 1.3 Advantage Tool implementation in Python:
    https://github.com/dmitry-viskov/pylti1.3
9.  Open edX LTI Provider Tool:
    https://edx.readthedocs.io/projects/open-edx-building-and-running-a-course/en/latest/course_features/lti/index.html
10. LTI Xblock Consumer: https://github.com/openedx/xblock-lti-consumer
11. Previous LTI 1.3 PR:
    https://github.com/openedx/edx-platform/pull/21435
12. Content Libraries V2 LTI 1.3 Tool:
    https://github.com/openedx/edx-platform/pull/27411
13. Content Libraries V2 LTI 1.3 Tool ADR:
    https://github.com/openedx/edx-platform/pull/27089/files
