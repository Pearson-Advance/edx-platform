=====================================================
PADV-228: Add LTI 1.3 support to the LTI Provider app
=====================================================

Status
======

In progress.

Discovery
=========

The 1EdTech Learning Tools Interoperability® (LTI®) specification allows
Learning Management Systems (LMS) or platforms to integrate remote tools
and content in a standard way. LTI v1.3 builds on LTI v1.1 by
incorporating a new model for security for message and service
authentication.

Currently, the Open edX platform can work as an LTI 1.1 tool provider,
for XBlocks on any course. LTI 1.1 has been deprecated since 2019, the
current specification, LTI 1.3 is only supported on the platform for
Content Libraries V2 content, various changes have been made to the new
specification, mainly on how authentication works and how certain
services are exposed to tool consumers. There was a previous PR created
to add LTI 1.3 support to the platform:
https://github.com/openedx/edx-platform/pull/21435

LTI Terminology
---------------

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
   a platform that may, for example, lead to a specific resource or
   content hosted on the tool, depending on the message_type of the LTI
   Link. The LTI Link is presented by the platform that provides access
   to the content of the tool and may be used as a means of performing
   LTI launches within the context of the platform.
-  **LTI Launch**: An LTI Launch refers to the process in which a user
   interacts with an LTI Link within the platform and is subsequently
   “launched” into a tool. The data between the tool and platform in
   establishing a launch are defined by the tool integrated into the
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
align with the usage of these terms within the OAuth2 and OpenID Connect
communities, LTI 1.3 no longer uses these terms and shifts to the terms
platform and tool to describe the parties involved in an LTI
integration.

Open edX LTI Provider App
=========================

The LTI tool provider used for XBlocks on modulestore using the LTI 1.1
specification.

LTI Provider Models
-------------------

-  **LTIConsumer**: Database model representing an LTI consumer. This
   the model stores the consumer-specific settings, such as the OAuth
   key/secret pair and any LTI fields that must be persisted.
-  **LTIUser**: Model mapping the identity of an LTI user to an account
   on the edX platform. The LTI user_id field is guaranteed to be unique
   per LTI consumer (per the LTI spec), so we guarantee a unique mapping
   from LTI to edX account by using the lti_consumer/lti_user_id tuple.
-  **OutcomeService**: Model for a single outcome service associated
   with a lti consumer. Note that a given consumer may have more than
   one outcome service URL over its lifetime, so we need to store the
   outcome service separately from the LTI consumer model.
-  **GradedAssignment**: Model representing a single launch of a graded
   assignment by an individual user. There will be a row created here
   only if the LTI consumer may require a result to be returned from the
   LTI launch (determined by the presence of the parameter
   lis_result_sourcedid in the launch POST). There will be only one row
   created for a given usage/consumer combination; repeated launches of
   the same content by the same user from the same LTI consumer will not
   add new rows to the table.

LTI Provider Launch
-------------------

To start an LTI 1.1 launch, a POST request with the XBlock's usage_id
and course_id will be sent to the ``lti_launch`` view URL:

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

It will verify the POST contains the required data for an LTI 1.1
launch. It will also add any additional data sent in the request:

.. code:: python

   # LTI launch parameters that must be present for a successful launch
   REQUIRED_PARAMETERS = [
       'roles', 'context_id', 'oauth_version', 'oauth_consumer_key',
       'oauth_signature', 'oauth_signature_method', 'oauth_timestamp',
       'oauth_nonce', 'user_id'
   ]

Once the parameters are verified, it will try to get the consumer
information using the sent ``oauth_consumer_key`` or
``tool_consumer_instance_guid`` using the LtiConsumer manager method
``get_or_supplement``.

After verifying for an existing LtiConsumer, it will try to validate the
OAuth 1.0 signature sent in the POST request. using
``SignatureValidator`` class found in the ``signature_validator``
module.

It will transform ``course_id`` and ``usage_id`` into a ``course_key``
and ``usage_key`` using the ``parse_course_and_usage_keys`` function and
add it to the dictionary containing the received data from the POST
request.

