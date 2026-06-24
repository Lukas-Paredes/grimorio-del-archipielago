(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.sources = [
    {
      id: "memoria-chilena",
      title: "Memoria Chilena",
      type: "Portal patrimonial general",
      url: "https://www.memoriachilena.gob.cl/",
      status: "general",
      note: "La referencia heredada es general. Faltan entrada, edición y página para sostener afirmaciones específicas."
    },
    {
      id: "patrimonio-cultural",
      title: "Servicio Nacional del Patrimonio Cultural",
      type: "Portal institucional general",
      url: "https://www.patrimoniocultural.gob.cl/",
      status: "general",
      note: "Referencia institucional general; falta vinculación documental específica."
    },
    {
      id: "pending-bibliography",
      title: "Bibliografía y revisión territorial específica",
      type: "Pendiente de investigación",
      url: "",
      status: "pending",
      note: "No incorporada en los archivos disponibles. Las afirmaciones dependientes permanecen provisionales o pendientes."
    }
  ];

  G.claims = [
    { id: "cl-origin-1", worldId: "origin", figureIds: ["tenten"], type: "tradition", status: "provisional", text: "Tentén se vincula con tierra elevada y refugio.", sourceIds: ["memoria-chilena"] },
    { id: "cl-origin-2", worldId: "origin", figureIds: ["caicai"], type: "tradition", status: "provisional", text: "Caicai se vincula con ascenso del agua y transformación.", sourceIds: ["memoria-chilena"] },
    { id: "cl-origin-3", worldId: "origin", figureIds: ["tenten", "caicai"], type: "variant", status: "pending", text: "El destino de personas y animales varía entre versiones.", sourceIds: [] },
    { id: "cl-origin-4", worldId: "origin", figureIds: [], type: "interpretation", status: "documented", text: "Los siete mundos son una organización curatorial del proyecto.", sourceIds: [] },
    { id: "cl-court-1", worldId: "sea-court", figureIds: ["millalobo"], type: "tradition", status: "provisional", text: "Millalobo articula el imaginario de la corte submarina.", sourceIds: ["memoria-chilena"] },
    { id: "cl-court-2", worldId: "sea-court", figureIds: ["huenchula"], type: "tradition", status: "pending", text: "Huenchula enlaza mundo humano y marino en la síntesis heredada.", sourceIds: [] },
    { id: "cl-court-3", worldId: "sea-court", figureIds: ["pincoya"], type: "tradition", status: "provisional", text: "Pincoya se asocia con danza y abundancia marina.", sourceIds: ["memoria-chilena"] },
    { id: "cl-court-4", worldId: "sea-court", figureIds: ["pincoy", "sirena", "caballo-marino"], type: "variant", status: "pending", text: "Funciones y parentescos de Pincoy, Sirena y Caballo Marino requieren contraste.", sourceIds: [] },
    { id: "cl-fog-1", worldId: "caleuche", figureIds: ["caleuche"], type: "tradition", status: "provisional", text: "Faroles o luces se asocian a la aparición del Caleuche.", sourceIds: ["memoria-chilena"] },
    { id: "cl-fog-2", worldId: "caleuche", figureIds: ["caleuche"], type: "tradition", status: "provisional", text: "La música distante funciona como señal del Caleuche.", sourceIds: ["memoria-chilena"] },
    { id: "cl-fog-3", worldId: "caleuche", figureIds: ["caleuche"], type: "variant", status: "pending", text: "La composición de la tripulación cambia según la versión.", sourceIds: [] },
    { id: "cl-fog-4", worldId: "caleuche", figureIds: ["caleuche", "brujo"], type: "variant", status: "pending", text: "La relación entre Caleuche y brujos aparece sólo en algunas versiones.", sourceIds: [] },
    { id: "cl-forest-1", worldId: "forest", figureIds: ["trauco"], type: "tradition", status: "provisional", text: "Trauco se sitúa en relatos de monte, sendero y peligro.", sourceIds: ["memoria-chilena"] },
    { id: "cl-forest-2", worldId: "forest", figureIds: ["fiura"], type: "variant", status: "pending", text: "Descripción y parentescos de Fiura varían.", sourceIds: [] },
    { id: "cl-forest-3", worldId: "forest", figureIds: ["chucao"], type: "tradition", status: "provisional", text: "Las lecturas culturales del canto del Chucao dependen de contexto y dirección.", sourceIds: ["patrimonio-cultural"] },
    { id: "cl-forest-4", worldId: "forest", figureIds: ["raiquen", "piuchen"], type: "variant", status: "pending", text: "Raiquén y Piuchén necesitan validación territorial.", sourceIds: [] },
    { id: "cl-waters-1", worldId: "waters", figureIds: ["camahueto"], type: "tradition", status: "provisional", text: "Camahueto se asocia a cuerno, surco y terreno húmedo.", sourceIds: ["memoria-chilena"] },
    { id: "cl-waters-2", worldId: "waters", figureIds: ["cuchivilu"], type: "tradition", status: "pending", text: "Cuchivilu se relaciona con barro, estero y corral de pesca.", sourceIds: [] },
    { id: "cl-waters-3", worldId: "waters", figureIds: ["cuero-agua"], type: "variant", status: "pending", text: "El Cuero del Agua posee circulación regional más amplia.", sourceIds: [] },
    { id: "cl-waters-4", worldId: "waters", figureIds: [], type: "interpretation", status: "documented", text: "La división por hábitats es una herramienta curatorial.", sourceIds: [] },
    { id: "cl-recta-1", worldId: "recta", figureIds: ["brujo"], type: "history", status: "provisional", text: "Existe un plano histórico que requiere documentos y referencias específicas.", sourceIds: ["memoria-chilena"] },
    { id: "cl-recta-2", worldId: "recta", figureIds: ["brujo"], type: "tradition", status: "pending", text: "Tribunal, jerarquías y jurisdicciones se presentan como organización legendaria.", sourceIds: [] },
    { id: "cl-recta-3", worldId: "recta", figureIds: ["voladora", "invunche"], type: "tradition", status: "pending", text: "Voladora e Invunche se asocian respectivamente con mensajería y custodia.", sourceIds: [] },
    { id: "cl-recta-4", worldId: "recta", figureIds: [], type: "art", status: "documented", text: "Las escenas visuales del proyecto son recreación artística y no documento.", sourceIds: [] },
    { id: "cl-dead-1", worldId: "dead-roads", figureIds: ["animas-cucao"], type: "tradition", status: "pending", text: "Ánimas de Cucao se asocian con costa occidental, temporal y memoria.", sourceIds: [] },
    { id: "cl-dead-2", worldId: "dead-roads", figureIds: ["condena"], type: "variant", status: "pending", text: "Motivo y forma de La Condená varían entre relatos.", sourceIds: [] },
    { id: "cl-dead-3", worldId: "dead-roads", figureIds: [], type: "interpretation", status: "documented", text: "Aparición, presagio y memoria son categorías educativas distintas.", sourceIds: [] },
    { id: "cl-dead-4", worldId: "dead-roads", figureIds: [], type: "project", status: "documented", text: "No se incorporaron testimonios territoriales autorizados.", sourceIds: [] }
  ];
}());
