# Bram en de Tijdmachine

Small Spark Studio maakt een Nederlandstalig educatief klokspel voor jonge kinderen vanaf ongeveer vier jaar. Het platform is iPad-first en browser/WebGL-vriendelijk; de huidige app gebruikt HTML, SVG en JavaScript zonder buildstap of externe runtime-afhankelijkheden.

Er zijn twee zelfstandige hoofdonderdelen: Oefenklok en Tijdavonturen. De bestaande Oefenklok blijft de functionele baseline. Tijdavonturen krijgt later een avonturenwereld en afzonderlijk kiesbare activiteiten. Tijdreizen naar historische perioden volgen later. Klokkie is het vriendelijke gidsfiguurtje. Samen spelen en zelfstandig spelen zijn beide uitgangspunten.

## Structuur

| Pad | Bestemming |
| --- | --- |
| `index.html` | Bestaande werkende Oefenklok; root behouden voor GitHub Pages |
| `apple-touch-icon.png` | Bestaand iPad-appicoon |
| `src/version.js` | Centrale appversie en ouderknop Vernieuwen |
| `src/clock/` | Toekomstige gedeelde kloklogica en wijzerbediening |
| `src/practice/` | Toekomstige Oefenklokmodules |
| `src/adventures/` | Toekomstige Tijdavonturenactiviteiten |
| `src/world/` | Toekomstige avonturenwereld |
| `src/characters/` | Toekomstig karaktergedrag, waaronder Klokkie |
| `assets/characters/klokkie/` | Klokkie-art |
| `assets/environments/`, `assets/animations/`, `assets/audio/`, `assets/ui/` | Toekomstige assets |
| `Documentation/Blueprints/`, `Documentation/ArtCanon/` | Ontwerpblueprints en artcanon |
| `Documentation/Decisions/`, `Documentation/Testing/` | Besluiten en testoverdracht |
| `tests/` | Lichte Node-tests zonder extra framework |

Lege bestemmingen bevatten `.gitkeep`. De kloktechniek moet later herbruikbaar worden; extractie gebeurt stapsgewijs onder regressietests, niet in deze foundation-opdracht.

## Ontwerpbeheer

Blueprints en artwork volgen **Reference → Candidate → Approved → Deprecated**. Leg per ontwerp status, maker, datum, revisie en bron vast. Reference is inspiratie; Candidate is een voorstel; Approved is expliciet door regie Pim goedgekeurd; Deprecated is vervangen en blijft traceerbaar. Alleen Approved is leidend voor implementatie. Deze opdracht keurt geen artwork goed.

## Rollen en grenzen

Regie: Pim. Uitvoering: Codex. Testen: Henk. Fysieke iPad-acceptatie: Jasper. GitHub is de bron voor versiebeheer. Geen avonturenwereld, tijdmachine, nieuw hoofdmenu of geanimeerde Klokkie in BRAM-SETUP-001. Publicatie en merge naar de Pages-bron wachten op Jaspers acceptatie.
