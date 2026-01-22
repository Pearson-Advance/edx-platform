
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
      "%(sel)s van de %(cnt)s geselecteerd",
      "%(sel)s van de %(cnt)s geselecteerd"
    ],
    "%s selected option not visible": [
      "%s geselecteerde optie niet zichtbaar",
      "%s geselecteerde opties niet zichtbaar"
    ],
    "6 a.m.": "6 uur 's ochtends",
    "6 p.m.": "6 uur 's avonds",
    "Add Multiplier as a Number Greater Than 1": "Voeg de vermenigvuldiger toe als een getal groter dan 1",
    "Add Policy Exception": "Beleidsuitzondering toevoegen",
    "Add Time(Minutes)": "Tijd toevoegen (minuten)",
    "Additional Time (minutes)": "Extra tijd (minuten)",
    "An error has occurred during your onboarding exam. Please retry onboarding.": "Er is een fout opgetreden tijdens uw onboarding-examen. Probeer het onboarding-examen opnieuw.",
    "Approved in Another Course": "Goedgekeurd in een andere cursus",
    "April": "april",
    "Are you sure you want to leave this page? \nTo pass your proctored exam you must also pass the online proctoring session review.": "Weet u zeker dat u deze pagina wilt verlaten? \nOm te slagen voor je geproctoreerde examen moet je ook slagen voor de online proctoringsessiebeoordeling.",
    "Are you sure you want to remove this student's exam attempt?": "Weet je zeker dat je de examenpoging van deze student wilt verwijderen?",
    "Are you sure you want to resume this student's exam attempt?": "Bent u zeker dat u de examenpoging van deze student wilt hervatten?",
    "Audit": "Controle",
    "August": "augustus",
    "Available %s": "Beschikbare %s",
    "Cancel": "Annuleren",
    "Choose": "Kiezen",
    "Choose a Date": "Kies een datum",
    "Choose a Time": "Kies een tijdstip",
    "Choose a time": "Kies een tijd",
    "Choose all": "Alle kiezen",
    "Chosen %s": "Gekozen %s",
    "Click to choose all %s at once.": "Klik om alle %s te kiezen.",
    "Click to remove all chosen %s at once.": "Klik om alle gekozen %s tegelijk te verwijderen.",
    "Created": "Gemaakt",
    "Credit": "Credit",
    "December": "december",
    "Declined": "Afgewezen",
    "Download Software Clicked": "Software is aangeklikt",
    "Eligible": "In aanmerking komend",
    "Error": "Fout",
    "Error Ending Exam": "Fout bij be\u00ebindigen van examen",
    "Error Starting Exam": "Fout bij starten van examen",
    "Executive Education": "Executive onderwijs",
    "Expired": "Verlopen",
    "Expiring Soon": "Verloopt binnenkort",
    "February": "februari",
    "Filter": "Filter",
    "Friday": "vrijdag",
    "Hide": "Verbergen",
    "Honor": "Honor",
    "If your device has changed, we recommend that you complete this course's onboarding exam in order to ensure that your setup still meets the requirements for proctoring.": "Als uw apparaat is gewijzigd, raden wij u aan het onboarding-examen van deze cursus af te ronden, zodat u zeker weet dat uw installatie nog steeds voldoet aan de vereisten voor proctoring.",
    "January": "januari",
    "July": "juli",
    "June": "juni",
    "March": "maart",
    "Master's": "Meester",
    "May": "mei",
    "Midnight": "Middernacht",
    "Monday": "maandag",
    "No ID Professional": "Geen ID-professional",
    "Noon": "12 uur 's middags",
    "Not Started": "Niet gestart",
    "Note: You are %s hour ahead of server time.": [
      "Let op: u ligt %s uur voor ten opzichte van de servertijd.",
      "Let op: u ligt %s uur voor ten opzichte van de servertijd."
    ],
    "Note: You are %s hour behind server time.": [
      "Let op: u ligt %s uur achter ten opzichte van de servertijd.",
      "Let op: u ligt %s uur achter ten opzichte van de servertijd."
    ],
    "November": "november",
    "Now": "Nu",
    "OK": "OK",
    "October": "oktober",
    "Onboarding Expired": "Onboarding verlopen",
    "Onboarding Failed": "Onboarding mislukt",
    "Onboarding Missing": "Onboarding ontbreekt",
    "Onboarding Pending": "Onboarding in behandeling",
    "Onboarding Reset Failed Due to Past Due Exam": "Onboarding-reset is mislukt vanwege een verlopen examen",
    "Onboarding Started": "Onboarding is gestart",
    "Practice": "Oefening",
    "Proctored": "Onder toezicht",
    "Professional": "Professioneel",
    "Ready to start": "Klaar om te starten",
    "Ready to submit": "Klaar om in te dienen",
    "Rejected": "Afgewezen",
    "Remove": "Verwijderen",
    "Remove all": "Alle verwijderen",
    "Required field": "verplicht veld",
    "Review Policy Exception": "Beleidsuitzondering beoordelen",
    "Saturday": "zaterdag",
    "Second Review Required": "Tweede beoordeling vereist",
    "September": "september",
    "Setup Started": "Installatie gestart",
    "Show": "Tonen",
    "Something has gone wrong ending your exam. Please double-check that the application is running.": "Er is iets misgegaan bij het be\u00ebindigen van je examen. Controleer nogmaals of de applicatie actief is.",
    "Something has gone wrong ending your exam. Please reload the page and start again.": "Er is iets misgegaan bij het be\u00ebindigen van je examen. Laad de pagina opnieuw en begin opnieuw.",
    "Something has gone wrong starting your exam. Please double-check that the application is running.": "Er is iets misgegaan bij het starten van je examen. Controleer nogmaals of de applicatie actief is.",
    "Something has gone wrong starting your exam. Please reload the page and start again.": "Er is iets misgegaan bij het starten van je examen. Laad de pagina opnieuw en begin opnieuw.",
    "Started": "Begonnen",
    "Submitted": "Ingediend",
    "Sunday": "zondag",
    "This is the list of available %s. You may choose some by selecting them in the box below and then clicking the \"Choose\" arrow between the two boxes.": "Dit is de lijst met beschikbare %s. U kunt er een aantal kiezen door ze in het vak hieronder te selecteren en daarna op de pijl 'Kiezen' tussen de twee vakken te klikken.",
    "This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the \"Remove\" arrow between the two boxes.": "Dit is de lijst met gekozen %s. U kunt er een aantal verwijderen door ze in het vak hieronder te selecteren en daarna op de pijl 'Verwijderen' tussen de twee vakken te klikken.",
    "Thursday": "donderdag",
    "Time Multiplier": "Tijdvermenigvuldiger",
    "Timed": "Timed",
    "Timed out": "Time-out",
    "Today": "Vandaag",
    "Tomorrow": "Morgen",
    "Tuesday": "dinsdag",
    "Type into this box to filter down the list of available %s.": "Typ in dit vak om de lijst met beschikbare %s te filteren.",
    "Type into this box to filter down the list of selected %s.": "Typ in dit vak om de lijst met geselecteerde %s te filteren.",
    "Verified": "Geverifieerd.",
    "Wednesday": "woensdag",
    "Yesterday": "Gisteren",
    "You have not started your onboarding exam.": "Je bent nog niet begonnen met je inwerkexamen.",
    "You have selected an action, and you haven\u2019t made any changes on individual fields. You\u2019re probably looking for the Go button rather than the Save button.": "U hebt een actie geselecteerd, en geen wijzigingen in afzonderlijke velden aangebracht. Waarschijnlijk zoekt u de knop Gaan in plaats van de knop Opslaan.",
    "You have selected an action, but you haven\u2019t saved your changes to individual fields yet. Please click OK to save. You\u2019ll need to re-run the action.": "U hebt een actie geselecteerd, maar uw wijzigingen in afzonderlijke velden nog niet opgeslagen. Klik op OK om deze op te slaan. U dient de actie opnieuw uit te voeren.",
    "You have started your onboarding exam.": "Je bent begonnen met je inwerkexamen.",
    "You have submitted your onboarding exam.": "Je hebt je inwerkexamen ingediend.",
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "U hebt niet-opgeslagen wijzigingen op afzonderlijke bewerkbare velden. Als u een actie uitvoert, gaan uw wijzigingen verloren.",
    "Your onboarding exam has been approved in another course.": "Je onboarding examen is goedgekeurd in een andere cursus.",
    "Your onboarding exam has been approved in this course.": "Je onboarding examen is goedgekeurd in deze cursus.",
    "Your onboarding exam has been rejected. Please retry onboarding.": "Uw onboarding-examen is afgewezen. Probeer onboarding opnieuw.",
    "Your onboarding profile has been approved. However, your onboarding status is expiring soon. Please complete onboarding again to ensure that you will be able to continue taking proctored exams.": "Uw onboardingprofiel is goedgekeurd. Uw onboardingstatus verloopt echter binnenkort. Voltooi de onboarding opnieuw om ervoor te zorgen dat u examens onder toezicht kunt blijven afleggen.",
    "Your onboarding status has expired. Please complete onboarding again to continue taking proctored exams.": "Je onboardingstatus is verlopen. Voltooi de onboarding opnieuw om door te gaan met het afleggen van examens onder toezicht.",
    "abbrev. day Friday\u0004Fri": "vr",
    "abbrev. day Monday\u0004Mon": "ma",
    "abbrev. day Saturday\u0004Sat": "za",
    "abbrev. day Sunday\u0004Sun": "zo",
    "abbrev. day Thursday\u0004Thur": "do",
    "abbrev. day Tuesday\u0004Tue": "di",
    "abbrev. day Wednesday\u0004Wed": "wo",
    "abbrev. month April\u0004Apr": "apr",
    "abbrev. month August\u0004Aug": "aug",
    "abbrev. month December\u0004Dec": "dec",
    "abbrev. month February\u0004Feb": "feb",
    "abbrev. month January\u0004Jan": "jan",
    "abbrev. month July\u0004Jul": "jul",
    "abbrev. month June\u0004Jun": "jun",
    "abbrev. month March\u0004Mar": "mrt",
    "abbrev. month May\u0004May": "mei",
    "abbrev. month November\u0004Nov": "nov",
    "abbrev. month October\u0004Oct": "okt",
    "abbrev. month September\u0004Sep": "sep",
    "one letter Friday\u0004F": "V",
    "one letter Monday\u0004M": "M",
    "one letter Saturday\u0004S": "Z",
    "one letter Sunday\u0004S": "Z",
    "one letter Thursday\u0004T": "D",
    "one letter Tuesday\u0004T": "D",
    "one letter Wednesday\u0004W": "W"
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
    "DATETIME_FORMAT": "j F Y H:i",
    "DATETIME_INPUT_FORMATS": [
      "%d-%m-%Y %H:%M:%S",
      "%d-%m-%y %H:%M:%S",
      "%Y-%m-%d %H:%M:%S",
      "%d/%m/%Y %H:%M:%S",
      "%d/%m/%y %H:%M:%S",
      "%Y/%m/%d %H:%M:%S",
      "%d-%m-%Y %H:%M:%S.%f",
      "%d-%m-%y %H:%M:%S.%f",
      "%Y-%m-%d %H:%M:%S.%f",
      "%d/%m/%Y %H:%M:%S.%f",
      "%d/%m/%y %H:%M:%S.%f",
      "%Y/%m/%d %H:%M:%S.%f",
      "%d-%m-%Y %H.%M:%S",
      "%d-%m-%y %H.%M:%S",
      "%d/%m/%Y %H.%M:%S",
      "%d/%m/%y %H.%M:%S",
      "%d-%m-%Y %H.%M:%S.%f",
      "%d-%m-%y %H.%M:%S.%f",
      "%d/%m/%Y %H.%M:%S.%f",
      "%d/%m/%y %H.%M:%S.%f",
      "%d-%m-%Y %H:%M",
      "%d-%m-%y %H:%M",
      "%Y-%m-%d %H:%M",
      "%d/%m/%Y %H:%M",
      "%d/%m/%y %H:%M",
      "%Y/%m/%d %H:%M",
      "%d-%m-%Y %H.%M",
      "%d-%m-%y %H.%M",
      "%d/%m/%Y %H.%M",
      "%d/%m/%y %H.%M",
      "%Y-%m-%d"
    ],
    "DATE_FORMAT": "j F Y",
    "DATE_INPUT_FORMATS": [
      "%d-%m-%Y",
      "%d-%m-%y",
      "%d/%m/%Y",
      "%d/%m/%y",
      "%Y/%m/%d",
      "%Y-%m-%d"
    ],
    "DECIMAL_SEPARATOR": ",",
    "FIRST_DAY_OF_WEEK": 1,
    "MONTH_DAY_FORMAT": "j F",
    "NUMBER_GROUPING": 3,
    "SHORT_DATETIME_FORMAT": "j-n-Y H:i",
    "SHORT_DATE_FORMAT": "j-n-Y",
    "THOUSAND_SEPARATOR": ".",
    "TIME_FORMAT": "H:i",
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S",
      "%H:%M:%S.%f",
      "%H.%M:%S",
      "%H.%M:%S.%f",
      "%H.%M",
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

