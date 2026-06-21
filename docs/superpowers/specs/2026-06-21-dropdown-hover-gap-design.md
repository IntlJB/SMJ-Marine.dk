# Dropdown Hover Gap Design

## Problem

Desktopmenuen for “Ydelser” placerer dropdownen 16 px under knappen. Pointeren forlader derfor dropdownens hover-område på vej fra knappen til menuen, og menuen lukker.

## Design

Reducer den synlige afstand til 4 px på alle fem marketingsider. Bevar samtidig et sammenhængende hover-område mellem knappen og menuen, så menuen forbliver åben under pointerens bevægelse.

En afstand på 0 px blev fravalgt, fordi menuen visuelt ville støde direkte op til navigationen. Kun at ændre 16 px til 4 px blev fravalgt, fordi der stadig ville være et mindre hover-gap. Den valgte løsning kombinerer 4 px visuel afstand med en transparent hover-bro.

Mobilmenuen og dropdownens eksisterende klik-, Escape- og outside-click-adfærd ændres ikke.

## Verification

Navigationstesten skal kontrollere både den reducerede afstand og hover-broen på alle fem marketingsider. Hele testsuiten køres efter ændringen, og dropdownen kontrolleres i en browser på desktopbredde.
