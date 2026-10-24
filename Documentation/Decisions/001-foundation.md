# 001 — Behoud klokbaseline

Datum: 2026-10-24. Technisch besluit voor BRAM-SETUP-001.

De opgehaalde baseline is commit `9b0228c`. De opdracht noemt deze v0.7; de oude README noemde nog v0.3 en de app had geen zichtbare versie. We voegen v0.8.0 toe in `src/version.js`.

De bestaande inline klokcode, pointerbediening, stijlen voor klok en spel, geluid en icoon blijven behouden. Alleen de versie/ouderknop en het bijbehorende script worden aan de HTML toegevoegd. Nieuwe domeinmappen zijn voorlopig bestemmingen voor latere modules.

Vernieuwen gebruikt een nieuwe `refresh`-querywaarde via `location.replace`, op dezelfde origin en hetzelfde pad, met behoud van overige queryparameters en fragment. Dit vraagt een nieuwe HTML-URL op zonder de geschiedenis te vullen. Er komt geen serviceworker, opslag of complexe updatearchitectuur. Safari kan afzonderlijke assets nog cachen; de knop wist geen volledige browsercache. Bij toekomstige scriptwijzigingen moet assetcache expliciet worden meegenomen (bijvoorbeeld een versiesuffix op de script-URL).

Automatische tests voeren de bestaande scriptcode uit met een minimale DOM-vervanger. Ze controleren berekeningen en spelgedrag, maar bewijzen geen echte touch-, audio-, spraak- of layoutkwaliteit. Daarvoor geldt het fysieke acceptatieplan.
