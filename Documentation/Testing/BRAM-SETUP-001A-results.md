# BRAM-SETUP-001A — overdracht aan Henk

Datum: 2026-10-24. Kandidaat: v0.8.0. Branch: `codex/bram-setup-001`.

## Wijzigingen

- Eén tijdpresentatie: digitale tijd met kleinere geschreven tijd tussen haakjes. Toegepast op de actuele tijd in Ontdekken, doelopdracht in Zet de klok en antwoordknoppen in Hoe laat is het. De leesvraag blijft 'Hoe laat is het?' zodat het antwoord niet wordt weggegeven.
- Hele uren, halve uren, kwartieren en tussenliggende minuten hebben Nederlandse omschrijvingen. Afronding van de wijzerpositie kan geen digitale minuut 60 meer opleveren.
- Antwoordknoppen vergelijken minutenwaarden; tekst is uitsluitend presentatie. Gesproken opdrachten gebruiken uitsluitend natuurlijk Nederlands.
- Elke tien sterren start eenmaal een CSS-ballonnenfeest met een kort Web Audio-deuntje. De bestaande succesmelding en puls blijven behouden. De viering sluit na 3,8 seconden, via Feest overslaan of bij de volgende opdracht. De overige bediening blijft beschikbaar. Reduced-motion wordt gerespecteerd.
- Herhaald Controleer of antwoordklikken binnen dezelfde opgeloste opdracht levert geen extra sterren op.

## Uitgevoerde tests

`node --test`, Node.js 24.19.0: **10 geslaagd, 0 gefaald**.

Dekking: wijzerkoppeling en twaalfuursgrens, alle twaalf hele/halve uren, alle spelmodi en speelwijzen, digitale/geschreven tijd inclusief kwartieren, numerieke antwoordknoppen, drempels 10/20/30, herhaalde controle, overslaan, automatische afloop, opruimen bij volgende opdracht, natuurlijke spraak en bestaande versie/vernieuwfunctie.

`git diff --check`: geslaagd. Geen frameworks of dependencies toegevoegd.

## Controle door Henk

1. Voer `node --test` uit.
2. Controleer op iPad Safari staand en liggend: alle modi en beide niveaus, digitale tijd groter dan geschreven tijd, voldoende ruimte voor opdrachten/antwoorden, wijzers in beide richtingen over twaalf.
3. Controleer Zelf spelen en Luister: natuurlijke Nederlandse opdrachten zonder dubbel voorlezen van de tijd.
4. Behaal tien sterren: ballonnen omhoog, kort feestdeuntje, bestaande succesfeedback zichtbaar; herhaald Controleer verandert de score niet.
5. Controleer overslaan, automatisch verdwijnen binnen vier seconden en direct verder spelen tijdens de viering. Herhaal bij twintig sterren.
6. Controleer geluid na een gebruikersactie op Safari en gedrag met verminderde beweging ingeschakeld. De app moet blijven werken als audio niet beschikbaar is.

Browserrendering, echte touchbediening en daadwerkelijke audio/spraak zijn niet fysiek geverifieerd; de Node-tests gebruiken een lichte DOM/browserstub.

Henk rapporteert de browsercontrole; Jasper voert de fysieke iPad-acceptatie uit. **Niet samenvoegen of live publiceren zonder expliciete acceptatie van Jasper.**
