# Design: Ydelser-dropdown i hovednavigationen

## Formål

SMJ Marines hovednavigation skal give direkte adgang til de fire eksisterende servicesider. Det nuværende menupunkt "Ydelser" ændres til "Forside", og et nyt menupunkt "Ydelser" placeres umiddelbart efter det.

## Omfang

Navigationen opdateres på:

- `index.html`
- `baadklargoering.html`
- `motorservice.html`
- `polering-bundmaling.html`
- `svejse-metalopgaver.html`

Cookie-, kontakt- og sideindhold uden for navigationen ændres ikke.

## Desktopnavigation

Menupunkterne starter med:

1. "Forside", som linker til `/`
2. "Ydelser", som styrer en dropdown

Dropdownen indeholder disse eksisterende links:

- Bådklargøring: `/baadklargoering.html`
- Motorservice: `/motorservice.html`
- Polering & Bundmaling: `/polering-bundmaling.html`
- Svejse & Metalopgaver: `/svejse-metalopgaver.html`

Dropdownen åbner, når markøren holdes over "Ydelser", eller når brugeren aktivt klikker på menupunktet. Tastaturfokus alene åbner ikke menuen. Et aktivt tryk med Enter eller mellemrum behandles som et klik. Menuen kan lukkes ved endnu et klik, ved klik uden for menuen eller med Escape.

Hvert servicelink får en diskret overgang ved hover, eksempelvis ændret tekst-/baggrundsfarve og en mindre vandret bevægelse. Animationen skal følge sidens nuværende visuelle udtryk og respektere `prefers-reduced-motion`.

## Mobilnavigation

"Forside" vises som et normalt link. "Ydelser" vises som en knap med en visuel indikator for åben/lukket tilstand. Et aktivt tryk udfolder eller sammenfolder de fire servicelinks. Undermenuen er lukket, når mobilmenuen åbnes første gang.

Knappen eksponerer sin tilstand med `aria-expanded`, og undermenuen forbindes med `aria-controls`. Når et link vælges, lukkes den eksisterende mobilmenu som hidtil.

## Implementeringsstruktur

Den eksisterende statiske HTML-struktur beholdes. Navigationens markup og nødvendige styles tilføjes ens på alle fem sider. Den eksisterende JavaScript-menu udvides med små, afgrænsede handlers til desktop-dropdownen og mobil-accordionen.

Der indføres ingen framework- eller runtime-afhængigheder.

## Fejl- og randtilfælde

- JavaScript bruger defensive elementopslag, så en manglende menu ikke stopper anden sidefunktionalitet.
- Desktop-dropdownen lukkes ved klik udenfor og Escape.
- Mobilundermenuens tilstand nulstilles, når hele mobilmenuen lukkes.
- Links bruger absolutte paths fra domænets rod, så de virker fra alle fem sider.

## Verifikation

Integrationstests skal kontrollere:

- At "Forside" står før "Ydelser" på alle fem sider.
- At "Forside" linker til `/`.
- At dropdownen indeholder præcis de fire korrekte servicesider.
- At mobilknappen har de nødvendige ARIA-attributter.
- At hver side indeholder den forventede dropdown- og accordion-struktur.

Efter automatiske tests verificeres desktop-hover, aktivt klik, klik udenfor, Escape samt mobilens udfoldning visuelt i en browser.
