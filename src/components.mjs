// Run this script on the NL Design System website:
// https://nldesignsystem.nl/componenten/
const getComponentData = (document) =>
  JSON.stringify(
    Array.from(document.querySelectorAll("section")).map((section) => ({
      name: section.querySelector("h2").textContent,
      description: section.querySelector(".utrecht-paragraph").textContent,
      id: section.querySelector("a").href.replace(/.+\//, ""),
    })),
    null,
    2,
  );

export const nldsComponents = [
  {
    name: "Accordion",
    description:
      "Secties met de mogelijkheid om gerelateerde content te tonen en weer te verbergen.",
    id: "accordion",
  },
  {
    name: "Action group",
    description:
      "Groepeert één of meer gerelateerde acties en verzorgt de lay-out van de content.",
    id: "action-group",
  },
  {
    name: "Alert",
    description:
      "Belangrijk bericht dat informeert over de huidige activiteit van de gebruiker.",
    id: "alert",
  },
  {
    name: "Alert dialog",
    description:
      "Opent een venster waarin de gebruiker een actie moet uitvoeren om verder te gaan. De rest van de pagina is tijdelijk geblokkeerd.",
    id: "alert-dialog",
  },
  {
    name: "Avatar",
    description:
      "Een afbeelding die een identiteit vertegenwoordigt, meestal in de vorm van een foto, illustratie, of initialen.",
    id: "avatar",
  },
  {
    name: "Blockquote",
    description: "Toont een citaat dat afwijkt van de hoofdtekst.",
    id: "blockquote",
  },
  {
    name: "Breadcrumb navigation",
    description:
      "Toont de locatie van de pagina binnen de hiërarchie van een website en biedt de mogelijkheid om tussen niveaus te navigeren.",
    id: "breadcrumb-navigation",
  },
  {
    name: "Button",
    description: "Biedt de mogelijkheid om een actie uit te voeren.",
    id: "button",
  },
  {
    name: "Calendar",
    description: "Een kalender waarin je een beschikbare datum kan kiezen.",
    id: "Calendar",
  },
  {
    name: "Card as link",
    description:
      "Korte sectie die als geheel een link is naar een gerelateerde pagina.",
    id: "card-as-link",
  },
  {
    name: "Case card",
    description:
      "Toont meta-informatie over een zaak en biedt de mogelijkheid hier naartoe te navigeren.",
    id: "case-card",
  },
  {
    name: "Checkbox",
    description:
      'Invoerveld voor het kiezen van een optie uit een groep van opties, of om te kiezen tussen "wel" of "niet".',
    id: "checkbox",
  },
  {
    name: "Checkbox group",
    description:
      "Biedt de mogelijkheid om geen, één of meerdere opties te selecteren uit een lijst.",
    id: "checkbox-group",
  },
  {
    name: "Data badge",
    description:
      "Label met extra informatie, zoals een categorie of een eigenschap.",
    id: "data-badge",
  },
  {
    name: "Date input",
    description:
      "Invoerveld om een datum in te vullen met de mogelijkheden die de browser biedt.",
    id: "date-input",
  },
  {
    name: "Date input group",
    description:
      "Formulierveld voor een datum die de gebruiker al weet of die van bekende gegevens overgenomen kan worden.",
    id: "date-input-group",
  },
  {
    name: "Date picker",
    description:
      "Biedt de mogelijkheid om een beschikbare datum te kiezen uit een op maat gemaakte kalender.",
    id: "date-picker",
  },
  {
    name: "Description list",
    description:
      "Toont een lijst aan termen en hun beschrijving, bijvoorbeeld een woordenlijst.",
    id: "description-list",
  },
  {
    name: "Dot badge",
    description: " ",
    id: "dot-badge",
  },
  {
    name: "Drawer",
    description:
      "Een paneel aan de zijkant van een scherm, die geopend kan worden voor gerelateerde informatie, formulieren of acties.",
    id: "drawer",
  },
  {
    name: "Fieldset",
    description: "Groep van gerelateerde formuliervelden.",
    id: "fieldset",
  },
  {
    name: "Figure",
    description:
      "Groepeert content zoals bijvoorbeeld een afbeelding, eventueel aangevuld met een bijschrift.",
    id: "figure",
  },
  {
    name: "File input",
    description:
      "Biedt de mogelijkheid om één of meerdere bestanden te selecteren en te uploaden.",
    id: "file-input",
  },
  {
    name: "Form field",
    description:
      "Een invoerveld en bijbehorende onderdelen die helpen bij het invullen.",
    id: "form-field",
  },
  {
    name: "Form field checkbox option",
    description: " ",
    id: "form-field-checkbox-option",
  },
  {
    name: "Form field description",
    description:
      "Toont ondersteunende tekst en biedt extra context over de in te vullen informatie.",
    id: "form-field-description",
  },
  {
    name: "Form field error message",
    description:
      "Toont een foutmelding die informeert wat er is fout gegaan en hoe dit is op te lossen.",
    id: "form-field-error-message",
  },
  {
    name: "Form field label",
    description:
      "Toont een tekstlabel dat informeert over de in te vullen informatie.",
    id: "form-field-label",
  },
  {
    name: "Form field option label",
    description: " ",
    id: "form-field-option-label",
  },
  {
    name: "Form field partial",
    description: " ",
    id: "form-field-partial",
  },
  {
    name: "Form field partial label",
    description: " ",
    id: "form-field-partial-label",
  },
  {
    name: "Form field radio option",
    description: " ",
    id: "form-field-radio-option",
  },
  {
    name: "Heading",
    description:
      "Koptekst die in de koppenstructuur ingesteld kan worden op het juiste niveau.",
    id: "heading",
  },
  {
    name: "Heading 1",
    description: "Hoofdkop van een pagina.",
    id: "heading-1",
  },
  {
    name: "Heading 2",
    description:
      "Koptekst die volgt na de hoofdkop en in de koppenstructuur op het tweede niveau staat.",
    id: "heading-2",
  },
  {
    name: "Heading 3",
    description:
      "Koptekst die in de koppenstructuur op het derde niveau staat.",
    id: "heading-3",
  },
  {
    name: "Heading 4",
    description:
      "Koptekst die in de koppenstructuur op het vierde niveau staat.",
    id: "heading-4",
  },
  {
    name: "Heading 5",
    description:
      "Koptekst die in de koppenstructuur op het vijfde niveau staat.",
    id: "heading-5",
  },
  {
    name: "Heading 6",
    description:
      "Koptekst die in de koppenstructuur op het zesde niveau staat.",
    id: "heading-6",
  },
  {
    name: "Heading group",
    description: "Toont een combinatie van een titel en ondersteunende tekst.",
    id: "heading-group",
  },
  {
    name: "Icon",
    description: " ",
    id: "icon",
  },
  {
    name: "Invalid form alert",
    description: " ",
    id: "invalid-form-alert",
  },
  {
    name: "Language navigation",
    description:
      "Eén of meerdere links om de website te openen in een andere taal.",
    id: "language-navigation",
  },
  {
    name: "Legend",
    description: " ",
    id: "legend",
  },
  {
    name: "Link",
    description:
      "Een verwijzing om een een externe bron of bestand te openen of te navigeren binnen dezelfde pagina of website.",
    id: "link",
  },
  {
    name: "Link list",
    description:
      "Een lijst met gerelateerde links naar andere pagina’s of websites.",
    id: "link-list",
  },
  {
    name: "Modal dialog",
    description:
      "Toont een venster over de pagina om de aandacht op een enkele taak of bericht te vestigen. Interactie met onderliggende pagina wordt geblokkeerd.",
    id: "modal-dialog",
  },
  {
    name: "Navigation bar",
    description:
      "Toont een hiërarchische horizontale navigatie aan de bovenkant van een pagina en biedt de mogelijkheid om tussen pagina’s te navigeren.",
    id: "navigation-bar",
  },
  {
    name: "Non modal dialog",
    description: " ",
    id: "non-modal-dialog",
  },
  {
    name: "Notification banner",
    description: " ",
    id: "notification-banner",
  },
  {
    name: "Number badge",
    description:
      "Klein label dat de aandacht trekt informeert over een aantal.",
    id: "number-badge",
  },
  {
    name: "Number input",
    description: "Invoerveld voor een heel getal of een getal met decimalen.",
    id: "number-input",
  },
  {
    name: "Ordered list",
    description: "Lijst waarvan de volgorde van items betekenis heeft.",
    id: "ordered-list",
  },
  {
    name: "Page footer",
    description: " ",
    id: "page-footer",
  },
  {
    name: "Page header",
    description:
      "Een plek bovenaan elke pagina voor een logo, navigatie en zoeken.",
    id: "page-header",
  },
  {
    name: "Pagination",
    description: " ",
    id: "pagination",
  },
  {
    name: "Paragraph",
    description: "Toont een alinea aan tekst.",
    id: "paragraph",
  },
  {
    name: "Password input",
    description:
      "Afgeschermd invoerveld om een geheime tekst in te vullen, zoals een wachtwoord.",
    id: "password-input",
  },
  {
    name: "Pre-heading",
    description: "Een ondersteunende tekst die boven een kop staat.",
    id: "pre-heading",
  },
  {
    name: "Progress bar",
    description: "Toont de voortgang van een proces in een balk.",
    id: "progress-bar",
  },
  {
    name: "Progress list",
    description:
      "Toont de voortgang van een reeks stappen en biedt indien nodig extra details over een stap.",
    id: "progress-list",
  },
  {
    name: "Radio button",
    description:
      "Invoerveld voor het kiezen van een enkele optie uit een groep van opties.",
    id: "radio-button",
  },
  {
    name: "Radio group",
    description:
      "Biedt de mogelijkheid om één optie te selecteren uit een lijst.",
    id: "radio-group",
  },
  {
    name: "Range",
    description:
      "Toont een visuele indicatie van aanpasbare inhoud en biedt de mogelijkheid om een waarde binnen een vooraf ingesteld bereik te kiezen.",
    id: "range",
  },
  {
    name: "Rich text content",
    description:
      "Tekst met uitgebreide opmaakopties zoals links, koppen, lijsten en tabellen.",
    id: "rich-text-content",
  },
  {
    name: "Select",
    description:
      "Biedt de mogelijkheid om één optie te selecteren uit een opgeklapte lijst.",
    id: "select",
  },
  {
    name: "Separator",
    description: "Toont een horizontale lijn om content te scheiden.",
    id: "separator",
  },
  {
    name: "Side navigation",
    description:
      "Toont een hiërarchische, verticale navigatie aan de zijkant van een pagina.",
    id: "side-navigation",
  },
  {
    name: "Skip link",
    description:
      "Verborgen mogelijkheid om snel naar een ander deel van de pagina te navigeren zonder gebruik te maken van een muis of touchscreen.",
    id: "skip-link",
  },
  {
    name: "Spinner",
    description:
      "Een animatie die aangeeft dat een proces nog bezig is, waardoor een deel van de pagina nog niet volledig is geladen of knoppen niet bedienbaar zijn.",
    id: "spinner",
  },
  {
    name: "Status badge",
    description: " ",
    id: "status-badge",
  },
  {
    name: "Strong",
    description: "Korte belangrijke tekst die vetgedrukt wordt weergegeven.",
    id: "strong",
  },
  {
    name: "Subheading",
    description: " ",
    id: "sub-heading",
  },
  {
    name: "Summary list",
    description: " ",
    id: "summary-list",
  },
  {
    name: "Switch",
    description: "Invoerveld om een optie aan of uit te zetten.",
    id: "switch",
  },
  {
    name: "Table",
    description: "Structureert data in rijen en kolommen.",
    id: "table",
  },
  {
    name: "Tabs",
    description:
      "Paneel om onderwerpen te groeperen, waarbij er maar één per keer zichtbaar is, met knoppen om te kiezen welk onderwerp wordt weergegeven.",
    id: "tabs",
  },
  {
    name: "Task list",
    description:
      "Lijst met taken die zijn gemarkeerd als voltooid of onvoltooid.",
    id: "task-list",
  },
  {
    name: "Text input",
    description: "Biedt de mogelijkheid om één regel aan tekens in te vullen.",
    id: "text-input",
  },
  {
    name: "Text input group",
    description: " ",
    id: "text-input-group",
  },
  {
    name: "Textarea",
    description: "Invoerveld voor het bewerken van meerdere regels tekst.",
    id: "textarea",
  },
  {
    name: "Toggletip",
    description:
      "Een knop die tijdelijke informatie toont en deze automatisch verbergt wanneer iets anders dan de knop wordt gebruikt.",
    id: "toggletip",
  },
  {
    name: "Unordered list",
    description:
      "Opsomming waar de volgorde van items in de lijst niet van belang is.",
    id: "unordered-list",
  },
  {
    name: "Video",
    description:
      "Video met bedieningselementen voor afspelen, pauzeren, tekstalternatieven, en meer.",
    id: "video",
  },
];

export const extraComponents = [
  {
    name: "Logo",
    description: "",
    id: "logo",
  },
  {
    name: "Image",
    description: "",
    id: "image",
  },
  {
    name: "Cookie consent form",
    description: "",
    id: "cookie-consent-form",
  },
  {
    name: "Cookie consent form",
    description: "",
    id: "cookie-consent-form",
  },
  {
    name: "Document",
    description: "",
    id: "document",
  },
];

export const components = [...nldsComponents, ...extraComponents];