After all, data is validated and transformed it will try to authenticate
a user into the platform if a ``user_id`` was sent, otherwise it will
create a new account and associate it with a LtiUser:

.. code:: python

   # Create an edX account if the user identified by the LTI launch doesn't have
   # one already, and log the edX account into the platform.
   authenticate_lti_user(request, params['user_id'], lti_consumer)

It will send all the data into OutcomeService and GradedAssignment model
to be able to report scores back if required:

.. code:: python

   # Store any parameters required by the outcome service to report
   # scores back later. We know that the consumer exists since the record was
   # used earlier to verify the OAuth signature.
   store_outcome_parameters(params, request.user, lti_consumer)

And finally, it will use the usage_key to return a HttpResponse with the
XBlock using ``render_courseware`` view.

LTI Provider Outcome Service ---------------------------

The LTI provider can pass grades back to the campus LMS platform using
the LTI outcome service. For full details of the outcome service, see:
http://www.imsglobal.org/LTI/v1p1/ltiIMGv1p1.html

In brief, the LTI 1.1 spec defines an outcome service that can be
offered by an LTI consumer. The consumer determines whether a score
should be returned (in Canvas, this means that the LTI tool is used in
an assignment, and the launch was performed by a student). If so, it
sends two additional parameters along with the LTI launch:

-  lis_outcome_service_url: the endpoint for the outcome service on the
   consumer;
-  lis_result_sourcedid: a unique identifier for the row in the grade
   book.

The LTI Provider launch view detects the presence of these optional
fields and creates database records for the specific Outcome Service and
the graded LTI launch.

.. code:: python

   # Store any parameters required by the outcome service to report
   # scores back later. We know that the consumer exists since the record was
   # used earlier to verify the OAuth signature.
   store_outcome_parameters(params, request.user, lti_consumer)

.. code:: {.python

   # Create a record of the outcome service if necessary
   outcomes, __ = OutcomeService.objects.get_or_create(
   lis_outcome_service_url=result_service,
   lti_consumer=lti_consumer
   )}
   GradedAssignment.objects.get_or_create(
      lis_result_sourcedid=result_id,
      course_key=course_key,
      usage_key=usage_key,
      user=user,
      outcome_service=outcomes
   )

Later, when a score on edX changes (identified using the signal
mechanism):

