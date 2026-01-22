
'use strict';
{
  const globals = this;
  const django = globals.django || (globals.django = {});

  
  django.pluralidx = function(n) {
    const v = (n % 10 == 1 && (n % 100 > 19 || n % 100 < 11) ? 0 : (n % 10 >= 2 && n % 10 <=9) && (n % 100 > 19 || n % 100 < 11) ? 1 : n % 1 != 0 ? 2: 3);
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
      "pasirinktas %(sel)s i\u0161 %(cnt)s",
      "pasirinkti %(sel)s i\u0161 %(cnt)s",
      "pasirinkti %(sel)s i\u0161 %(cnt)s",
      "pasirinkti %(sel)s i\u0161 %(cnt)s"
    ],
    "6 a.m.": "6 a.m.",
    "6 p.m.": "18:00",
    "April": "Balandis",
    "August": "Rugpj\u016btis",
    "Available %s": "Galimi %s",
    "Cancel": "At\u0161aukti",
    "Changes to steps that are not selected as part of the assignment will not be saved.": "Etap\u0173 pakeitimai, kurie n\u0117ra pasirinkti kaip u\u017eduoties dalis, nebus i\u0161saugoti.",
    "Choose": "Pasirinkti",
    "Choose a Date": "Pasirinkite dat\u0105",
    "Choose a Time": "Pasirinkite laik\u0105",
    "Choose a time": "Pasirinkite laik\u0105",
    "Choose all": "Pasirinkti visus",
    "Chosen %s": "Pasirinktas %s",
    "Click to choose all %s at once.": "Spustel\u0117kite, kad i\u0161 karto pasirinktum\u0117te visus %s.",
    "Click to remove all chosen %s at once.": "Spustel\u0117kite, kad i\u0161 karto pa\u0161alintum\u0117te visus pasirinktus %s.",
    "Could not retrieve download url.": "Nepavyko nuskaityti atsiuntimo url nuorodos.",
    "Could not retrieve upload url.": "Nepavyko nuskaityti \u012fk\u0117limo url nuorodos.",
    "Criterion Added": "Prid\u0117tas kriterijus",
    "Criterion Deleted": "Kriterijus pa\u0161alintas",
    "December": "Gruodis",
    "Error": "Klaida",
    "February": "Vasaris",
    "Filter": "Filtras",
    "Hide": "Sl\u0117pti",
    "January": "Sausis",
    "July": "Liepa",
    "June": "Bir\u017eelis",
    "March": "Kovas",
    "May": "Gegu\u017e\u0117",
    "Midnight": "Vidurnaktis",
    "Noon": "Vidurdienis",
    "Not Selected": "Nepasirinkta",
    "Note: You are %s hour ahead of server time.": [
      "Pastaba: J\u016bs\u0173 laikrodis rodo %s valanda daugiau nei serverio laikrodis.",
      "Pastaba: J\u016bs\u0173 laikrodis rodo %s valandomis daugiau nei serverio laikrodis.",
      "Pastaba: J\u016bs\u0173 laikrodis rodo %s valand\u0173 daugiau nei serverio laikrodis.",
      "Pastaba: J\u016bs\u0173 laikrodis rodo %s valand\u0173 daugiau nei serverio laikrodis."
    ],
    "Note: You are %s hour behind server time.": [
      "Pastaba: J\u016bs\u0173 laikrodis rodo %s valanda ma\u017eiau nei serverio laikrodis.",
      "Pastaba: J\u016bs\u0173 laikrodis rodo %s valandomis ma\u017eiau nei serverio laikrodis.",
      "Pastaba: J\u016bs\u0173 laikrodis rodo %s valand\u0173 ma\u017eiau nei serverio laikrodis.",
      "Pastaba: J\u016bs\u0173 laikrodis rodo %s valand\u0173 ma\u017eiau nei serverio laikrodis."
    ],
    "November": "Lapkritis",
    "Now": "Dabar",
    "October": "Spalis",
    "One or more rescheduling tasks failed.": "Nepavyko atid\u0117ti vieno ar daugiau termin\u0173.",
    "Option Deleted": "Parametras pa\u0161alintas",
    "Remove": "Pa\u0161alinti",
    "Remove all": "Pa\u0161alinti visus",
    "September": "Rugs\u0117jis",
    "Show": "Parodyti",
    "The server could not be contacted.": "Nepavyko susisiekti su serveriu.",
    "The submission could not be removed from the grading pool.": "Darbas negali b\u016bti at\u0161auktas i\u0161 vertinimo.",
    "This assessment could not be submitted.": "Nepavyko pateikti \u0161io \u012fvertinimo.",
    "This feedback could not be submitted.": "Nepavyko pateikti \u0161io atsiliepimo.",
    "This is the list of available %s. You may choose some by selecting them in the box below and then clicking the \"Choose\" arrow between the two boxes.": "Tai yra s\u0105ra\u0161as prieinam\u0173 %s. D\u0117\u017eut\u0117je \u017eemiau pa\u017eym\u0117dami kelet\u0105 i\u0161 j\u0173 ir paspausdami \u201ePasirinkti\u201c rodykl\u0119 tarp dviej\u0173 d\u0117\u017eu\u010di\u0173 j\u016bs galite pasirinkti kelet\u0105 i\u0161 j\u0173.",
    "This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the \"Remove\" arrow between the two boxes.": "Tai yra s\u0105ra\u0161as pasirinkt\u0173 %s. D\u0117\u017eut\u0117je \u017eemiau pa\u017eym\u0117dami kelet\u0105 i\u0161 j\u0173 ir paspausdami \u201ePa\u0161alinti\u201c rodykl\u0119 tarp dviej\u0173 d\u0117\u017eu\u010di\u0173 j\u016bs galite pa\u0161alinti kelet\u0105 i\u0161 j\u0173.",
    "This problem could not be saved.": " Nepavyko \u012fra\u0161yti \u0161ios u\u017eduoties.",
    "This response could not be submitted.": "Darbo pateikti nepavyko.",
    "This section could not be loaded.": "Nepavyko \u012fkelti \u0161ios temos.",
    "Today": "\u0160iandien",
    "Tomorrow": "Rytoj",
    "Type into this box to filter down the list of available %s.": "Ra\u0161ykite \u012f \u0161i\u0105 d\u0117\u017eut\u0119, kad i\u0161filtruotum\u0117te prieinam\u0173 %s s\u0105ra\u0161\u0105.",
    "Unnamed Option": "Ne\u012fvardytas parametras",
    "Warning": "\u012esp\u0117jimas",
    "Yesterday": "Vakar",
    "You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button.": "Pasirinkote veiksm\u0105, bet neesate pakeit\u0119 lauk\u0173 reik\u0161mi\u0173. J\u016bs grei\u010diausiai ie\u0161kote mygtuko Vykdyti, o ne mygtuko Saugoti.",
    "You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action.": "Pasirinkote veiksm\u0105, bet dar neesate i\u0161saugoj\u0119 pakeitim\u0173. Nuspauskite Gerai nor\u0117dami i\u0161saugoti. Jus reik\u0117s i\u0161 naujo paleisti veiksm\u0105.",
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "Turite nei\u0161saugot\u0173 pakeitim\u0173. Jeigu t\u0119site, J\u016bs\u0173 pakeitimai bus prarasti.",
    "You're about to submit your response for this assignment. After you submit this response, you can't change it or submit a new response.": "Ketinate pateikti savo darb\u0105. Kai pateiksite, savo atsakymo jau negal\u0117site keisti.",
    "one letter Friday\u0004F": "Pn",
    "one letter Monday\u0004M": "P",
    "one letter Saturday\u0004S": "\u0160",
    "one letter Sunday\u0004S": "S",
    "one letter Thursday\u0004T": "K",
    "one letter Tuesday\u0004T": "A",
    "one letter Wednesday\u0004W": "T"
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
    "DATETIME_FORMAT": "Y \\m. E j \\d., H:i",
    "DATETIME_INPUT_FORMATS": [
      "%Y-%m-%d %H:%M:%S",
      "%Y-%m-%d %H:%M:%S.%f",
      "%Y-%m-%d %H:%M",
      "%d.%m.%Y %H:%M:%S",
      "%d.%m.%Y %H:%M:%S.%f",
      "%d.%m.%Y %H:%M",
      "%d.%m.%y %H:%M:%S",
      "%d.%m.%y %H:%M:%S.%f",
      "%d.%m.%y %H:%M",
      "%d.%m.%y %H.%M.%S",
      "%d.%m.%y %H.%M.%S.%f",
      "%d.%m.%y %H.%M",
      "%Y-%m-%d"
    ],
    "DATE_FORMAT": "Y \\m. E j \\d.",
    "DATE_INPUT_FORMATS": [
      "%Y-%m-%d",
      "%d.%m.%Y",
      "%d.%m.%y"
    ],
    "DECIMAL_SEPARATOR": ",",
    "FIRST_DAY_OF_WEEK": 1,
    "MONTH_DAY_FORMAT": "E j \\d.",
    "NUMBER_GROUPING": 3,
    "SHORT_DATETIME_FORMAT": "Y-m-d H:i",
    "SHORT_DATE_FORMAT": "Y-m-d",
    "THOUSAND_SEPARATOR": ".",
    "TIME_FORMAT": "H:i",
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S",
      "%H:%M:%S.%f",
      "%H:%M",
      "%H.%M.%S",
      "%H.%M.%S.%f",
      "%H.%M"
    ],
    "YEAR_MONTH_FORMAT": "Y \\m. F"
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

