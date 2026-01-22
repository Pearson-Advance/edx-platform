
'use strict';
{
  const globals = this;
  const django = globals.django || (globals.django = {});

  
  django.pluralidx = function(n) {
    const v = (n != 1);
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
      "umechagua %(sel)s kati ya %(cnt)s",
      "umechagua %(sel)s kati ya %(cnt)s"
    ],
    "6 a.m.": "Saa 12 alfajiri",
    "Add Multiplier as a Number Greater Than 1": "Ongeza Vizidishi kama Nambari Kubwa Kuliko 1",
    "Add Policy Exception": "Ongeza Vighairi vya Sera",
    "Add Time(Minutes)": "Ongeza Muda (Dakika)",
    "Additional Time (minutes)": "Muda wa Ziada (dakika)",
    "An error has occurred during your onboarding exam. Please retry onboarding.": "Hitilafu imetokea wakati wa mtihani wako wa kuingia. Tafadhali jaribu kuabiri tena.",
    "Approved in Another Course": "Imeidhinishwa katika Kozi Nyingine",
    "Are you sure you want to leave this page? \nTo pass your proctored exam you must also pass the online proctoring session review.": "Je, una uhakika unataka kuondoka kwenye ukurasa huu?\n Ili kufaulu mtihani wako wa proctored lazima pia upitishe ukaguzi wa kipindi cha proctoring mtandaoni.",
    "Are you sure you want to remove this student's exam attempt?": "Je, una uhakika unataka kuondoa jaribio la mtihani wa mwanafunzi huyu?",
    "Are you sure you want to resume this student's exam attempt?": "Je, una uhakika unataka kurejesha jaribio la mtihani wa mwanafunzi huyu?",
    "Audit": "Ukaguzi",
    "Available %s": "Yaliyomo: %s",
    "Cancel": "Ghairi",
    "Choose": "Chagua",
    "Choose a time": "Chagua wakati",
    "Choose all": "Chagua vyote",
    "Chosen %s": "Chaguo la %s",
    "Click to choose all %s at once.": "Bofya kuchagua %s kwa pamoja.",
    "Click to remove all chosen %s at once.": "Bofya ili kuondoa %s chaguliwa kwa pamoja.",
    "Created": "Imeundwa",
    "Credit": "Mikopo",
    "Declined": "Imekataliwa",
    "Download Software Clicked": "Upakuaji wa Programu Umebofya",
    "Eligible": "Inastahiki",
    "Error": "Hitilafu",
    "Error Ending Exam": "Hitilafu katika Kumaliza Mtihani",
    "Error Starting Exam": "Hitilafu katika Kuanzisha Mtihani",
    "Executive Education": "Elimu ya Utendaji",
    "Expired": "Muda wake umeisha",
    "Expiring Soon": "Inaisha Muda Hivi Karibuni",
    "Filter": "Chuja",
    "Hide": "Ficha",
    "Honor": "Heshima",
    "If your device has changed, we recommend that you complete this course's onboarding exam in order to ensure that your setup still meets the requirements for proctoring.": "Ikiwa kifaa chako kimebadilika, tunapendekeza ukamilishe mtihani wa kuingia kwenye kozi hii ili kuhakikisha kuwa usanidi wako bado unakidhi mahitaji ya utayarishaji wa mada.",
    "Master's": "Mwalimu",
    "Midnight": "Usiku wa manane",
    "No ID Professional": "Hakuna Mtaalamu wa Kitambulisho",
    "Noon": "Adhuhuri",
    "Not Started": "Haijaanza",
    "Note: You are %s hour ahead of server time.": [
      "Kumbuka: Uko saa %s mbele ukilinganisha na majira ya seva",
      "Kumbuka: Uko masaa %s mbele ukilinganisha na majira ya seva"
    ],
    "Note: You are %s hour behind server time.": [
      "Kumbuka: Uko saa %s nyuma ukilinganisha na majira ya seva",
      "Kumbuka: Uko masaa %s nyuma ukilinganisha na majira ya seva"
    ],
    "Now": "Sasa",
    "OK": "sawa",
    "Onboarding Expired": "Muda wa Kuabiri Umeisha",
    "Onboarding Failed": "Imeshindwa Kuingiza",
    "Onboarding Missing": "Kupanda Haipo",
    "Onboarding Pending": "Upandaji Unasubiri",
    "Onboarding Reset Failed Due to Past Due Exam": "Uwekaji Upya wa Uendeshaji Umeshindikana Kwa sababu ya Mtihani Uliopita",
    "Onboarding Started": "Upandaji Umeanzishwa",
    "Practice": "Fanya mazoezi",
    "Proctored": "Proctored",
    "Professional": "Mtaalamu",
    "Ready to start": "Tayari kuanza",
    "Ready to submit": "Tayari kuwasilisha",
    "Rejected": "Imekataliwa",
    "Remove": "Ondoa",
    "Remove all": "Ondoa vyote",
    "Required field": "Sehemu inayohitajika",
    "Review Policy Exception": "Kagua Vighairi vya Sera",
    "Second Review Required": "Mapitio ya Pili yanahitajika",
    "Setup Started": "Usanidi Umeanza",
    "Show": "Onesha",
    "Something has gone wrong ending your exam. Please double-check that the application is running.": "Hitilafu fulani imetokea wakati wa kumaliza mtihani wako. Tafadhali hakikisha kwamba programu inaendeshwa.",
    "Something has gone wrong ending your exam. Please reload the page and start again.": "Hitilafu fulani imetokea wakati wa kumaliza mtihani wako. Tafadhali pakia upya ukurasa na uanze tena.",
    "Something has gone wrong starting your exam. Please double-check that the application is running.": "Hitilafu imetokea wakati wa kuanza mtihani wako. Tafadhali hakikisha kwamba programu inaendeshwa.",
    "Something has gone wrong starting your exam. Please reload the page and start again.": "Hitilafu imetokea wakati wa kuanza mtihani wako. Tafadhali pakia upya ukurasa na uanze tena.",
    "Started": "Imeanza",
    "Submitted": "Imewasilishwa",
    "This is the list of available %s. You may choose some by selecting them in the box below and then clicking the \"Choose\" arrow between the two boxes.": "Hii ni orodha ya %s uliyochagua. Unaweza kuchagua baadhi vitu kwa kuvichagua katika kisanduku hapo chini kisha kubofya mshale wa \"Chagua\" kati ya visanduku viwili.",
    "This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the \"Remove\" arrow between the two boxes.": "Hii ni orodha ya %s uliyochagua. Unaweza kuondoa baadhi vitu kwa kuvichagua katika kisanduku hapo chini kisha kubofya mshale wa \"Ondoa\" kati ya visanduku viwili.",
    "Time Multiplier": "Kuzidisha Wakati",
    "Timed": "Imepitwa na wakati",
    "Timed out": "Muda umekwisha",
    "Today": "Leo",
    "Tomorrow": "Kesho",
    "Type into this box to filter down the list of available %s.": "Chapisha katika kisanduku hiki ili kuchuja orodha ya %s iliyopo.",
    "Verified": "Imethibitishwa",
    "Yesterday": "Jana",
    "You have not started your onboarding exam.": "Hujaanza mtihani wako wa kujiunga.",
    "You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button.": "Umechagua tendo, lakini bado hujahifadhi mabadiliko yako katika uga husika.  Inawezekana unatafuta kitufe cha Nenda badala ya Hifadhi",
    "You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action.": "Umechagua tendo, lakini bado hujahifadhi mabadiliko yako katika uga husika. Tafadali bofya Sawa ukitaka kuhifadhi. Utahitajika kufanya upya kitendo ",
    "You have started your onboarding exam.": "Umeanza mtihani wako wa kujiunga.",
    "You have submitted your onboarding exam.": "Umewasilisha mtihani wako wa kuingia.",
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "Umeacha kuhifadhi mabadiliko katika uga zinazoharirika. Ikiwa utafanya tendo lingine, mabadiliko ambayo hayajahifadhiwa yatapotea.",
    "Your onboarding exam has been approved in another course.": "Mtihani wako wa kujiunga umeidhinishwa katika kozi nyingine.",
    "Your onboarding exam has been approved in this course.": "Mtihani wako wa kuingia umeidhinishwa katika kozi hii.",
    "Your onboarding exam has been rejected. Please retry onboarding.": "Mtihani wako wa kuingia umekataliwa. Tafadhali jaribu kuabiri tena.",
    "Your onboarding profile has been approved. However, your onboarding status is expiring soon. Please complete onboarding again to ensure that you will be able to continue taking proctored exams.": "Wasifu wako wa kuabiri umeidhinishwa. Hata hivyo, hali yako ya kuabiri itakwisha hivi karibuni. Tafadhali kamilisha kuabiri tena ili kuhakikisha kuwa utaweza kuendelea kufanya mitihani ya muda.",
    "Your onboarding status has expired. Please complete onboarding again to continue taking proctored exams.": "Muda wako wa kuabiri umekwisha. Tafadhali kamilisha kuabiri tena ili kuendelea kufanya mitihani ya awali."
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
    "DATETIME_FORMAT": "N j, Y, P",
    "DATETIME_INPUT_FORMATS": [
      "%Y-%m-%d %H:%M:%S",
      "%Y-%m-%d %H:%M:%S.%f",
      "%Y-%m-%d %H:%M",
      "%m/%d/%Y %H:%M:%S",
      "%m/%d/%Y %H:%M:%S.%f",
      "%m/%d/%Y %H:%M",
      "%m/%d/%y %H:%M:%S",
      "%m/%d/%y %H:%M:%S.%f",
      "%m/%d/%y %H:%M"
    ],
    "DATE_FORMAT": "N j, Y",
    "DATE_INPUT_FORMATS": [
      "%Y-%m-%d",
      "%m/%d/%Y",
      "%m/%d/%y",
      "%b %d %Y",
      "%b %d, %Y",
      "%d %b %Y",
      "%d %b, %Y",
      "%B %d %Y",
      "%B %d, %Y",
      "%d %B %Y",
      "%d %B, %Y"
    ],
    "DECIMAL_SEPARATOR": ".",
    "FIRST_DAY_OF_WEEK": 0,
    "MONTH_DAY_FORMAT": "F j",
    "NUMBER_GROUPING": 0,
    "SHORT_DATETIME_FORMAT": "m/d/Y P",
    "SHORT_DATE_FORMAT": "m/d/Y",
    "THOUSAND_SEPARATOR": ",",
    "TIME_FORMAT": "P",
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S",
      "%H:%M:%S.%f",
      "%H:%M"
    ],
    "YEAR_MONTH_FORMAT": "F Y"
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

