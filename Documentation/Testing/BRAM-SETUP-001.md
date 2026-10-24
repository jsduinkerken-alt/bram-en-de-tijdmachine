# Testoverdracht — BRAM-SETUP-001

Branch: `codex/bram-setup-001`. Baseline: `9b0228c`. Kandidaat: v0.8.0.

## Automatisch — Henk

Gebruik Node.js 24 (getest met 24.19.0). Voer `node --test` of `npm test` uit in de projectroot; geen installatie nodig. Vijf tests controleren gekoppelde wijzerconversies, alle hele/halve uren en tolerantie, beide draairichtingen over twaalf, alle combinaties van spelmodus/speelwijze/niveau met antwoorden en sterren, en de centrale versie plus vernieuw-URL. De DOM-vervanger test geen browserrendering en produceert geen werkelijk geluid.

## Browser en fysieke iPad — Henk en Jasper

Vergelijk kandidaat en baseline op hetzelfde apparaat. Serveer de kandidaat via een lokale statische HTTP-server op het eigen netwerk of een afzonderlijke testomgeving; publiceer hem nog niet op de live Pages-site. Noteer iPadmodel, iPadOS/Safari-versie, oriëntatie, commit en resultaat per stap.

| Stap | Verwacht |
| --- | --- |
| Open staand en liggend | Klok, knoppen, versie en ouderknop zichtbaar en bereikbaar; geen overlap of afsnijding |
| Sleep elk van beide wijzers langzaam en snel | Soepel, gekoppeld, geen paginascroll tijdens slepen |
| Draai beide richtingen over twaalf | Geen sprong naar verkeerd uur |
| Laat los buiten de klok, onderbreek touch | Slepen stopt correct |
| Ontdekken, beide niveaus, Verrassing | Nederlandse tijd klopt, hele en halve uren beschikbaar |
| Zet de klok: fout en goed, daarna opnieuw Controleer | Feedback klopt; één ster en één deuntje per opdracht |
| Hoe laat?: fout en goed, daarna Volgende | Drie antwoorden, correcte feedback, nieuwe opdracht |
| Samen en Zelf spelen, Luister | Beide beschikbaar; Nederlandse spraak waar Safari dit ondersteunt |
| Goed antwoord na eerste aanraking | Succesdeuntje hoorbaar, ster zichtbaar; controleer ook apparaatvolume |
| Vernieuwen met internetverbinding | Zelfde app herlaadt, v0.8.0 zichtbaar; lopende opdracht en sessiesterren resetten |
| Open via bestaand beginschermicoon | Bestaand icoon behouden, app bruikbaar, Vernieuwen bereikbaar |

## Acceptatie en bevindingen

Automatisch resultaat wordt in de oplevering vastgelegd. Browser- en fysieke iPad-tests zijn nog uit te voeren. Leg fouten vast met stappen, verwacht/werkelijk gedrag, apparaat, commit en eventueel screenshot. Blokkerend: touchregressie, verkeerde tijden, ontbrekende spelmodi, onbereikbare bediening of kapot icoon. Jasper accepteert expliciet voordat iemand de PR samenvoegt of Pages publiceert. Er is in deze opdracht geen live publicatie uitgevoerd.
