
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
    "Grade must be a number.": "\u0644\u0642\u0634\u064a\u062b \u0648\u0639\u0633\u0641 \u0632\u062b \u0634 \u0631\u0639\u0648\u0632\u062b\u0642.",
    "Grade must be an integer.": "\u0644\u0642\u0634\u064a\u062b \u0648\u0639\u0633\u0641 \u0632\u062b \u0634\u0631 \u0647\u0631\u0641\u062b\u0644\u062b\u0642.",
    "Grade must be positive.": "\u0644\u0642\u0634\u064a\u062b \u0648\u0639\u0633\u0641 \u0632\u062b \u062d\u062e\u0633\u0647\u0641\u0647\u062f\u062b.",
    "Maximum score is %(max_score)s": "\u0648\u0634\u0637\u0647\u0648\u0639\u0648 \u0633\u0630\u062e\u0642\u062b \u0647\u0633 %(max_score)s",
    "No grade to remove.": "\u0631\u062e \u0644\u0642\u0634\u064a\u062b \u0641\u062e \u0642\u062b\u0648\u062e\u062f\u062b.",
    "The file you are trying to upload is too large.": "\u0641\u0627\u062b \u0628\u0647\u0645\u062b \u063a\u062e\u0639 \u0634\u0642\u062b \u0641\u0642\u063a\u0647\u0631\u0644 \u0641\u062e \u0639\u062d\u0645\u062e\u0634\u064a \u0647\u0633 \u0641\u062e\u062e \u0645\u0634\u0642\u0644\u062b.",
    "There was an error uploading your file.": "\u0641\u0627\u062b\u0642\u062b \u0635\u0634\u0633 \u0634\u0631 \u062b\u0642\u0642\u062e\u0642 \u0639\u062d\u0645\u062e\u0634\u064a\u0647\u0631\u0644 \u063a\u062e\u0639\u0642 \u0628\u0647\u0645\u062b.",
    "Upload %(file_name)s": "\u0639\u062d\u0645\u062e\u0634\u064a %(file_name)s",
    "Uploading...": "\u0639\u062d\u0645\u062e\u0634\u064a\u0647\u0631\u0644...",
    "Uploading... %(percent)s %": "\u0639\u062d\u0645\u062e\u0634\u064a\u0647\u0631\u0644... %(percent)s %"
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

