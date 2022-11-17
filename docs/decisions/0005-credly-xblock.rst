PADV-233: Credly XBlock Discovery
=================================

Status
------

In progress.

Context
-------

OpenEDX supports badges using Badgr as a badge generator. Badges can
only be obtained by learners when they trigger a course completion event
for a course or a set of courses. Badgr works by using the Open Badges
specification. Currently, there is no other event from which badges can
be awarded to learners. A few years back there was an XBlock developed
to award learners badges based on a passing grade for a specific
subsection in a course. This XBlock can work by communicating with the
Badgr API, this XBlock no longer works on versions newer than the Ginkgo
release, and also requires modifying the edx-platform grade V0 API
views. This discovery is to analyze how we could add such a feature to
award badges using Credly and what other events could
be used to award badges to learners.

Badgr XBlock
------------

The badgr-xblock was developed to work in conjunction with the
open-source Badgr Server application or the hosted version at Badgr.io.
The badgr-xblock communicates with the Badgr API, and awards badges
based on a passing grade for a specified subsection in a course.

To do this, the badgr-xblock uses various XBlock services, such as
settings, badging, and user services, it also executes various API calls
to edx-platform grades API v0 (which no longer exists on versions newer
than Ginkgo) and the Badgr API. Also on the XBlock, a few fields are
defined to let the staff set up which badge to award, and to which
subsection it will determine if a score is enough to assert a badge,
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
---------------

Given how badgr-xblock can interact with Badgr and the edx-platform to
award badges, we could create a new XBlock to replicate this exact
functionality using Credly as a backend service for badging to award
badges on sub-section completion. A template for this XBlock could be
generated using the XBlock SDK, this SDK also contains various examples
of how we could use XBlock for various scenarios.

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

References
----------

-  Enabled Badging:
   https://edx.readthedocs.io/projects/edx-installing-configuring-and-running/en/latest/configuration/enable_badging.html
-  XBlock API Guide:
   https://edx.readthedocs.io/projects/xblock/en/latest/index.html
-  XBlock Reference Implementation:
   https://github.com/openedx/XBlock/tree/master/xblock/reference
-  Badgr XBlock (Deprecated):
   https://github.com/proversity-org/badgr-xblock
-  XBlock SDK: https://github.com/openedx/xblock-sdk
-  Credly Developer API: https://www.credly.com/docs
-  Credly OBI Methods:
   https://www.credly.com/docs/obi_specified_endpoints
-  Open Badges v2.0 IMS Final Release:
   https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html
