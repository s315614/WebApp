using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1.Models
{
    public class DBInit : DropCreateDatabaseAlways<DBContext>
    {
        protected override void Seed(DBContext context)
        {

            byte[] passord = lagHash("123456");

            var nyBruker = new Brukere()
            {
                Epost = "Admin@gmail.com",
                Adresse = "Skolengata12",
                Etternavn = "Timsom",
                Fornavn = "Tommy",
                Fødselsdato = "12-23-1997",
                Telefon = "95234352",
                Passord = passord
            };

            byte[] passordAdmin = lagHash("123456");
            var nyAdmin = new Adminer()
            {
               
                Navn = "Tommy Hilfigure",
                Passord = passordAdmin
            };


            var nyKategori1 = new Kategorier()
            {
                KatgoriNavn = "Action"
            };

            var nyKategori2 = new Kategorier()
            {
                KatgoriNavn = "Komedie"
            };
            var nyKategori3 = new Kategorier()
            {
                KatgoriNavn = "Drama"
            };
            var nyKategori4 = new Kategorier()
            {
                KatgoriNavn = "Skrekk"
            };


            var nyFilm = new Filmer()
            {

                Navn = "Nemo",
                Bilde = ImageToArray("nemo.jpg"),
                Beskrivelse = "I de varme tropiske farvannene omkring Great Barrier Reef bor en klovnefisk ved navn Marvin. I en beskyttet grop lever han et trygt og rolig liv med sin eneste sønn Nemo. Når Nemo plutselig blir fanget og ført langt hjemmefra til et akvarium hos en tannlege, må Marvin begi seg ut i det ukjente for å redde sønnen sin.",
                Pris = int.Parse("199"),
                Kategorier = nyKategori2
            };

            var nyFilm1 = new Filmer()
            {

                Navn = "Die hard",
                Bilde = ImageToArray("diehard.jpg"),
                Beskrivelse = "Det er jul i LA og i en skyskraper feirer et storkonsern sin årlige julefest. Men festen blir avbrutt av terrorister som vil presse til seg en enorm sum penger. De er forberedt på alt, men mot politimannen John McClane, hvis kone er et av gislene, har de intet forsvar. En av filmhistoriens villeste katt-og-mus-lek i toppen av en skyskraper.",
                Pris = int.Parse("59"),
                Kategorier = nyKategori1
            };

            var nyFilm2 = new Filmer()
            {

                Navn = "De utrolig 2",
                Bilde = ImageToArray("deutrolige2.jpg"),
                Beskrivelse = "I denne animerte actionkomedien følger vi en familie som består av hemmelige superhjelter, som forsøker å leve et helt vanlig, tilbaketrukket forstadsliv. Hverdagslivet går sin vante gang frem til de en dag må begi seg ut på et redningsoppdrag, og det er ikke et hvilket som helst oppdrag - de må redde verden!",
                Pris = int.Parse("199"),
                Kategorier = nyKategori1
            };

            var nyFilm3 = new Filmer()
            {

                Navn = "Mamma mia!",
                Bilde = ImageToArray("mammami.jpg"),
                Beskrivelse = "Sophie er på jakt etter sin far foran den store dagen. Det finnes kun et lite problem - hun vet ikke hvem han er. Men etter å ha tjuvlest sin mors dagbøker, kommer hun frem til at han er en av hennes tre eks-kjærester. Hun inviterer dem alle tre... Sophie forsøker desperat å holde deres nærvær hemmelig for sin mor, med det tar ikke lange stunden før hemmeligheten avsløres og morsomhetene setter i gang!",
                Pris = int.Parse("250"),
                Kategorier = nyKategori3
            };

            var nyFilm4 = new Filmer()
            {

                Navn = "Night School",
                Bilde = ImageToArray("nightschool.jpg"),
                Beskrivelse = "Teddy Walker is a successful salesman whose life takes an unexpected turn when he accidentally blows up his place of employment. Forced to attend night school to get his GED, Teddy soon finds himself dealing with a group of misfit students, his former high school nemesis and a feisty teacher who doesn't think he's too bright.",
                Pris = int.Parse("250"),
                Kategorier = nyKategori2
            };

            var nyFilm5 = new Filmer()
            {

                Navn = "Mission Impossible Fallout",
                Bilde = ImageToArray("missionimpossiblefallout.jpg"),
                Beskrivelse = "Ethan Hunt and the IMF team join forces with CIA assassin August Walker to prevent a disaster of epic proportions. Arms dealer John Lark and a group of terrorists known as the Apostles plan to use three plutonium cores for a simultaneous nuclear attack on the Vatican, Jerusalem and Mecca, Saudi Arabia. When the weapons go missing, Ethan and his crew find themselves in a desperate race against time to prevent them from falling into the wrong hands.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori1
            };
            var nyFilm6 = new Filmer()
            {

                Navn = "The Godfather",
                Bilde = ImageToArray("TheGodFather.jpg"),
                Beskrivelse = "Mafialederen Don Vito Corleone styrer sitt mektige imperium gjennom et brutalt system av tjenester og gjentjenester. Når han dør må noen av sønnene ta over: advokaten Tom, playboyen Sonny, lojale Fredo - eller Michael, den yngste og minst villige. Den første delen av Francis Ford Coppolas storslagne mesterverk, som stadig rangerer blant verdens beste filmer.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori3
            };
            var nyFilm7 = new Filmer()
            {

                Navn = "3 Idiots",
                Bilde = ImageToArray("drama.jpg"),
                Beskrivelse = "In college, Farhan and Raju form a great bond with Rancho due to his positive and refreshing outlook to life. Years later, a bet gives them a chance to look for their long-lost friend whose existence seems rather elusive.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori2
            };
            var nyFilm8 = new Filmer()
            {

                Navn = "Beauty And The Beast",
                Bilde = ImageToArray("BeautyAndTheBeast.jpg"),
                Beskrivelse = "Belle er en smart, vakker og selvstendig ung kvinne som blir tatt til fange av Udyret i slottet hans. Til tross for sin frykt, blir hun venn med slottets fortryllende beboere og lærer seg å se forbi Udyrets forferdelige ytre og oppdager det gode hjertet til den sanne prinsen innenfor. Dette er historien og karakterene publikum kjenner så godt og er så glade i, og endelig er den her i spillefilmversjon.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori4
            };
            var nyFilm9 = new Filmer()
            {

                Navn = "Harry Potter",
                Bilde = ImageToArray("HarryPotter.jpg"),
                Beskrivelse = "Voldemorts makt blir større og han kontrollerer nå Hogwarts. Harry, Ron og Hermoine bestemmer seg for å avslutte Dumbledores oppdrag som er å finne de gjenværende malacruxene for å kunne beseire Voldemort. Men med det lille håpet som gjenstår, må alt gå etter planen.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori4
            };
            var nyFilm10 = new Filmer()
            {

                Navn = "Breaking In",
                Bilde = ImageToArray("BrakingInAction.jpg"),
                Beskrivelse = "Etter at faren til Shaun Russells har blitt drept drar hun sammen med sønnen og datteren sin til huset hans for å begynne med salget. Bygningen er utstyrt med et toppmoderne sikkerhetssystem, men det familien ikke vet er at fire innbruddstyver allerede befinner seg der inne. Barna blir tatt som gisler inne i huset, mens Shaun er utenfor. Nå må hun gjøre alt hun kan for å bryte seg inn.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori3
            };
            var nyFilm11 = new Filmer()
            {

                Navn = "Hereditary",
                Bilde = ImageToArray("HereditaryHorror.jpg"),
                Beskrivelse = "Når Graham-familiens overhode, Ellen, dør, oppdager datteren Annie og familien hennes noen kryptiske og stadig mer skremmende familiehemmeligheter. Jo mer de oppdager, dess mer blir de overbevist om at noe fryktelig kommer til å skje.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori4
            };
            var nyFilm12 = new Filmer()
            {

                Navn = "Isle Of Dogs",
                Bilde = ImageToArray("IsleOfDogsKomedie.jpg"),
                Beskrivelse = "Wes Anderson er tilbake! I den nye filmen Isle Of Dogs møter vi den 12 år gamle gutten Atari Kobayashi, som jobber for den korrupte borgemesteren i byen. Når alle hundene i byen en dag blir beordret til å bli dumpet på et søppeldeponi på en øy, tar Atari saken i egne hender og begir seg ut i miniflyet sitt til Thrash Island for å redde vakthunden sin Spots.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori2
            };
            var nyFilm13 = new Filmer()
            {

                Navn = "Krypton",
                Bilde = ImageToArray("Krypton.jpg"),
                Beskrivelse = "Serien utspiller seg på den fiktive planeten Krypton rundt 200 år før Kal-El/Superman blir født, og før planeten blir ødelagt. Handlingen foregår rundt bestefaren til Kal-El, Seg-El, når han kjemper for rettferdighet på sin hjemmeplaneten sin.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori3
            };
            var nyFilm14 = new Filmer()
            {

                Navn = "Unsane",
                Bilde = ImageToArray("unsaneHorror.jpg"),
                Beskrivelse = "En ung kvinne blir tvangsinnlagt på psykiatrisk avdeling. Der blir hun tvunget til å møte sine største redsler - men er alt ekte eller er de bare oppspinn i fantasien hennes?",
                Pris = int.Parse("99"),
                Kategorier = nyKategori4
            };
            var nyFilm15 = new Filmer()
            {

                Navn = "Black Panther",
                Bilde = ImageToArray("BlackPanther.jpg"),
                Beskrivelse = "Etter hendelsene i 'Captain America: Civil War' reiser T'Challa tilbake til hjemlandet sitt, det isolerte, høyteknologiske afrikanske landet Wakanda, for å bli konge. Men når en gammel fiende dukker opp, må T'Challa, både som konge og Black Panther, vise sin styrke. Han blir dratt inn i en konflikt som ikke bare truer Wakandas skjebne, men også hele verden.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori1
            };
            var nyFilm16 = new Filmer()
            {

                Navn = "Friends",
                Bilde = ImageToArray("Friends.jpg"),
                Beskrivelse = "Three young men and three young women - of the BFF kind - live in the same apartment complex and face life and love in New York. They're not above sticking their noses into one another's businesses and swapping romantic partners, which always leads to the kind of hilarity average people will never experience - especially during breakups.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori2
            };
            var nyFilm17 = new Filmer()
            {

                Navn = "Prison Break",
                Bilde = ImageToArray("PrisonBreak.jpg"),
                Beskrivelse = "Lincoln Burrows blir dømt til døden for et mord han ikke har begått. Broren hans Michael Scofield planlegger i detalj hvordan han skal redde broren sin, og raner en bank for å havne i samme fengsel som ham. Redningen viser seg å bli vanskeligere og mer komplisert enn han tidligere trodde når han blir tvunget til å menge seg med noen av fengselets farligste menn.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori3
            };
            var nyFilm18 = new Filmer()
            {

                Navn = "Spider Man",
                Bilde = ImageToArray("SpiderMan.jpg"),
                Beskrivelse = "Fortsatt begeistret over opplevelsen med Avengers drar Peter hjem til tanten May, under tilsyn av mentoren Tony Stark. Han prøver å gjenoppta sine daglige rutiner, men kan ikke gi slipp på tanken om å utføre nye heltedåder. Når superskurken Vulture dukker opp, får han sjansen - samtidig som alt han holder kjært plutselig er i stor fare. Den unge Peter Parker, Spiderman, som gjorde en spektakulær debut i Captain America: Civil War, begynner å utforske sin nyfunne identitet som den nettsvingende superhelten i Spider Man: Homecoming.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori1
            };
            var nyFilm19 = new Filmer()
            {

                Navn = "Winchester - House Of Ghosts",
                Bilde = ImageToArray("Winchester-HouseOfGhosts.jpg"),
                Beskrivelse = "I et avsidesliggende område utenfor San Francisco ligger det mest hjemsøkte huset i verden. Det overdådige huset ble bygget av Sarah Winchester, arving av Winchester-formuen. Huset står der som et fengsel for flere hundre spøkelser, og det mest skrekkinngytende av dem har noe uoppgjort med familien Winchester.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori4
            };
            var nyFilm20 = new Filmer()
            {

                Navn = "Star Wars The Last Jedi",
                Bilde = ImageToArray("StarWarsTheLastJedi.jpg"),
                Beskrivelse = "Den episke Skywalker-sagaen fortsetter når heltene fra The Force Awakens forenes med de galaktiske legendene i et episk eventyr som åpner eldgamle mysterier om Kraften, og avdekker sjokkerende overraskelser fra fortiden.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori1
            };
            var nyFilm21 = new Filmer()
            {

                Navn = "Mad Max Fury Road",
                Bilde = ImageToArray("Mad_Max_Fury_Road.jpg"),
                Beskrivelse = "Den episke Skywalker-sagaen fortsetter når heltene fra The Force Awakens forenes med de galaktiske legendene i et episk eventyr som åpner eldgamle mysterier om Kraften, og avdekker sjokkerende overraskelser fra fortiden.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori1
            };
            var nyFilm22 = new Filmer()
            {

                Navn = "Iron Man",
                Bilde = ImageToArray("IronMan.jpg"),
                Beskrivelse = "Når den rike og supersmarte industrimannen Tony Stark tas til fange av fienden konstruerer han en høyteknologisk beskyttelsesdrakt for å kunne klare å fly. Nå er det hans oppdrag å redde verden som den unike helt han er skapt - ikke født til - å være.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori1
            };
            var nyFilm23 = new Filmer()
            {

                Navn = "Johnny English Strikes Again",
                Bilde = ImageToArray("JohnnyEnglish.jpg"),
                Beskrivelse = "Johnny English er tilbake i manesjen når en gruppe snikmordere må stoppes før de eliminerer en verdensleder og forårsaker globalt kaos. Han frykter ingenting og kjenner ingen smerte! På sitt eget katastrofale vis må han avsløre et nett av dobbeltagenter og konspirasjoner som tar ham fra KGB til CIA og MI-7. Konsekvensene blir mildt sagt ødeleggende.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori2
            };
            var nyFilm24 = new Filmer()
            {

                Navn = "The Hangover",
                Bilde = ImageToArray("TheHangover.jpg"),
                Beskrivelse = "The Wolfpack er tilbake og til tross for at de verken skal i bryllup eller utdrikningslag så kan absolutt alt gå galt. Når disse typene er på farten kan hva som helst skje!",
                Pris = int.Parse("99"),
                Kategorier = nyKategori2
            };
            var nyFilm25 = new Filmer()
            {

                Navn = "Borat",
                Bilde = ImageToArray("Borat.jpg"),
                Beskrivelse = "Den kazakhstanske tv-personligheten, granskende reporteren og superstjernen Borat Sagdiyev har blitt utsendt av regjeringen for å lage en reportasje om verdens beste land Amerika. Dette er den fascinerende reisen gjennom Amerikas forente stater gjennom Borats granskende lupe og forskende blikk. Vær så god!",
                Pris = int.Parse("99"),
                Kategorier = nyKategori2
            };
            var nyFilm26 = new Filmer()
            {

                Navn = "La La Land",
                Bilde = ImageToArray("LaLaLand.jpg"),
                Beskrivelse = "Sebastian og Mia møtes under hissig tuting i en trafikkork. Begge lever på sine håp i drømmenes by: LA. Sebastian forsøker å få folk til å bry seg om tradisjonell Jazz i det 21. århundret, Mia ønsker å bli skuespillerinne og klare bare én uforstyrret audition. Ingen av dem trodde at deres skjebnesvangre møte ville hjelpe dem til å ta sjanser de aldri kunne gjort på egenhånd.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori3
            };
            var nyFilm27 = new Filmer()
            {

                Navn = "Hidden Figures",
                Bilde = ImageToArray("HiddenFigures.jpg"),
                Beskrivelse = "Tre briljante kvinner som jobbet i NASA, og som var hjernene bak en av de største bragder i historien: oppskytingen av romfartøyet som fikk astronaut John Glenn som første amerikaner i bane rundt jorden. Det var en fantastisk prestasjon som fikk tilbake nasjonens tillit, snudde 'the Space Race' mot Sovjetunionen, og sjokkerte en hel verden. Den visjonære trioen trosset alle kjønns- og rasefordommer og inspirerte generasjoner til å drømme stort.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori3
            };
            var nyFilm28 = new Filmer()
            {

                Navn = "The Help",
                Bilde = ImageToArray("TheHelp.jpg"),
                Beskrivelse = "Niceville er en tidløs og inspirerende historie om mot, søsterskap og mulighet til forandring. I 60-årenes Mississippi forenes tre sterke kvinner i et hemmelig bokprosjekt som bryter med samfunnets uskrevne lover. Kvinnene utsetter seg for fare når de gir seg i kast med å beskrive hvordan det er å arbeide i de hvite overklassefamilienes hjem.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori3
            };
            var nyFilm29 = new Filmer()
            {

                Navn = "Get Out",
                Bilde = ImageToArray("GetOut.jpg"),
                Beskrivelse = "Chris og kjæresten Rose drar på helgebesøk til foreldrene hennes. Til å begynne med virker familien imøtekommende, men i løpet av helgen fører en rekke stadig mer bekymrende funn til noe verre enn han noensinne kunne forestille seg.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori4
            };
            var nyFilm30 = new Filmer()
            {

                Navn = "It Comes At Night",
                Bilde = ImageToArray("ItComesAtNight.jpg"),
                Beskrivelse = "En overnaturlig trussel terroriserer verden, og for å unnslippe trusselen har en familie flyttet til et forlatt hus i et avsidesliggende område. Faren gjør alt for å beskytte sin kone og sønnen deres mot det mystiske nærværet som terroriserer familien utenfor dørterskelen deres.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori4
            };
            var nyFilm31 = new Filmer()
            {

                Navn = "The Witch",
                Bilde = ImageToArray("TheWitch.jpg"),
                Beskrivelse = "Året er 1630 i New England. William og Katherine lever som gode kristne med sine fem barn på en gård i utkanten av en dyp og ugjennomtrengelig villmark. Når en nyfødt sønn sporløst forsvinner og avlingene lider av svikt spres det tvil og mistro i familien. The Witch er en skildring av en familie som rives i stykker av sin egen frykt og angst, og blir offer for ondskapen man ikke kan flykte fra.",
                Pris = int.Parse("99"),
                Kategorier = nyKategori4
            };

            var nyOrdre = new Ordrer()
            {
                OrdreDate = "20-12-2017",
                BrukereId = nyBruker,
                FilmerId = nyFilm
            };
            var ordrelist = new List<Ordrer>();
            ordrelist.Add(nyOrdre);
            var adminlist = new List<Adminer>();
            adminlist.Add(nyAdmin);

            var kategoriList = new List<Kategorier>();
            kategoriList.Add(nyKategori1);
            kategoriList.Add(nyKategori2);
            kategoriList.Add(nyKategori3);
            kategoriList.Add(nyKategori4);

            var filmList = new List<Filmer>();
            filmList.Add(nyFilm);
            filmList.Add(nyFilm1);
            filmList.Add(nyFilm2);
            filmList.Add(nyFilm3);
            filmList.Add(nyFilm4);
            filmList.Add(nyFilm5);
            filmList.Add(nyFilm6);
            filmList.Add(nyFilm7);
            filmList.Add(nyFilm8);
            filmList.Add(nyFilm9);
            filmList.Add(nyFilm10);
            filmList.Add(nyFilm11);
            filmList.Add(nyFilm12);
            filmList.Add(nyFilm13);
            filmList.Add(nyFilm14);
            filmList.Add(nyFilm15);
            filmList.Add(nyFilm16);
            filmList.Add(nyFilm17);
            filmList.Add(nyFilm18);
            filmList.Add(nyFilm19);
            filmList.Add(nyFilm20);
            filmList.Add(nyFilm21);
            filmList.Add(nyFilm22);
            filmList.Add(nyFilm23);
            filmList.Add(nyFilm24);
            filmList.Add(nyFilm25);
            filmList.Add(nyFilm26);
            filmList.Add(nyFilm27);
            filmList.Add(nyFilm28);
            filmList.Add(nyFilm29);
            filmList.Add(nyFilm30);
            filmList.Add(nyFilm31);


            context.Brukere.Add(nyBruker);

            context.Kategorier.AddRange(kategoriList);

            context.Filmer.AddRange(filmList);

            context.Ordrer.AddRange(ordrelist);
            context.Adminer.AddRange(adminlist);

            base.Seed(context);
        }

        public byte[] ImageToArray(string path)
        {
            var appDomain = System.AppDomain.CurrentDomain;

            var basePath = appDomain.BaseDirectory;

            Image img = Image.FromFile(Path.Combine(basePath, "Content", "Image", path));

            byte[] arr;
            using (MemoryStream ms = new MemoryStream())
            {
                img.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                arr = ms.ToArray();
            }
            return arr;
        }

        private static byte[] lagHash(string innPassord)
        {
            byte[] innData, utData;
            var algoritme = System.Security.Cryptography.SHA256.Create();
            innData = System.Text.Encoding.ASCII.GetBytes(innPassord);
            utData = algoritme.ComputeHash(innData);
            return utData;
        }



    }
}