# KRAVSPECIFIKATION: MULTIPLAY SKETCH

## Subsystem 01: Spillobbyer og matchmaking

### Aktører:

- **Spiller:** Bruger, der ønsker at oprette eller deltage i en lobby.
- **System:** Frontend og backend, der håndterer lobbyoprettelse, matchmaking og chat.
- **Lobbyejer:** Spiller, der opretter en lobby og administrerer dens regler.

### Krav:

1. **Oprettelse af lobby:**
   - Spillere skal kunne oprette private eller offentlige lobbyer.
   - Lobbyindstillinger skal inkludere rundetid, antal runder og sværhedsgrad.
2. **Matchmaking:**
   - Spillere uden en specifik lobby skal kunne matches til åbne lobbyer automatisk.
3. **Chat:**
   - Spillere i en lobby skal kunne kommunikere via chat.
4. **Lobbyadministration:**
   - Lobbyejeren skal kunne starte spillet, når alle deltagere er klar.

## Subsystem 02: Tegne- og gættespil med pointgivning

### Aktører:

- **Tegner:** Spiller, der får tildelt et ord og skal tegne det.
- **Gætter:** Spillere, der gætter ordet baseret på tegningen.
- **System:** Evaluator for korrekte svar og pointfordeling.

### Krav:

1. **Tegnefunktion:**
   - Tegneren får et ord og en tidsbegrænsning til at tegne det.
   - Tegneområdet skal inkludere værktøjer som pensel, viskelæder og farvevalg.
2. **Gætning:**
   - Gættere skriver deres svar i en chatboks.
   - Systemet evaluerer svar og tildeler point til første korrekte svar.
3. **Pointgivning:**
   - Systemet skal understøtte bonuspoint for hurtige svar eller svære ord.
4. **Leaderboard:**
   - Ved spillets afslutning vises en rangliste baseret på spillerens samlede point.

## Subsystem 03: Brugerprofiler og statistik

### Aktører:

- **Bruger:** Registrerede spillere, der kan tilpasse deres profiler og se statistik.
- **System:** Backend og database, der håndterer brugerdata.

### Krav:

1. **Profiler:**
   - Brugere skal kunne oprette og tilpasse profiler med brugernavn, profilbillede og præferencer.
2. **Statistik:**
   - Systemet skal gemme og vise statistik som antal vundne spil, gennemsnitlige point pr. spil og favoritkategorier.
3. **Venneliste:**
   - Brugere skal kunne tilføje venner og invitere dem til private spil.
4. **Spilhistorik:**
   - Systemet skal gemme spilhistorik, så brugere kan se tidligere resultater.

## Subsystem 04: Adminpanel til vedligeholdelse

### Aktører:

- **Administrator:** Bruger med rettigheder til at overvåge og vedligeholde systemet.
- **System:** Adminpanel, der giver adgang til administrative funktioner.

### Krav:

1. **Overvågning:**
   - Administratorer skal kunne se aktive lobbyer og igangværende spil.
2. **Moderation:**
   - Administratorer skal kunne moderere rapporterede brugere og tegninger.
3. **Ordlisten:**
   - Administratorer skal kunne tilføje eller opdatere ord og kategorier.
4. **Rapporter:**
   - Systemet skal generere rapporter om ydeevne og brugsmønstre.
