PADV-233: Credly XBlock Discovery
=================================

Status
======

In progress.

Context
=======

OpenEDX supports badges using Badgr as a badge generator [1]_. Badges can
only be obtained by learners when any of the following events occur:

- A learner enrolls in a certain number of courses.
- A learner receives a completion certificate for a certain number
  of courses.
- A learner receives a completion certificate for every course in a
  specified list of courses.

Badgr works by using the Open Badges specification.
Currently, there is no other event from which badges can
be awarded to learners. A few years back there was an XBlock developed
to award learners badges based on a passing grade for a specific
subsection in a course [4]_. This XBlock can work by communicating with the
Badgr API, this XBlock no longer works on versions newer than the Ginkgo
release, and also requires modifying the edx-platform grade V0 API
views. This discovery is to analyze how we could add such a feature to
award badges using Credly and what other events could
be used to award badges to learners.

XBlock Overview
===============

XBlocks are like miniature web applications: they maintain state in a
storage layer, render themselves through views, and process user actions
through handlers [5]_.

XBlocks differ from web applications in that they render only a small
piece of a complete web page.

Like HTML <div> tags, XBlocks can represent components as small as a
paragraph of text, a video, a multiple-choice input field, or as
large as a section, a chapter, or an entire course.

Plugins
-------

Plug-ins within XBlocks fall into three categories right now:

- XBlocks: Client-viewable self-contained chunks of functionality,
  including data and code.
- Services: Things like tools for getting at data from other parts
  of the system, creating and extracting educational analytics, and
  similar.
- Fields: These store data for XBlocks.

This taxonomy may likely be rethought at some point, and
become more fluid. XBlocks need to talk to each other, in much the same
way they talk to services. Fields and XBlocks both store data, and
XBlocks need access to not only their Field data but to other
XBlocks. Fields need editing views (now up to each runtime).

- XBlock Reference Implementation: https://github.com/openedx/XBlock/tree/master/xblock/reference

Fields API
----------

Fields declare storage for XBlock data. They use abstract notions of
scopes to associate each field with particular sets of blocks and users.
The hosting runtime application decides what actual storage mechanism to
use for each scope. These are the types of fields you can declare on an XBlock:

- xblock.fields.Field: A field class that can be used as a class attribute
  to define what data the class will want to refer to.
- xblock.fields.Boolean: A field class for representing a boolean.
- xblock.fields.Dict: A field class for representing a Python dict.
- xblock.fields.Float: A field that contains a float.
- xblock.fields.Integer: A field that contains an integer.
- xblock.fields.List: A field class for representing a list.
- xblock.fields.Set: A field class for representing a set.
- xblock.fields.DateTime: A field for representing a datetime.
- xblock.fields.String: A field class for representing a string.
- xblock.fields.XMLString: A field class for representing an XML string.

Read more: https://edx.readthedocs.io/projects/xblock/en/latest/fields.html
API Source code: https://github.com/openedx/XBlock/blob/master/xblock/fields.py

Scopes
------

The content scope is used to save data for all users, for one particular
block, across all runs of a course. An example might be an XBlock that
wishes to tabulate user “upvotes”, or HTML content to display literally
on the page (this example being the reason this scope is named content).

The settings scope is used to save data for all users, for one particular
block, for one specific run of a course. This is like the content scope
but scoped to one run of a course. An example might be a due date for a
problem.

The user_state scope is used to save data for one user, for one block,
and one run of a course. An example might be how many points a user
scored on one specific problem.

The preferences scope is used to save data for one user, for all
instances of one specific TYPE of block, across the entire platform.
An example might be that a user can set their preferred default speed
for the video player. This default would apply to all instances of the
video player, across the whole platform, but only for that student.

The user_info scope is used to save data for one user, across the entire
platform. An example might be a user’s time zone or language preference.

The user_state_summary scope is used to save data aggregated across many
users of a single block. For example, a block might store a histogram of
the points scored by all users attempting a problem.

