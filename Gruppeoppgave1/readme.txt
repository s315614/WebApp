Index

P� Index siden s� har vi valgt en enkelt l�sning, n�r man skal kj�pe den filmen man �nsker. Vi har valgt �
referere direkte til login. Det er noen funksjoner som vi kunne ha tenkt � implementere dersom vi hadde mer tid,
er f.eks. at det kommer opp en tekst melding der det st�r at man er n�dt til � logge inn f�rst, og at man blir
referert direkte til betaling etter at man har logget inn.

S�kfelt

Vi opplever at det tar noen ekstra sekunder f�r dataene blir lastet opp fra databasen med ajax. Vi mener at det
er mindre brukervennlig men mer effektiv. En annen ting er dersom man har valgt kategori, s� kan man s�ke filmene
videre. For den versjonen som vi har s� blir kategori overkj�rt dersom man s�ker.

Validering av form

L�sningen v�r p� validering er gjennom class(backend) siden det er relevant til faget, og vi
har da droppet validering med Html. Den f�rste gangen man validerer s� vil ikke det funke, men den andre gangen
s� vil det funke, har vi oppdaget

Registrering

En ting som vi legger merke til er f�dselsdatofeltet, vi har
ikke klart � begrense det datoen som brukeren oppgir. Man kan
derfor v�re over 1000 �r gammelt eller at man ikke er f�dt.
Passordfeltet burde ha v�rt begrenset med 6 tall, slik at man
ikke har 2 tall, ogs� m� man minst ha 6 tall for � logge seg inn.
Vi heller ikke tid til � gi brukerne en melding dersom brukeren finnes fra f�r av

Hovedsiden(innlogget)

Dersom man trykker p� "Velkommen @epost" s� blir man navigert
til en side der man kan se p� alle filmene som man har kj�pt.
N�r det kommer til design, s� tror vi at det hadde v�rt mer
oversiktlig om vi hadde listet opp filmnavnene under bildene.

Betaling

P� betalingssiden s� har vi veldig lite informasjon om den filmen som man har
valgt, og vi har valgt en enkel betalingsm�te. Filmen blir betalt dersom man
fyller alle feltene med html validering. En annen forbedring som vi kunne ha
tenkt oss er at det kommer p� en melding til kundene etter at filmen er kj�pt.

