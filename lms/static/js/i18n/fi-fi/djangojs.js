
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
      "%(sel)s valittuna %(cnt)s mahdollisesta",
      "%(sel)s valittuna %(cnt)s mahdollisesta"
    ],
    "%s selected option not visible": [
      "%s valittu kohde ei n\u00e4kyviss\u00e4",
      "%s valittua kohdetta ei n\u00e4kyviss\u00e4"
    ],
    "6 a.m.": "06",
    "6 p.m.": "18:00",
    "April": "huhtikuu",
    "August": "elokuu",
    "Available %s": "Mahdolliset %s",
    "Cancel": "Peruuta",
    "Choose a Date": "Valitse p\u00e4iv\u00e4m\u00e4\u00e4r\u00e4",
    "Choose a Time": "Valitse kellonaika",
    "Choose a time": "Valitse kellonaika",
    "Chosen %s": "Valitut %s",
    "December": "joulukuu",
    "February": "helmikuu",
    "Filter": "Suodatin",
    "Friday": "Perjantai",
    "January": "tammikuu",
    "July": "hein\u00e4kuu",
    "June": "kes\u00e4kuu",
    "March": "maaliskuu",
    "May": "toukokuu",
    "Midnight": "24",
    "Monday": "Maanantai",
    "Noon": "12",
    "Note: You are %s hour ahead of server time.": [
      "Huom: Olet %s tunnin palvelinaikaa edell\u00e4.",
      "Huom: Olet %s tuntia palvelinaikaa edell\u00e4."
    ],
    "Note: You are %s hour behind server time.": [
      "Huom: Olet %s tunnin palvelinaikaa j\u00e4ljess\u00e4.",
      "Huom: Olet %s tuntia palvelinaikaa j\u00e4ljess\u00e4."
    ],
    "November": "marraskuu",
    "Now": "Nyt",
    "October": "lokakuu",
    "Saturday": "Lauantai",
    "September": "syyskuu",
    "Sunday": "Sunnuntai",
    "Thursday": "Torstai",
    "Today": "T\u00e4n\u00e4\u00e4n",
    "Tomorrow": "Huomenna",
    "Tuesday": "Tiistai",
    "Type into this box to filter down the list of available %s.": "Kirjoita t\u00e4h\u00e4n listaan suodattaaksesi %s-listaa.",
    "Type into this box to filter down the list of selected %s.": "Kirjoita t\u00e4h\u00e4n listaan suodattaaksesi valittujen %s-kohteiden listaa.",
    "Wednesday": "Keskiviikko",
    "Yesterday": "Eilen",
    "You have selected an action, and you haven\u2019t made any changes on individual fields. You\u2019re probably looking for the Go button rather than the Save button.": "Olet valinnut toiminnon etk\u00e4 ole tehnyt yht\u00e4\u00e4n muutosta yksitt\u00e4isiss\u00e4 kentiss\u00e4. Etsit todenn\u00e4k\u00f6isesti Suorita-painiketta Tallenna-painikkeen sijaan.",
    "You have selected an action, but you haven\u2019t saved your changes to individual fields yet. Please click OK to save. You\u2019ll need to re-run the action.": "Olet valinnut toiminnon, mutta et ole viel\u00e4 tallentanut muutoksiasi yksitt\u00e4isiin kenttiin. Paina OK tallentaaksesi. Sinun pit\u00e4\u00e4 suorittaa toiminto uudelleen.",
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "Sinulla on tallentamattomia muutoksia yksitt\u00e4isiss\u00e4 muokattavissa kentiss\u00e4. Jos suoritat toiminnon, tallentamattomat muutoksesi katoavat.",
    "abbrev. day Friday\u0004Fri": "Pe",
    "abbrev. day Monday\u0004Mon": "Ma",
    "abbrev. day Saturday\u0004Sat": "La",
    "abbrev. day Sunday\u0004Sun": "Su",
    "abbrev. day Thursday\u0004Thur": "To",
    "abbrev. day Tuesday\u0004Tue": "Ti",
    "abbrev. day Wednesday\u0004Wed": "Ke",
    "abbrev. month April\u0004Apr": "Huhti",
    "abbrev. month August\u0004Aug": "Elo",
    "abbrev. month December\u0004Dec": "Joulu",
    "abbrev. month February\u0004Feb": "Helmi",
    "abbrev. month January\u0004Jan": "Tammi",
    "abbrev. month July\u0004Jul": "Hein\u00e4",
    "abbrev. month June\u0004Jun": "Kes\u00e4",
    "abbrev. month March\u0004Mar": "Maalis",
    "abbrev. month May\u0004May": "Touko",
    "abbrev. month November\u0004Nov": "Marras",
    "abbrev. month October\u0004Oct": "Loka",
    "abbrev. month September\u0004Sep": "Syys",
    "one letter Friday\u0004F": "Pe",
    "one letter Monday\u0004M": "Ma",
    "one letter Saturday\u0004S": "La",
    "one letter Sunday\u0004S": "Su",
    "one letter Thursday\u0004T": "To",
    "one letter Tuesday\u0004T": "Ti",
    "one letter Wednesday\u0004W": "Ke"
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
    "DATETIME_FORMAT": "j. E Y \\k\\e\\l\\l\\o G.i",
    "DATETIME_INPUT_FORMATS": [
      "%d.%m.%Y %H.%M.%S",
      "%d.%m.%Y %H.%M.%S.%f",
      "%d.%m.%Y %H.%M",
      "%d.%m.%y %H.%M.%S",
      "%d.%m.%y %H.%M.%S.%f",
      "%d.%m.%y %H.%M",
      "%Y-%m-%d %H:%M:%S",
      "%Y-%m-%d %H:%M:%S.%f",
      "%Y-%m-%d %H:%M",
      "%Y-%m-%d"
    ],
    "DATE_FORMAT": "j. E Y",
    "DATE_INPUT_FORMATS": [
      "%d.%m.%Y",
      "%d.%m.%y",
      "%Y-%m-%d"
    ],
    "DECIMAL_SEPARATOR": ",",
    "FIRST_DAY_OF_WEEK": 1,
    "MONTH_DAY_FORMAT": "j. F",
    "NUMBER_GROUPING": 3,
    "SHORT_DATETIME_FORMAT": "j.n.Y G.i",
    "SHORT_DATE_FORMAT": "j.n.Y",
    "THOUSAND_SEPARATOR": "\u00a0",
    "TIME_FORMAT": "G.i",
    "TIME_INPUT_FORMATS": [
      "%H.%M.%S",
      "%H.%M.%S.%f",
      "%H.%M",
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