- Read more: https://edx.readthedocs.io/projects/xblock/en/latest/fields.html
- API Source code: https://github.com/openedx/XBlock/blob/master/xblock/fields.py

Fragments
---------

The web fragments library provides a Python and Django implementation
for managing fragments of web pages. In particular, this library
refactors the fragment code from XBlock into a standalone implementation.

A Django view subclass called FragmentView is provided which supports
three different ways of rendering a fragment into a page:

- the fragment can be rendered as a standalone page at its URL
- the fragment can be rendered into another page directly from Django
- the fragment can be returned as JSON so that it can be rendered client-side

A fragment consists of HTML for the body of the page, and a series of
resources needed by the body. Resources are specified with a MIME type
(such as "application/javascript" or "text/css") that determines how they
are inserted into the page.  The resource is provided either as literal
text or as a URL.  Text will be included on the page, wrapped
appropriately for the MIME type.  URLs will be used as-is on the page.

Here is an example of how it's used on the Drag and Drop v2 XBlock:

.. code:: python

   fragment = Fragment()
   fragment.add_content(loader.render_django_template('/templates/html/drag_and_drop.html',
                                                      i18n_service=self.i18n_service))
   css_urls = (
      'public/css/drag_and_drop.css',
   )
   js_urls = [
      'public/js/vendor/virtual-dom-1.3.0.min.js',
      'public/js/drag_and_drop.js',
   ]

   statici18n_js_url = self._get_statici18n_js_url()
   if statici18n_js_url:
      js_urls.append(statici18n_js_url)

   for css_url in css_urls:
      fragment.add_css_url(self.runtime.local_resource_url(self, css_url))
   for js_url in js_urls:
      fragment.add_javascript_url(self.runtime.local_resource_url(self, js_url))

   self.include_theme_files(fragment)

   fragment.initialize_js('DragAndDropBlock', self.student_view_data())

- Library source code: https://github.com/openedx/web-fragments
- XBlock source code: https://github.com/openedx/xblock-drag-and-drop-v2/blob/master/drag_and_drop_v2/drag_and_drop_v2.py

Badgr XBlock
============

The badgr-xblock was developed to work in conjunction with the
open-source Badgr Server application or the hosted version at Badgr.io.
The badgr-xblock communicates with the Badgr API, and awards badges
based on a passing grade for a specified subsection in a course.

To do this, the badgr-xblock uses various XBlock services, such as
settings, badging, and user services, it also executes various API calls
to edx-platform grades API v0 (which no longer exists on versions newer
than Ginkgo) and the Badgr API. Also on the XBlock, a few fields are
defined to let the staff set up which badge to award, and to which
subsection will determine if a score is enough to assert a badge,
here is the list of fields:

-  issuer_slug: Issuer name.
-  badge_slug: Badge name.
-  badge_name: Badge name that appears in the Accomplishments tab.
-  image_url: The URL for the badge image on the Badgr server.
-  criteria: Text to describe how one earns this badge.
-  description: Text description of this badge.
-  section_title: This should be the display name of the sub-section you
   want to check the score from.
-  pass_mark: Minimum grade required to award this badge.
-  received_award: Boolean to store if the user received a badge for
   this sub-section.
-  check_earned: True if they are eligible for a badge.
-  assertion_url: The URL of the asserted badge in case it was already
   awarded.
-  award_message: Message the user will see upon receiving a badge.
-  motivation_message: Message the user will see if they do not qualify
   for a badge.

Once setup, this XBlock will display a button with the text “Click here
to view your results.”, once the learner clicks on it, the JavaScript
function getGrades will be executed to request the current grading of
the setup sub-section, if the minimum pass mark is achieved, it will
execute the method new_award_badge using the XBlock handlerUrl runtime
to award a new badge using the current setup badging service set up on
the edx-platform, and reload the XBlock HTML to display the newly
created badge for this user, otherwise, it will reload the HTML to an
error message.

XBlock Proposal
===============

