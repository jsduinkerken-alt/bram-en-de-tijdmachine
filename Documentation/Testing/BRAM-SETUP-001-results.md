# Oplevering — 2026-10-24

BRAM-SETUP-001, v0.8.0, branch `codex/bram-setup-001`.

## Gewijzigde bestanden

- `index.html`: kleine ouderknop, zichtbaar versielabel en laden van versiescript; bestaande inline klokcode behouden.
- `README.md`: testen, documentatie en publicatie na acceptatie.
- `src/version.js`: centrale versie en herladen met verse HTML-queryparameter.
- `package.json`: dependencyvrij testcommando.
- `tests/app.test.cjs`: vijf regressietests op bestaande functies en versiescript.
- `PROJECT_OVERVIEW.md`: doelgroep, platform, structuur, toekomstige onderdelen en ontwerpstatussen.
- `Documentation/Decisions/001-foundation.md`: technische keuzes en cachebeperking.
- `Documentation/Testing/BRAM-SETUP-001.md`: volledige overdracht en fysieke acceptatiematrix.
- Dit resultatenbestand en `.gitkeep` in alle gevraagde lege mappen.

## Uitgevoerd

`node --test` met Node.js 24.19.0: 5 geslaagd, 0 gefaald. `git diff --check`: geslaagd. Geen extra testframework of npm-afhankelijkheden toegevoegd. Browserrendering, echte touch, geluid, spraak en beginschermicoon zijn niet fysiek getest.

## Acties

Henk voert de automatische tests en de browsermatrix uit het overdrachtsdocument uit. Jasper controleert de kandidaat op de fysieke iPad en geeft expliciet acceptatie. Pas daarna kan de PR worden samengevoegd en de bestaande Pages-publicatie volgen. Geen merge of live publicatie uitgevoerd. De nieuwe domeinmappen bevatten placeholders; het verplaatsen van klokcode valt buiten deze eerste inrichting.
