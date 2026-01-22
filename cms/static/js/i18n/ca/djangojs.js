
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
    "\n            Do not close this window before you finish your exam. if you close this window, your proctoring session ends, and you will not successfully complete the proctored exam.\n          ": "\n            No tanqueu aquesta finestra abans d'acabar l'examen. si tanqueu aquesta finestra, la vostra sessi\u00f3 de processament finalitza i no finalitzar\u00e0 amb \u00e8xit l'examen processat.\n          ",
    "\n            Return to the %(platform_name)s course window to start your exam. When you have finished your exam and\n            have marked it as complete, you can close this window to end the proctoring session\n            and upload your proctoring session data for review.\n          ": "\n            Torneu a la finestra del curs %(platform_name)s per comen\u00e7ar l'examen. Quan hagueu acabat l'examen i\n            ho heu marcat com a complet, podeu tancar aquesta finestra per finalitzar la sessi\u00f3 de processament\n            i carregueu les dades de la sessi\u00f3 de supervisi\u00f3 per a la seva revisi\u00f3.\n          ",
    "\n        About Proctored Exams\n        ": "\n        Al voltant de Ex\u00e0mens Supervisats\n        ",
    "\n        Are you sure you want to take this exam without proctoring?\n      ": "\n        Esteu segur que voleu fer aquest examen sense fer proves?\n      ",
    "\n        Due to unsatisfied prerequisites, you can only take this exam without proctoring.\n      ": "\n        A causa de requisits previs insatisfets, nom\u00e9s podeu fer aquest examen sense fer proves.\n      ",
    "\n        I am ready to start this timed exam.\n      ": "\n        Estic preparat per iniciar aquest examen cronometrat.\n      ",
    "\n        No, I want to continue working.\n      ": "\n        No, vull seguir treballant.\n      ",
    "\n        No, I'd like to continue working\n      ": "\n        No, m'agradaria continuar treballant\n      ",
    "\n      After you submit your exam, your exam will be graded.\n    ": "\n     Despr\u00e9s d'enviar el vostre examen, el vostre examen es classificar\u00e0.\n    ",
    "\n      Are you sure that you want to submit your timed exam?\n    ": "\n      Est\u00e0s segur que vols enviar el teu examen cronol\u00f2gic?\n    ",
    "\n      Are you sure you want to end your proctored exam?\n    ": "\n      Esteu segur que voleu finalitzar el vostre examen supervisat?\n    ",
    "\n      Because the due date has passed, you are no longer able to take this exam.\n    ": "\n      Com que ja ha passat la data de venciment, ja no podreu fer aquest examen.\n    ",
    "\n      Error with proctored exam\n    ": "\n      S'ha produ\u00eft un error en l'examen supervisat\n    ",
    "\n      If you have disabilities,\n      you might be eligible for an additional time allowance on timed exams.\n      Ask your course team for information about additional time allowances.\n    ": "\n     Si teniu discapacitats,\n      \u00e9s possible que tingueu dret a una assignaci\u00f3 de temps addicional en ex\u00e0mens temporitzats.\n      Pregunteu a l'equip del vostre curs per obtenir informaci\u00f3 sobre les assignacions de temps addicionals.",
    "\n      If you have questions about the status of your proctored exam results, contact %(platform_name)s Support.\n    ": "\n     Si teniu preguntes sobre l'estat dels resultats dels ex\u00e0mens supervisats, contacteu amb el suport de %(platform_name)s.\n    ",
    "\n      Make sure that you have selected \"Submit\" for each problem before you submit your exam.\n    ": "\n      Assegureu-vos que heu seleccionat \"Enviar\" per a cada problema abans d'enviar l'examen.\n    ",
    "\n      The due date for this exam has passed\n    ": "\n      La data de venciment d'aquest examen ha passat\n    ",
    "\n      This exam is proctored\n    ": "\n      Aquest ex\u00e0men est\u00e0 supervisat\n    ",
    "\n      To view your exam questions and responses, select <strong>View my exam</strong>. The exam's review status is shown in the left navigation pane.\n    ": "\n      Per veure les preguntes i respostes de l'examen, seleccioneu <strong>Veure el meu examen </strong>. L'estat de la revisi\u00f3 de l'examen es mostra al panell de navegaci\u00f3 esquerre.\n    ",
    "\n      Yes, submit my timed exam.\n    ": "\n      S\u00ed, envieu el meu examen cronometrat.\n    ",
    "\n      You have submitted this proctored exam for review\n    ": "\n      Heu enviat aquest examen tutelat per a la seva revisi\u00f3\n    ",
    "\n      Your practice proctoring results: <b class=\"failure\"> Unsatisfactory </b>\n    ": "\n      Els resultats de la seva pr\u00e0ctica de supervisi\u00f3: <b class=\"failure\"> Insatisfactori </b>\n    ",
    "\n    %(exam_name)s is a Timed Exam (%(total_time)s)\n    ": "\n    %(exam_name)s \u00e9s un examen cronometrat (%(total_time)s)\n    ",
    "\n    The following prerequisites are in a <strong>pending</strong> state and must be successfully completed before you can proceed:\n    ": "\n    Els prerequisits seg\u00fcents es troben en estat <strong>pedent</strong> i s'ha de completar amb \u00e8xit abans de poder continuar:\n    ",
    "\n    You did not satisfy the following prerequisites:\n    ": "\n    No heu satisfet els requisits previs seg\u00fcents:\n    ",
    " From this point in time, you must follow the <a href=\"%(link_urls.online_proctoring_rules)s\" target=\"_blank\">online proctoring rules</a> to pass the proctoring review for your exam. ": " A partir d 'aquest moment, heu de seguir les <a href=\"%(link_urls.online_proctoring_rules)s\" target=\"_blank\">regles de supervisi\u00f3 en l\u00ednia </a> Per aprovar la revisi\u00f3 de supervisi\u00f3 per al vostre examen.",
    " Your Proctoring Session Has Started ": "S'ha iniciat la vostra sessi\u00f3 de supervisi\u00f3",
    " and {num_of_minutes} minute": "i {num_of_minutes} minut",
    " and {num_of_minutes} minutes": "i {num_of_minutes} minuts",
    " to complete and submit the exam.": "per completar i enviar l'examen.",
    "%(sel)s of %(cnt)s selected": [
      "%(sel)s de %(cnt)s seleccionat",
      "%(sel)s of %(cnt)s seleccionats"
    ],
    "%s selected option not visible": [
      "%s opcion seleccionada no visible",
      "%s opcions seleccionades no visibles"
    ],
    "6 a.m.": "6 a.m.",
    "6 p.m.": "6 p.m.",
    "Additional Time (minutes)": "Temps addicional (minuts)",
    "After you select ": "Despr\u00e9s de seleccionar",
    "All Unreviewed": "Tots sense veure",
    "All Unreviewed Failures": "Tots els errors no vistos",
    "April": "Abril",
    "August": "Agost",
    "Available %s": "%s Disponibles",
    "Can I request additional time to complete my exam?": "Puc demanar m\u00e9s temps per completar el meu examen?",
    "Cancel": "Cancel\u00b7lar",
    "Choose": "Escollir",
    "Choose a Date": "Escolliu una data",
    "Choose a Time": "Escolliu una hora",
    "Choose a time": "Escolliu una hora",
    "Choose all": "Escollir-los tots",
    "Chosen %s": "Escollit %s",
    "Click to choose all %s at once.": "Feu clic per escollir tots els %s d'un cop.",
    "Click to remove all chosen %s at once.": "Feu clic per eliminar tots els %s escollits d'un cop.",
    "Close": "Tancar",
    "Continue Exam Without Proctoring": "Continua l'examen sense supervisi\u00f3",
    "Continue to my practice exam": "Continueu al meu examen de pr\u00e0ctica",
    "Course Id": "Identificador del Curs",
    "Created": "Creat",
    "December": "Desembre",
    "Declined": "Rebutjat",
    "Download Software Clicked": "Descarregueu el programari clicat",
    "Error": "Error",
    "Failed Proctoring": "Supervisat susp\u00e8s",
    "February": "Febrer",
    "Filter": "Filtre",
    "Friday": "Divendres",
    "Go Back": "Torna",
    "Hide": "Ocultar",
    "I am ready to start this timed exam,": "Estic preparat per iniciar aquest examen cronometrat,",
    "Is Sample Attempt": "\u00c9s intent d'exemple",
    "January": "Gener",
    "July": "Juliol",
    "June": "Juny",
    "March": "Mar\u00e7",
    "May": "Maig",
    "Midnight": "Mitjanit",
    "Monday": "Dilluns",
    "Must be a Staff User to Perform this request.": "Ha de ser un usuari del personal per realitzar aquesta sol\u00b7licitud.",
    "Noon": "Migdia",
    "Note: You are %s hour ahead of server time.": [
      "Nota: Aneu %s hora avan\u00e7ats respecte la hora del servidor.",
      "Nota: Aneu %s hores avan\u00e7ats respecte la hora del servidor."
    ],
    "Note: You are %s hour behind server time.": [
      "Nota: Aneu %s hora endarrerits respecte la hora del servidor.",
      "Nota: Aneu %s hores endarrerits respecte la hora del servidor."
    ],
    "November": "Novembre",
    "Now": "Ara",
    "October": "Octubre",
    "Passed Proctoring": "Supervisat aprovat",
    "Pending Session Review": "Revisi\u00f3 pendent de la sessi\u00f3",
    "Practice Exam Completed": "Examen pr\u00e0ctic completat",
    "Practice Exam Failed": "L'examen de pr\u00e0ctica ha fallat",
    "Proctored Option Available": "Opci\u00f3 Supervisat disponible",
    "Proctored Option No Longer Available": "L'opci\u00f3 Supervisat ja no est\u00e0 disponible",
    "Ready To Start": "Llest per comen\u00e7ar",
    "Ready To Submit": "Preparat per enviar",
    "Rejected": "Rebutjat",
    "Remove": "Eliminar",
    "Remove all": "Esborrar-los tots",
    "Review Policy Exception": "Revisa l'excepci\u00f3 de la pol\u00edtica",
    "Saturday": "Dissabte",
    "Second Review Required": "Es requereix una segona revisi\u00f3",
    "September": "Setembre",
    "Show": "Mostrar",
    "Start System Check": "Comen\u00e7a la verificaci\u00f3 del sistema",
    "Started": "Ha comen\u00e7at",
    "Submitted": "Enviat",
    "Sunday": "Diumenge",
    "Take this exam without proctoring.": "Realitzeu aquest examen sense supervisi\u00f3.",
    "Taking As Open Exam": "Prenent com a examen obert",
    "Taking As Proctored Exam": "Realitzaci\u00f3 de l'examen supervisat",
    "Taking as Proctored": "Tenint com supervisat",
    "This exam has a time limit associated with it.": "Aquest examen t\u00e9 un l\u00edmit de temps associat.",
    "This is the list of available %s. You may choose some by selecting them in the box below and then clicking the \"Choose\" arrow between the two boxes.": "Aquesta \u00e9s la llista de %s disponibles. En podeu escollir alguns seleccionant-los a la caixa de sota i fent clic a la fletxa \"Escollir\" entre les dues caixes.",
    "This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the \"Remove\" arrow between the two boxes.": "Aquesta \u00e9s la llista de %s escollits. En podeu eliminar alguns seleccionant-los a la caixa de sota i fent clic a la fletxa \"Eliminar\" entre les dues caixes.",
    "Thursday": "Dijous",
    "Timed Exam": "Examen temporal",
    "Timed Out": "S'ha acabat el temps",
    "To pass this exam, you must complete the problems in the time allowed.": "Per aprovar aquest examen, heu de completar els problemes en el temps perm\u00e8s.",
    "Today": "Avui",
    "Tomorrow": "Dem\u00e0",
    "Tuesday": "Dimarts",
    "Type into this box to filter down the list of available %s.": "Escriviu en aquesta caixa per a filtrar la llista de %s disponibles.",
    "Type into this box to filter down the list of selected %s.": "Escriviu en aquesta caixa per a filtrar la llista de %s seleccionats.",
    "Ungraded Practice Exam": "Examen de pr\u00e0ctica no graduat",
    "Verified": "Verificat",
    "View my exam": "Veure el meu examen",
    "Wednesday": "Dimecres",
    "Yesterday": "Ahir",
    "You have selected an action, and you haven\u2019t made any changes on individual fields. You\u2019re probably looking for the Go button rather than the Save button.": "Has seleccionat una acci\u00f3 i no has fet cap canvi als camps individuals. Probablement est\u00e0s cercant el bot\u00f3 Anar enlloc del bot\u00f3 de Desar.",
    "You have selected an action, but you haven\u2019t saved your changes to individual fields yet. Please click OK to save. You\u2019ll need to re-run the action.": "Has seleccionat una acci\u00f3, per\u00f2 encara no l'has desat els canvis dels camps individuals. Si us plau clica OK per desar. Necessitar\u00e0s tornar a executar l'acci\u00f3.",
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "Teniu canvis sense desar a camps editables individuals. Si executeu una acci\u00f3, es perdran aquests canvis no desats.",
    "abbrev. day Friday\u0004Fri": "dv.",
    "abbrev. day Monday\u0004Mon": "dl.",
    "abbrev. day Saturday\u0004Sat": "ds.",
    "abbrev. day Sunday\u0004Sun": "dg.",
    "abbrev. day Thursday\u0004Thur": "dj.",
    "abbrev. day Tuesday\u0004Tue": "dt.",
    "abbrev. day Wednesday\u0004Wed": "dc.",
    "abbrev. month April\u0004Apr": "Abr",
    "abbrev. month August\u0004Aug": "Ago",
    "abbrev. month December\u0004Dec": "Des",
    "abbrev. month February\u0004Feb": "Feb",
    "abbrev. month January\u0004Jan": "Gen",
    "abbrev. month July\u0004Jul": "Jul",
    "abbrev. month June\u0004Jun": "Jun",
    "abbrev. month March\u0004Mar": "Mar",
    "abbrev. month May\u0004May": "Mai",
    "abbrev. month November\u0004Nov": "Nov",
    "abbrev. month October\u0004Oct": "Oct",
    "abbrev. month September\u0004Sep": "Sep",
    "active proctored exams": "ex\u00e0mens supervisats actius",
    "could not determine the course_id": "no s'ha pogut determinar el  course_id",
    "courses with active proctored exams": "cursos amb ex\u00e0mens supervisats actius",
    "internally reviewed": "Revisat internament",
    "one letter Friday\u0004F": "V",
    "one letter Monday\u0004M": "L",
    "one letter Saturday\u0004S": "S",
    "one letter Sunday\u0004S": "D",
    "one letter Thursday\u0004T": "J",
    "one letter Tuesday\u0004T": "M",
    "one letter Wednesday\u0004W": "X",
    "you have less than a minute remaining": "teniu menys d'un minut romanent",
    "you have {remaining_time} remaining": "teniu {remaining_time} romanent",
    "you will have ": "vost\u00e8 tindr\u00e0",
    "your course": "el vostre curs",
    "{num_of_hours} hour": "{num_of_hours} hora",
    "{num_of_hours} hours": "{num_of_hours} hores",
    "{num_of_minutes} minute": "{num_of_minutes} minut",
    "{num_of_minutes} minutes": "{num_of_minutes} minuts"
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
    "DATETIME_FORMAT": "j E \\d\\e Y \\a \\l\\e\\s G:i",
    "DATETIME_INPUT_FORMATS": [
      "%d/%m/%Y %H:%M:%S",
      "%d/%m/%Y %H:%M:%S.%f",
      "%d/%m/%Y %H:%M",
      "%d/%m/%y %H:%M:%S",
      "%d/%m/%y %H:%M:%S.%f",
      "%d/%m/%y %H:%M",
      "%Y-%m-%d %H:%M:%S",
      "%Y-%m-%d %H:%M:%S.%f",
      "%Y-%m-%d %H:%M",
      "%Y-%m-%d"
    ],
    "DATE_FORMAT": "j E \\d\\e Y",
    "DATE_INPUT_FORMATS": [
      "%d/%m/%Y",
      "%d/%m/%y",
      "%Y-%m-%d"
    ],
    "DECIMAL_SEPARATOR": ",",
    "FIRST_DAY_OF_WEEK": 1,
    "MONTH_DAY_FORMAT": "j E",
    "NUMBER_GROUPING": 3,
    "SHORT_DATETIME_FORMAT": "d/m/Y G:i",
    "SHORT_DATE_FORMAT": "d/m/Y",
    "THOUSAND_SEPARATOR": ".",
    "TIME_FORMAT": "G:i",
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S",
      "%H:%M:%S.%f",
      "%H:%M"
    ],
    "YEAR_MONTH_FORMAT": "F \\d\\e\\l Y"
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