.. code:: {.python

   @receiver(grades_signals.PROBLEM_WEIGHTED_SCORE_CHANGED)
   def score_changed_handler(sender, **kwargs):  # pylint: disable=unused-argument
   \"\"\"
   Consume signals that indicate score changes. See the definition of
   PROBLEM_WEIGHTED_SCORE_CHANGED for a description of the signal.
   \"\"\"}

While handling the score change, first it will get all the assignments
related to the course_key and usage_key received from the signal, and
increment each one version_number by 1, this version number is used to
avoid race conditions while sending score updates:

.. code:: {.python

   # Get all assignments involving the current problem for which the campus LMS
   # is expecting a grade. There may be many possible graded assignments, if
   # a problem has been added several times to a course at different
   # granularities (such as the unit or the vertical).
   assignments = outcomes.get_assignments_for_problem(
   problem_descriptor, user_id, course_key
   )}

Then for each assignment in the assignments queryset, it determines if
the score comes from a composite module or a single problem, and
depending on the case it will send a task:

.. code:: {.python

   for assignment in assignments:
   if assignment.usage_key == usage_key:
   send_leaf_outcome.delay(
   assignment.id, points_earned, points_possible
   )
   else:
   send_composite_outcome.apply_async(
   (user_id, course_id, assignment.id, assignment.version_number),
   countdown=settings.LTI_AGGREGATE_SCORE_PASSBACK_DELAY
   )}

For a single problem the send_leaf_outcome task is used, and the score
is weighted and sent back to the tool consumer using the
send_score_update method from the outcomes module:

.. code:: {.python

   @CELERY_APP.task
   def send_leaf_outcome(assignment_id, points_earned, points_possible):
   \"\"\"
   Calculate and transmit the score for a single problem. This method assumes
   that the individual problem was the source of a score update, and so it
   directly takes the points earned and possible values. As such it does not
   have to calculate the scores for the course, making this method far faster
   than send_outcome_for_composite_assignment.
   \"\"\"
   assignment = GradedAssignment.objects.get(id=assignment_id)
   if points_possible == 0:
   weighted_score = 0
   else:
   weighted_score = float(points_earned) / float(points_possible)
   outcomes.send_score_update(assignment, weighted_score)}

In the case of a composite module, the send_composite_outcome task is
sent, in this case, a composite module may contain multiple problems, so
we calculate the total points earned and possible for all child
problems, after all, calculations are done, the score update is sent
using the outcomes module send_score_update function:

.. code:: {.python

   @CELERY_APP.task(name='lms.djangoapps.lti_provider.tasks.send_composite_outcome')
   def send_composite_outcome(user_id, course_id, assignment_id, version):
   \"\"\"
   Calculate and transmit the score for a composite module (such as a
   vertical).}
   A composite module may contain multiple problems, so we need to
   calculate the total points earned and possible for all child problems. This
   requires calculating the scores for the whole course, which is an expensive
   operation.

   Callers should be aware that the score calculation code accesses the latest
   scores from the database. This can lead to a race condition between a view
   that updates a user's score and the calculation of the grade. If the Celery
   task attempts to read the score from the database before the view exits (and
   its transaction is committed), it will see a stale value. Care should be
   taken that this task is not triggered until the view exits.

   The GradedAssignment model has a version_number field that is incremented
   whenever the score is updated. It is used by this method for two purposes.
   First, it allows the task to exit if it detects that it has been superseded
   by another task that will transmit the score for the same assignment.
   Second, it prevents a race condition where two tasks calculate differently
   scores for a single assignment, and may potentially update the campus LMS
   in the wrong order.
   """
   ...
   outcomes.send_score_update(assignment, weighted_score)

This process for calculating and sending scores will be the same for LTI
1.3, the only difference being, of using the pylti1.3 Grade utility for
AGS to send score updates to the tool.

How to use the IMS LTI Tool Consumer emulator
-----------------------------------------

IMS LTI Tool Consumer emulator is a simple emulator of an IMS Learning
Tools Interoperability (LTI) 1.1.1 tool consumer (TC, e.g. a VLE) launch
of a tool provider (TP, e.g. a blog or premium content). It includes
support for the LTI 1.1 Basic Outcomes service and the unofficial
extensions for memberships, outcomes, and setting services.

To test the Open edX LTI 1.1 Tool provider, you must first set the
Launch URL, consumer key, and shared secret, to create the consumer key
and shared secret, go to the LMS admin, go to LTI Provider > Lti
consumers, and create a new one, for example:

-  Launch URL:
   http://localhost:18000/lti_provider/courses/course-v1:edX+DemoX+Demo_Course/block-v1:edX+DemoX+Demo_Course+type@sequential+block@edx_introduction
-  Consumer Key: 90ed7f3d40e5997c9fb744194ebd169d
-  Shared Secret: 747d9c4faa88df9ff0557df33af863ee

After this, you should be able to click on the "Save data" button and
use the "Launch TP" or "Launch TP in new window", the content from the
LMS should be displayed properly, and the platform should have logged
you into the new user created for this LTI consumer.

You should also be able to see the grade book for this launch using the
"Gradebook" button, will open a modal with all the information sent from
the platform related to scores.

Content Libraries App LTI 1.3 Provider
======================================

Open EdX can act as an LTI 1.3 tool provider for content managed by
Content Libraries backed up by blockstore.

Content Libraries Models
------------------------

-  **ContentLibrary**: This Studio model is used to track settings
   specific to this content library. The `PR
   27411 <https://github.com/openedx/edx-platform/pull/27411/>`__
   introduces a new field ``authorized_lti_configs`` to store any LTI
   tool associated with a content library, and method ``allow_lti`` to
   return any LTI config, if any, and ``authorize_lti_launch`` to
   identify if a given Issuer and Client ID are authorized to launch
   content from this library.
-  **LtiProfile**: Unless Anonymous, this should be a unique
   representation of the LTI subject (as per the client token ``sub``
   identify claim) that initiated an LTI launch through Content
   Libraries. This model is similar to the LtiUser model role on
   lti_provider app.
-  **LtiGradedResource**: This model represents a successful LTI AGS
   (Assignment and Grade Services) launch. This model links the profile
   that launched the resource with the resource itself, allowing
   identification of the link through its blockstore usage key string
   and LtiProfile. This model includes a method to send messages back
   with updated scores, it uses the pylti1.3 grade module for this.

Relationship with LMS’s ``lti_provider`` models
-----------------------------------------------

The data model above is similar to the one provided by the current LTI
1.1 implementation of modulestore and courseware content. But, Content
Libraries are orthogonal. Its use-case is to offer standalone, embedded
content from a specific backend (blockstore). As such, it decouples from
LTI 1.1. and the logic assumes no relationship or impact across the two
applications. The same reasoning applies to steps beyond the data model,
such as at the XBlock runtime, authentication, score handling, etc.

Content Libraries LTI 1.3 Launch
--------------------------------

To execute a launch, first the content library and LTI tool must be set
up on both the platform and the tools (Example: Canvas LMS). you can
follow the instructions in the PR
`27411 <https://github.com/openedx/edx-platform/pull/27411>`__ on how to
setup the content library and tool for example.

LTI 1.3 uses a modified version of the OpenId Connect third party
initiate login flow. This means that to do an LTI 1.3 launch, you must
first, receive a login initialization request and return to the
platform, the tool will initialize the login request by sending a GET or
POST request to LtiToolLoginView, this will receive the target_link_uri
previously set up on the tool and redirect to the launch view.

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
           # for customer-facing errors.
           log.error('LTI OIDC login failed: %s', exc)
           return HttpResponseBadRequest('Invalid LTI login request.')

On the redirected LtiToolLaunchView POST request, a launch message
object will be created using DjangoMessageLaunch from the pylti1.3
library, then the ``id`` parameter from the request will be used with
LibraryUsageLocatorV2 to retrieve the usage key of the content
requested, and also use that usage key to check if the current issuer
and the authorization server is authorized to launch the content using
the ``authorize_lti_launch`` function.

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

   # Authenticate the launch and set up LTI profiles.

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

After all requested information has been processed, the view will load
the requested block, also set up the signal handler for AGS, and
generating the required context data that will be sent with the view
response:

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
=============================

The receiver ``score_changed_handler`` on
``openedx/core/djangoapps/content_libraries/signal_handlers.py``, will
catch the signal PROBLEM_WEIGHTED_SCORE_CHANGED from
``lms.djangoapps.grades.api``, this will send a request to the LTI
platform to update the assignment score using the method
``update_score`` of the LtiGradedResource associated with the
``usage_id`` received from the signal.

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
=======================

-  Add new settings to enable LTI 1.3 platform tool. (Ex:
   https://github.com/openedx/edx-platform/blob/bfe6494e9d71f42513885b83afae2664cc52a4cc/lms/envs/production.py#L799)
-  Add model to relate LTI 1.3 subjects to platform users. (Ex:
   https://github.com/openedx/edx-platform/pull/27411/files#diff-36022deef8607c7a4647c8f2620b4d9ed283d5b41077e966bfd097585e0ebe7cR314).
-  Add model to store LTI 1.3 graded resources. (Ex:
   https://github.com/openedx/edx-platform/pull/27411/files#diff-36022deef8607c7a4647c8f2620b4d9ed283d5b41077e966bfd097585e0ebe7cR434).
-  Add ModelBackend to authenticate LTI launches using iss, aud, sub,
   claims. (Ex:
   https://github.com/openedx/edx-platform/pull/27411/files/#diff-de507716bf580a04015b1aacdd87eba1792cda2be79773bd7bdf63ab753cb9adR19).
-  Add view for LTI 1.3 third-party Initiated OpenID login. (Ex:
   https://github.com/openedx/edx-platform/pull/27411/files#diff-aee1ed7cd71a9cbd5d28d029e3589f4391e7ecc0259178a20a48cbb4f752aea5R849).
-  Add view for LTI 1.3 launch. (Ex:
   https://github.com/openedx/edx-platform/pull/27411/files#diff-aee1ed7cd71a9cbd5d28d029e3589f4391e7ecc0259178a20a48cbb4f752aea5R883).
   - Parse data from the launch message. - Parse requested resource
   (Example: usage_id, course_id, etc). - Get or create a
   subject-related model instance from iss, aud, sub claims. -
   Authenticate the user using the subject-related model. - Verify
   permissions to render the resource. (We could add a signal here to
   verify extra permissions from other apps, for example, Licensing). -
   Verify message contains AGS service. - Validate AGS lineitem and
   score. (Example:
   https://github.com/openedx/edx-platform/pull/27411/files/#diff-aee1ed7cd71a9cbd5d28d029e3589f4391e7ecc0259178a20a48cbb4f752aea5R1030).
   - Upsert graded resource from launch (Example:
   https://github.com/openedx/edx-platform/pull/27411/files/#diff-aee1ed7cd71a9cbd5d28d029e3589f4391e7ecc0259178a20a48cbb4f752aea5R1053).
-  Add logic to get or automatically create LTI users for LTI launches.
   (Ex:
   https://github.com/openedx/edx-platform/pull/27411/files#diff-36022deef8607c7a4647c8f2620b4d9ed283d5b41077e966bfd097585e0ebe7cR374,
   https://github.com/openedx/edx-platform/blob/bfe6494e9d71f42513885b83afae2664cc52a4cc/lms/djangoapps/lti_provider/users.py#L47)
-  Add or modify PROBLEM_WEIGHTED_SCORE_CHANGED receiver to update
   graded resources scores. (Ex:
   https://github.com/openedx/edx-platform/blob/master/lms/djangoapps/lti_provider/signals.py#L40).
   - Get related graded resources from data received. - Get all
   assignments related - Increment the version value of each assignment
   - Determine each assignment type and send the corresponding task
   (composite module, or single problem). - Send the task to update the
   score for each assignment by sending a message back to the platform
   related to the resource. (Example:
   https://github.com/openedx/edx-platform/pull/27411/files#diff-36022deef8607c7a4647c8f2620b4d9ed283d5b41077e966bfd097585e0ebe7cR480)

Approach A: Create a new app ~~~~~~~~~~~~~~~~~~~~~~~~~~

This approach would be similar to the one proposed in the `PR
21435 <https://github.com/openedx/edx-platform/pull/21435>`__). We will
create a new app (Example: lti1p3_tool), and integrate all logic related
to LTI 1.3 separated from the existing lti_provider app.

Approach B: Refactor the lti_provider app
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We could refactor the existing lti_provider. With this approach, we
could separate the logic of each specification per folder, and keep
utilities that are used on both specifications on the base folder of the
app, here is an example of the folder structure:

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
   │   ├── __init__.py # LtiUser and GradedAssignment model could be  here
   │   ├── 1p1 # Create LtiUser1p1 using multi-table inheritance with LtiUser
   │   └── 1p3 # Create LtiUser1p3 using multi-table inheritance with LtiUser
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

Approach C: Create LTI Provider Plugin
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Another approach would be to create a new openedx-plugin. We would
create a new app that will include a common set of utilities and
services used by both LTI 1.1 and LTI 1.3, and an app for each LTI
specification, and their corresponding services, each one with their
views and tasks. Similar to the structure of the B approach. This
approach would also avoid adding more code to the monolithic
edx-platform structure.

In this approach, we will require to import a few classes and functions
from edx-platform, for example, the User model to keep track of users on
LTI launches the PROBLEM_WEIGHTED_SCORE_CHANGED signal to receive the
score changes and more.

LTI 1.3 Open edX community discussion
=====================================

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
==========

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
10. LTI XBlock Consumer: https://github.com/openedx/xblock-lti-consumer
11. Previous LTI 1.3 PR:
    https://github.com/openedx/edx-platform/pull/21435
12. Content Libraries V2 LTI 1.3 Tool:
    https://github.com/openedx/edx-platform/pull/27411
13. Content Libraries V2 LTI 1.3 Tool ADR:
    https://github.com/openedx/edx-platform/pull/27089/files
