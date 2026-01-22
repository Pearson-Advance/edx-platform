
'use strict';
{
  const globals = this;
  const django = globals.django || (globals.django = {});

  
  django.pluralidx = function(n) {
    const v = 0;
    if (typeof v === 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  /* gettext library */

  django.catalog = django.catalog || {};
  
  const newcatalog = {
    "%(sel)s of %(cnt)s selected": [
      "%(sel)s\uac1c\uac00 %(cnt)s\uac1c \uc911\uc5d0 \uc120\ud0dd\ub428."
    ],
    "%s selected option not visible": [
      "%s \uc120\ud0dd\ub41c \uc635\uc158\uc740 \ud45c\uc2dc\ub418\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4."
    ],
    "(click to clear)": "(\ud074\ub9ad\ud558\uc5ec \ud574\uc81c)",
    "6 a.m.": "\uc624\uc804 6\uc2dc",
    "6 p.m.": "\uc624\ud6c4 6\uc2dc",
    "Add Multiplier as a Number Greater Than 1": "1\ubcf4\ub2e4 \ud070 \uc22b\uc790\ub85c \uc2b9\uc218\ub97c \ucd94\uac00\ud569\ub2c8\ub2e4.",
    "Add Policy Exception": "\uc815\ucc45 \uc608\uc678 \ucd94\uac00",
    "Add Time(Minutes)": "\uc2dc\uac04 \ucd94\uac00(\ubd84)",
    "Additional Time (minutes)": "\ucd94\uac00 \uc2dc\uac04 (\ubd84)",
    "An error has occurred during your onboarding exam. Please retry onboarding.": "\uc628\ubcf4\ub529 \uc2dc\ud5d8 \uc911 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc628\ubcf4\ub529\uc744 \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694.",
    "Approved in Another Course": "\ub2e4\ub978 \uacfc\uc815\uc5d0\uc11c \uc2b9\uc778\ub428",
    "April": "4\uc6d4",
    "Are you sure you want to leave this page? \nTo pass your proctored exam you must also pass the online proctoring session review.": "\uc774 \ud398\uc774\uc9c0\ub97c \ub5a0\ub098\uc2dc\uaca0\uc2b5\ub2c8\uae4c?\n\uac10\ub3c5 \uc2dc\ud5d8\uc5d0 \ud569\uaca9\ud558\ub824\uba74 \uc628\ub77c\uc778 \uac10\ub3c5 \uc138\uc158 \uac80\ud1a0\uc5d0\ub3c4 \ud569\uaca9\ud574\uc57c \ud569\ub2c8\ub2e4.",
    "Are you sure you want to remove this student's exam attempt?": "\uc774 \ud559\uc0dd\uc758 \uc2dc\ud5d8 \uc2dc\ub3c4\ub97c \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",
    "Are you sure you want to resume this student's exam attempt?": "\uc774 \ud559\uc0dd\uc758 \uc2dc\ud5d8\uc744 \ub2e4\uc2dc \uc2dc\uc791\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",
    "Audit": "\uc2ec\uc0ac",
    "August": "8\uc6d4",
    "Available %s": "\uc774\uc6a9 \uac00\ub2a5\ud55c %s",
    "Cancel": "\ucde8\uc18c",
    "Choose %s by selecting them and then select the \"Choose\" arrow button.": "%s \uc120\ud0dd \ud6c4 \"\uc120\ud0dd\" \ud654\uc0b4\ud45c \ubc84\ud2bc\uc744 \ub204\ub974\uc138\uc694.",
    "Choose a Date": "\uc2dc\uac04 \uc120\ud0dd",
    "Choose a Time": "\uc2dc\uac04 \uc120\ud0dd",
    "Choose a time": "\uc2dc\uac04 \uc120\ud0dd",
    "Choose all %s": "\ubaa8\ub4e0 %s \uc120\ud0dd",
    "Choose selected %s": "\uc120\ud0dd\ud55c %s \uc120\ud0dd",
    "Chosen %s": "\uc120\ud0dd\ub41c %s",
    "Created": "\uc0dd\uc131\ub428",
    "Credit": "\uc2e0\uc6a9 \uac70\ub798",
    "December": "12\uc6d4",
    "Declined": "\uac70\uc808\ub428",
    "Download Software Clicked": "\uc18c\ud504\ud2b8\uc6e8\uc5b4 \ub2e4\uc6b4\ub85c\ub4dc \ud074\ub9ad",
    "Eligible": "\uc790\uaca9\uc774 \uc788\ub294",
    "Error": "\uc624\ub958",
    "Error Ending Exam": "\uc2dc\ud5d8 \uc885\ub8cc \uc624\ub958",
    "Error Starting Exam": "\uc2dc\ud5d8 \uc2dc\uc791 \uc624\ub958",
    "Executive Education": "\uc784\uc6d0 \uad50\uc721",
    "Expired": "\ub9cc\ub8cc\ub428",
    "Expiring Soon": "\uace7 \ub9cc\ub8cc\ub429\ub2c8\ub2e4",
    "February": "2\uc6d4",
    "Filter": "\ud544\ud130",
    "Friday": "\uae08\uc694\uc77c",
    "Honor": "\uba85\uc608",
    "If your device has changed, we recommend that you complete this course's onboarding exam in order to ensure that your setup still meets the requirements for proctoring.": "\uae30\uae30\ub97c \ubcc0\uacbd\ud55c \uacbd\uc6b0, \uac10\ub3c5 \uc694\uad6c \uc0ac\ud56d\uc744 \uc5ec\uc804\ud788 \ucda9\uc871\ud558\ub294 \uc124\uc815\uc774 \uc788\ub294\uc9c0 \ud655\uc778\ud558\uae30 \uc704\ud574 \uc774 \uacfc\uc815\uc758 \uc628\ubcf4\ub529 \uc2dc\ud5d8\uc744 \uc644\ub8cc\ud558\ub294 \uac83\uc774 \uc88b\uc2b5\ub2c8\ub2e4.",
    "January": "1\uc6d4",
    "July": "7\uc6d4",
    "June": "6\uc6d4",
    "March": "3\uc6d4",
    "Master's": "\uc11d\uc0ac",
    "May": "5\uc6d4",
    "Midnight": "\uc790\uc815",
    "Monday": "\uc6d4\uc694\uc77c",
    "No ID Professional": "ID \uc804\ubb38\uac00 \uc5c6\uc74c",
    "Noon": "\uc815\uc624",
    "Not Started": "\uc2dc\uc791\ub418\uc9c0 \uc54a\uc74c",
    "Note: You are %s hour ahead of server time.": [
      "Note: \uc11c\ubc84 \uc2dc\uac04\ubcf4\ub2e4 %s \uc2dc\uac04 \ube60\ub985\ub2c8\ub2e4."
    ],
    "Note: You are %s hour behind server time.": [
      "Note: \uc11c\ubc84 \uc2dc\uac04\ubcf4\ub2e4 %s \uc2dc\uac04 \ub2a6\uc740 \uc2dc\uac04\uc785\ub2c8\ub2e4."
    ],
    "November": "11\uc6d4",
    "Now": "\ud604\uc7ac",
    "OK": "\ud655\uc778",
    "October": "10\uc6d4",
    "Onboarding Expired": "\uc628\ubcf4\ub529 \ub9cc\ub8cc",
    "Onboarding Failed": "\uc628\ubcf4\ub529 \uc2e4\ud328",
    "Onboarding Missing": "\uc628\ubcf4\ub529 \ub204\ub77d",
    "Onboarding Pending": "\uc628\ubcf4\ub529 \ubcf4\ub958 \uc911",
    "Onboarding Reset Failed Due to Past Due Exam": "\uc2dc\ud5d8 \uae30\ud55c\uc774 \uc9c0\ub09c \uad00\uacc4\ub85c \uc628\ubcf4\ub529 \uc7ac\uc124\uc815\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",
    "Onboarding Started": "\uc628\ubcf4\ub529 \uc2dc\uc791\ub428",
    "Practice": "\uc5f0\uc2b5",
    "Proctored": "\uac10\ub3c5\ubc1b\ub294",
    "Professional": "\uc804\ubb38\uc801\uc778",
    "Ready to start": "\uc2dc\uc791\ud560 \uc900\ube44\uac00 \ub418\uc5c8\uc2b5\ub2c8\ub2e4",
    "Ready to submit": "\uc81c\ucd9c \uc900\ube44 \uc644\ub8cc",
    "Rejected": "\uac70\ubd80\ub428",
    "Remove %s by selecting them and then select the \"Remove\" arrow button.": "%s \uc120\ud0dd \ud6c4 \"\uc0ad\uc81c\ud558\uae30\" \ud654\uc0b4\ud45c \ubc84\ud2bc\uc744 \ub204\ub974\uc138\uc694.",
    "Remove all %s": "\ubaa8\ub4e0 %s \uc0ad\uc81c",
    "Remove selected %s": "\uc120\ud0dd\ud55c %s \uc0ad\uc81c",
    "Required field": "\ud544\uc218 \uc785\ub825 \ud56d\ubaa9",
    "Review Policy Exception": "\uac80\ud1a0 \uc815\ucc45 \uc608\uc678",
    "Saturday": "\ud1a0\uc694\uc77c",
    "Second Review Required": "2\ucc28 \uac80\ud1a0\uac00 \ud544\uc694\ud569\ub2c8\ub2e4",
    "September": "9\uc6d4",
    "Setup Started": "\uc124\uce58 \uc2dc\uc791",
    "Something has gone wrong ending your exam. Please double-check that the application is running.": "\uc2dc\ud5d8\uc744 \uc885\ub8cc\ud558\ub294 \ub370 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \uc751\uc6a9 \ud504\ub85c\uadf8\ub7a8\uc774 \uc2e4\ud589 \uc911\uc778\uc9c0 \ub2e4\uc2dc \ud55c \ubc88 \ud655\uc778\ud558\uc138\uc694.",
    "Something has gone wrong ending your exam. Please reload the page and start again.": "\uc2dc\ud5d8\uc744 \uc885\ub8cc\ud558\ub294 \ub370 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \ud398\uc774\uc9c0\ub97c \ub2e4\uc2dc \ub85c\ub4dc\ud558\uace0 \ub2e4\uc2dc \uc2dc\uc791\ud558\uc138\uc694.",
    "Something has gone wrong starting your exam. Please double-check that the application is running.": "\uc2dc\ud5d8\uc744 \uc2dc\uc791\ud558\ub294 \uc911\uc5d0 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \uc751\uc6a9 \ud504\ub85c\uadf8\ub7a8\uc774 \uc2e4\ud589 \uc911\uc778\uc9c0 \ub2e4\uc2dc \ud55c \ubc88 \ud655\uc778\ud558\uc138\uc694.",
    "Something has gone wrong starting your exam. Please reload the page and start again.": "\uc2dc\ud5d8\uc744 \uc2dc\uc791\ud558\ub294 \uc911\uc5d0 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \ud398\uc774\uc9c0\ub97c \ub2e4\uc2dc \ub85c\ub4dc\ud558\uace0 \ub2e4\uc2dc \uc2dc\uc791\ud558\uc138\uc694.",
    "Started": "\uc2dc\uc791\ud568",
    "Submitted": "\uc81c\ucd9c\ub41c",
    "Sunday": "\uc77c\uc694\uc77c",
    "Thursday": "\ubaa9\uc694\uc77c",
    "Time Multiplier": "\uc2dc\uac04 \ubc30\uc218\uae30",
    "Timed": "\uc2dc\uac04 \uc81c\ud55c",
    "Timed out": "\uc2dc\uac04 \ucd08\uacfc",
    "Today": "\uc624\ub298",
    "Tomorrow": "\ub0b4\uc77c",
    "Tuesday": "\ud654\uc694\uc77c",
    "Type into this box to filter down the list of available %s.": "\uc0ac\uc6a9 \uac00\ub2a5\ud55c %s \ub9ac\uc2a4\ud2b8\ub97c \ud544\ud130\ub9c1\ud558\ub824\uba74 \uc774 \uc0c1\uc790\uc5d0 \uc785\ub825\ud558\uc138\uc694.",
    "Type into this box to filter down the list of selected %s.": "\uc120\ud0dd\ub41c %s\uc758 \ub9ac\uc2a4\ud2b8\ub97c \ud544\ud130\ub9c1 \ud558\ub824\uba74 \uc774 \ubc15\uc2a4\uc5d0 \uc785\ub825 \ud558\uc138\uc694 .",
    "Verified": "\ud655\uc778\ub428",
    "Wednesday": "\uc218\uc694\uc77c",
    "Yesterday": "\uc5b4\uc81c",
    "You have not started your onboarding exam.": "\uc544\uc9c1 \uc628\ubcf4\ub529 \uc2dc\ud5d8\uc744 \uc2dc\uc791\ud558\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4.",
    "You have selected an action, and you haven\u2019t made any changes on individual fields. You\u2019re probably looking for the Go button rather than the Save button.": "\uac1c\ubcc4 \ud544\ub4dc\uc5d0 \uc544\ubb34\ub7f0 \ubcc0\uacbd\uc774 \uc5c6\ub294 \uc0c1\ud0dc\ub85c \uc561\uc158\uc744 \uc120\ud0dd\ud588\uc2b5\ub2c8\ub2e4. \uc800\uc7a5 \ubc84\ud2bc\uc774 \uc544\ub2c8\ub77c \uc9c4\ud589 \ubc84\ud2bc\uc744 \ucc3e\uc544\ubcf4\uc138\uc694.",
    "You have selected an action, but you haven\u2019t saved your changes to individual fields yet. Please click OK to save. You\u2019ll need to re-run the action.": "\uac1c\ubcc4 \ud544\ub4dc\uc758 \uac12\ub4e4\uc744 \uc800\uc7a5\ud558\uc9c0 \uc54a\uace0 \uc561\uc158\uc744 \uc120\ud0dd\ud588\uc2b5\ub2c8\ub2e4. OK\ub97c \ub204\ub974\uba74 \uc800\uc7a5\ub418\uba70, \uc561\uc158\uc744 \ud55c \ubc88 \ub354 \uc2e4\ud589\ud574\uc57c \ud569\ub2c8\ub2e4.",
    "You have started your onboarding exam.": "\uc628\ubcf4\ub529 \uc2dc\ud5d8\uc744 \uc2dc\uc791\ud588\uc2b5\ub2c8\ub2e4.",
    "You have submitted your onboarding exam.": "\uadc0\ud558\ub294 \ud0d1\uc2b9 \uc2dc\ud5d8\uc744 \uc81c\ucd9c\ud588\uc2b5\ub2c8\ub2e4.",
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "\uac1c\ubcc4 \ud3b8\uc9d1 \uac00\ub2a5\ud55c \ud544\ub4dc\uc5d0 \uc800\uc7a5\ub418\uc9c0 \uc54a\uc740 \uac12\uc774 \uc788\uc2b5\ub2c8\ub2e4. \uc561\uc158\uc744 \uc218\ud589\ud558\uba74 \uc800\uc7a5\ub418\uc9c0 \uc54a\uc740 \uac12\ub4e4\uc744 \uc783\uc5b4\ubc84\ub9ac\uac8c \ub429\ub2c8\ub2e4.",
    "Your onboarding exam has been approved in another course.": "\uadc0\ud558\uc758 \uc628\ubcf4\ub529 \uc2dc\ud5d8\uc740 \ub2e4\ub978 \uacfc\uc815\uc5d0\uc11c \uc2b9\uc778\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",
    "Your onboarding exam has been approved in this course.": "\uc774 \uacfc\uc815\uc5d0\uc11c \uadc0\ud558\uc758 \uc628\ubcf4\ub529 \uc2dc\ud5d8\uc774 \uc2b9\uc778\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",
    "Your onboarding exam has been rejected. Please retry onboarding.": "\uc628\ubcf4\ub529 \uc2dc\ud5d8\uc774 \uac70\ubd80\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc628\ubcf4\ub529\uc744 \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694.",
    "Your onboarding profile has been approved. However, your onboarding status is expiring soon. Please complete onboarding again to ensure that you will be able to continue taking proctored exams.": "\uc628\ubcf4\ub529 \ud504\ub85c\ud544\uc774 \uc2b9\uc778\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \ud558\uc9c0\ub9cc \uc628\ubcf4\ub529 \uc0c1\ud0dc\uac00 \uace7 \ub9cc\ub8cc\ub429\ub2c8\ub2e4. \uac10\ub3c5\uad00 \uc2dc\ud5d8\uc744 \uacc4\uc18d \uc751\uc2dc\ud560 \uc218 \uc788\ub3c4\ub85d \uc628\ubcf4\ub529\uc744 \ub2e4\uc2dc \uc644\ub8cc\ud574 \uc8fc\uc138\uc694.",
    "Your onboarding status has expired. Please complete onboarding again to continue taking proctored exams.": "\uc628\ubcf4\ub529 \uc0c1\ud0dc\uac00 \ub9cc\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \uac10\ub3c5 \uc2dc\ud5d8\uc744 \uacc4\uc18d \uce58\ub974\ub824\uba74 \uc628\ubcf4\ub529\uc744 \ub2e4\uc2dc \uc644\ub8cc\ud558\uc138\uc694.",
    "abbrev. day Friday\u0004Fri": "\uae08",
    "abbrev. day Monday\u0004Mon": "\uc6d4",
    "abbrev. day Saturday\u0004Sat": "\ud1a0",
    "abbrev. day Sunday\u0004Sun": "\uc77c",
    "abbrev. day Thursday\u0004Thur": "\ubaa9",
    "abbrev. day Tuesday\u0004Tue": "\ud654",
    "abbrev. day Wednesday\u0004Wed": "\uc218",
    "abbrev. month April\u0004Apr": "4\uc6d4",
    "abbrev. month August\u0004Aug": "8\uc6d4",
    "abbrev. month December\u0004Dec": "12\uc6d4",
    "abbrev. month February\u0004Feb": "2\uc6d4",
    "abbrev. month January\u0004Jan": "1\uc6d4",
    "abbrev. month July\u0004Jul": "7\uc6d4",
    "abbrev. month June\u0004Jun": "6\uc6d4",
    "abbrev. month March\u0004Mar": "3\uc6d4",
    "abbrev. month May\u0004May": "5\uc6d4",
    "abbrev. month November\u0004Nov": "11\uc6d4",
    "abbrev. month October\u0004Oct": "10\uc6d4",
    "abbrev. month September\u0004Sep": "9\uc6d4",
    "one letter Friday\u0004F": "\uae08",
    "one letter Monday\u0004M": "\uc6d4",
    "one letter Saturday\u0004S": "\ud1a0",
    "one letter Sunday\u0004S": "\uc77c",
    "one letter Thursday\u0004T": "\ubaa9",
    "one letter Tuesday\u0004T": "\ud654",
    "one letter Wednesday\u0004W": "\uc218"
  };
  for (const key in newcatalog) {
    django.catalog[key] = newcatalog[key];
  }
  

  if (!django.jsi18n_initialized) {
    django.gettext = function(msgid) {
      const value = django.catalog[msgid];
      if (typeof value === 'undefined') {
        return msgid;
      } else {
        return (typeof value === 'string') ? value : value[0];
      }
    };

    django.ngettext = function(singular, plural, count) {
      const value = django.catalog[singular];
      if (typeof value === 'undefined') {
        return (count == 1) ? singular : plural;
      } else {
        return value.constructor === Array ? value[django.pluralidx(count)] : value;
      }
    };

    django.gettext_noop = function(msgid) { return msgid; };

    django.pgettext = function(context, msgid) {
      let value = django.gettext(context + '\x04' + msgid);
      if (value.includes('\x04')) {
        value = msgid;
      }
      return value;
    };

    django.npgettext = function(context, singular, plural, count) {
      let value = django.ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
      if (value.includes('\x04')) {
        value = django.ngettext(singular, plural, count);
      }
      return value;
    };

    django.interpolate = function(fmt, obj, named) {
      if (named) {
        return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
      } else {
        return fmt.replace(/%s/g, function(match){return String(obj.shift())});
      }
    };


    /* formatting library */

    django.formats = {
    "DATETIME_FORMAT": "Y\ub144 n\uc6d4 j\uc77c g:i A",
    "DATETIME_INPUT_FORMATS": [
      "%Y-%m-%d %H:%M:%S",
      "%Y-%m-%d %H:%M:%S.%f",
      "%Y-%m-%d %H:%M",
      "%m/%d/%Y %H:%M:%S",
      "%m/%d/%Y %H:%M:%S.%f",
      "%m/%d/%Y %H:%M",
      "%m/%d/%y %H:%M:%S",
      "%m/%d/%y %H:%M:%S.%f",
      "%m/%d/%y %H:%M",
      "%Y\ub144 %m\uc6d4 %d\uc77c %H\uc2dc %M\ubd84 %S\ucd08",
      "%Y\ub144 %m\uc6d4 %d\uc77c %H\uc2dc %M\ubd84",
      "%Y-%m-%d"
    ],
    "DATE_FORMAT": "Y\ub144 n\uc6d4 j\uc77c",
    "DATE_INPUT_FORMATS": [
      "%Y-%m-%d",
      "%m/%d/%Y",
      "%m/%d/%y",
      "%Y\ub144 %m\uc6d4 %d\uc77c"
    ],
    "DECIMAL_SEPARATOR": ".",
    "FIRST_DAY_OF_WEEK": 0,
    "MONTH_DAY_FORMAT": "n\uc6d4 j\uc77c",
    "NUMBER_GROUPING": 3,
    "SHORT_DATETIME_FORMAT": "Y-n-j H:i",
    "SHORT_DATE_FORMAT": "Y-n-j",
    "THOUSAND_SEPARATOR": ",",
    "TIME_FORMAT": "A g:i",
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S",
      "%H:%M:%S.%f",
      "%H:%M",
      "%H\uc2dc %M\ubd84 %S\ucd08",
      "%H\uc2dc %M\ubd84"
    ],
    "YEAR_MONTH_FORMAT": "Y\ub144 n\uc6d4"
  };

    django.get_format = function(format_type) {
      const value = django.formats[format_type];
      if (typeof value === 'undefined') {
        return format_type;
      } else {
        return value;
      }
    };

    /* add to global namespace */
    globals.pluralidx = django.pluralidx;
    globals.gettext = django.gettext;
    globals.ngettext = django.ngettext;
    globals.gettext_noop = django.gettext_noop;
    globals.pgettext = django.pgettext;
    globals.npgettext = django.npgettext;
    globals.interpolate = django.interpolate;
    globals.get_format = django.get_format;

    django.jsi18n_initialized = true;
  }
};

