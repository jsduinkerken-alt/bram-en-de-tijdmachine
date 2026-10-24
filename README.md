# Bram en de Tijdmachine

Een klein Nederlandstalig klokleerspel voor iPad en computer.

## Starten
Open `index.html` in een browser. De app heeft geen externe afhankelijkheden.

## Ontwikkelen en testen

Zie `PROJECT_OVERVIEW.md` voor structuur en scope en `Documentation/Testing/BRAM-SETUP-001.md` voor de overdracht aan Henk en Jasper. Voer `node --test` uit met Node.js 24; er zijn geen pakketten te installeren. De centrale appversie staat in `src/version.js`.

## Publiceren met GitHub Pages
Behoud `index.html`, `apple-touch-icon.png` en `src/` op hun huidige paden. Publiceer BRAM-SETUP-001 pas na expliciete acceptatie door Jasper. Een merge naar de bestaande Pages-bron kan de live site bijwerken; merge deze kandidaat dus nog niet. De werkende baseline blijft tot acceptatie beschikbaar.

## Privacy
De app gebruikt geen analytische diensten of server. Spraak gebruikt de browserfunctie speechSynthesis indien beschikbaar.

## Ontwikkeling
Eerste speelbare basis (v0.3): hele/halve uren, samen/zelf, ontdekken/zetten/lezen, sterren en grote actieknoppen.
