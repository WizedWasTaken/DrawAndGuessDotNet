# MULTIPLAY SKETCH SYSTEMBESKRIVELSE

Læs om Multiplay Sketch på deres hjemmeside for at få en forståelse af, hvem "kunden" er, og hvad deres mål er med denne webapp.

**Multiplay Sketch** er en multiplayer tegn og gæt webapp, der giver spillere mulighed for at dyste mod hinanden i realtid, mens de gætter ord baseret på tegninger. Kunden ønsker et system, der understøtter følgende funktionalitet:

1. **Spillobbyer og matchmaking.**
2. **Tegne- og gættespil med pointgivning.**
3. **Brugerprofiler og statistik.**
4. **Adminpanel til vedligeholdelse.**

## 1. SPILLOBBYER OG MATCHMAKING

Denne del af systemet skal gøre det muligt for brugere at oprette eller tilslutte sig spillobbyer:

- Spillere kan oprette private eller offentlige lobbyer med specifikke regler (fx rundetid, antal runder, og sværhedsgrad).
- Matchmaking-systemet matcher spillere med åbne lobbyer, hvis de ikke ønsker at oprette deres egne.
- Lobbyens ejer har mulighed for at starte spillet, når alle deltagere er klar.

Systemet skal også understøtte chat-funktionalitet i lobbyen for at gøre kommunikationen let for spillerne.

## 2. TEGNE- OG GÆTTESPIL MED POINTGIVNING

Kernen i Multiplay Sketch er selve spillet:

- Spilleren, der tegner, får et ord, de skal tegne inden for en tidsbegrænsning.
- De øvrige spillere gætter ordet ved at skrive deres svar i en chatboks. Systemet evaluerer deres svar automatisk og giver point til den, der gætter korrekt først.
- Pointsystemet kan tilpasses med bonuspoint for hurtige svar eller svære ord.
- Tegneområdet skal være intuitivt, med værktøjer som pensel, viskelæder og farvevalg.

Ved spillets afslutning vises en leaderboard over spillerne baseret på deres samlede point.

## 3. BRUGERPROFILER OG STATISTIK

Brugerne skal kunne oprette profiler, som indeholder:

- Brugernavn, profilbillede og præferencer (fx foretrukne sprog).
- Statistik som vundne spil, gennemsnitlige point pr. spil og favoritkategorier.
- Mulighed for at tilføje venner og invitere dem til private spil.

Systemet skal også kunne gemme spilhistorik, så brugerne kan se deres tidligere resultater.

## 4. ADMINPANEL TIL VEDLIGEHOLDELSE

Et adminpanel er nødvendigt for at sikre en god brugeroplevelse og vedligeholde spillet. Det skal give administratorer mulighed for at:

- Overvåge aktive spil og lobbyer.
- Moderere rapporteret upassende adfærd eller tegninger.
- Tilføje eller opdatere ordlister og kategorier.
- Analysere systemets ydeevne og brugsmønstre gennem rapporter og statistikker.