Given how badgr-xblock can interact with Badgr and the edx-platform to
award badges, we could create a new XBlock to replicate this exact
functionality using Credly as a backend service for badging to award
badges on sub-section completion. A template for this XBlock could be
generated using the XBlock SDK, this SDK also contains various examples
of how we could use XBlock for various scenarios.

This XBlock will depend on the Credly badging backend implementation
beign developed, this backend service will be the reponsible of the
communcation with the Credly API [12]_.

We could query course grades using the grades v1 API grade book
endpoint, which will return a list of the scores for each graded
subsection per user, another option could be using the XBlock get_parent
to trace the parent block to get a problem using an usage_key setup on
this XBlock, to award badges for a specific unit or problem, the
disadvantage of this method would be that the XBlock can only get the
grade of the unit or problem at the moment this XBlock is being
rendered. A mix of these methods could also be used to award a badge
based on the completion of a group of sub-sections or a group of
usage_keys which are graded problems.

As described before, there are various methods we could use to retrieve
information from the XBlock or platform to determine the conditions to
generate a badge assertion (award a badge), either by requesting data
using any API endpoint on the edx-platform using JavaScript, accessing
the environment using the XBlock runtime API, using information stored
in any of the scopes of the XBlock, using information stored in the
XBlock fields, or using any of the XBlock services, such as the user
service. More information on what API methods are available can be found
in the XBlock API guide.

Badging with XBlock Cons
------------------------

- Course/subsection scope which means there would be no badges that
  involve multiple courses, for example, courses of the program.
- Badges can only be awarded manually when a learner interacts
  with an XBlock.
- This XBlock will rely on the Credly backend implementation,
  so the integration with Credly will depend upon the Credly backend
  implementation and where where it will be located
  (Plugin, add a new Djangoapp in edx-platform, Python package...)

Badging with XBlock Pros
------------------------

- Xblock in a studio offers a UI where content creators can configure the
  Badge. The platform is missing this part, and the only way to customize a
  Badge is through Django admin.
- If a course does not require a Badge, then there is no need to set up
  the xblock for this course. Platform Course Completion has this issue,
  All courses that issue certificates are going to issue badges as well,
  therefore when using Badges there is a need to disable this feature
  per course in case badges are not required.
- It does not care if the Course is in verified mode. As the Platform Badging
  system relies on certificates, the platform can only award badges to
  people who purchased the verified track.

References
==========

-  [1] Enabled Badging:
   https://edx.readthedocs.io/projects/edx-installing-configuring-and-running/en/latest/configuration/enable_badging.html
-  [2] XBlock API Guide:
   https://edx.readthedocs.io/projects/xblock/en/latest/index.html
-  [3] XBlock Reference Implementation:
   https://github.com/openedx/XBlock/tree/master/xblock/reference
-  [4] Badgr XBlock (Deprecated):
   https://github.com/proversity-org/badgr-xblock
-  [5] Introduction to XBlocks:
   https://edx.readthedocs.io/projects/xblock/en/latest/introduction.html
-  [6] XBlocks Reference Implementations:
   https://github.com/openedx/XBlock/tree/master/xblock/reference
-  [7] XBlock Fields API:
   https://edx.readthedocs.io/projects/xblock/en/latest/fields.html
-  [8] XBlock Fields Source Code:
   https://github.com/openedx/XBlock/blob/master/xblock/fields.py
-  [9] XBlock SDK: https://github.com/openedx/xblock-sdk
-  [10] web-fragments: https://github.com/openedx/web-fragments
-  [11] Drag and Drop XBlock v2:
   https://github.com/openedx/xblock-drag-and-drop-v2/blob/master/drag_and_drop_v2/drag_and_drop_v2.py
-  [12] Credly Backend Implementation:
   https://github.com/Pearson-Advance/course_operations/blob/vue/PADV-234/pearson_course_operation/docs/discoveries/001-add-credly-support.rst
-  [13] Credly Developer API: https://www.credly.com/docs
-  [14] Credly OBI Methods:
   https://www.credly.com/docs/obi_specified_endpoints
-  [15] Open Badges v2.0 IMS Final Release:
   https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html
