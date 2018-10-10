Index

På Index siden så har vi valgt en enkelt løsning, når man skal kjøpe den filmen man ønsker. Vi har valgt å
referere direkte til login. Det er noen funksjoner som vi kunne ha tenkt å implementere dersom vi hadde mer tid,
er f.eks. at det kommer opp en tekst melding der det står at man er nødt til å logge inn først, og at man blir
referert direkte til betaling etter at man har logget inn.

Søkfelt

Vi opplever at det tar noen ekstra sekunder før dataene blir lastet opp fra databasen med ajax. Vi mener at det
er mindre brukervennlig men mer effektiv. En annen ting er dersom man har valgt kategori, så kan man søke filmene
videre. For den versjonen som vi har så blir kategori overkjørt dersom man søker.

Validering av form

Løsningen vår på validering er gjennom class(backend) siden det er relevant til faget, og vi
har da droppet validering med Html. Den første gangen man validerer så vil ikke det funke, men den andre gangen
så vil det funke, har vi oppdaget

Registrering

En ting som vi legger merke til er fødselsdatofeltet, vi har
ikke klart å begrense det datoen som brukeren oppgir. Man kan
derfor være over 1000 år gammelt eller at man ikke er født.
Passordfeltet burde ha vært begrenset med 6 tall, slik at man
ikke har 2 tall, også må man minst ha 6 tall for å logge seg inn.
Vi heller ikke tid til å gi brukerne en melding dersom brukeren finnes fra før av

Hovedsiden(innlogget)

Dersom man trykker på "Velkommen @epost" så blir man navigert
til en side der man kan se på alle filmene som man har kjøpt.
Når det kommer til design, så tror vi at det hadde vært mer
oversiktlig om vi hadde listet opp filmnavnene under bildene.

Betaling

På betalingssiden så har vi veldig lite informasjon om den filmen som man har
valgt, og vi har valgt en enkel betalingsmåte. Filmen blir betalt dersom man
fyller alle feltene med html validering. En annen forbedring som vi kunne ha
tenkt oss er at det kommer på en melding til kundene etter at filmen er kjøpt.

