using Gruppeoppgave1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1
{
    public class DBBruker
    {
     
        public bool lagreBruker(Bruker innBruker)
        {

            using (var db = new DBContext())
            {
                try
                {
                    var nyBrukerRad = new Brukere();
                    byte[] passord = lagHash(innBruker.Passord);

                    nyBrukerRad.Epost = innBruker.Epost;
                    nyBrukerRad.Fornavn = innBruker.Fornavn;
                    nyBrukerRad.Etternavn = innBruker.Etternavn;

                    nyBrukerRad.Adresse = innBruker.Adresse;
                    nyBrukerRad.Telefon = innBruker.Telefon;
                    nyBrukerRad.Fødselsdato = innBruker.Fødselsdato;
                    nyBrukerRad.Passord = passord;

                    db.Brukere.Add(nyBrukerRad);
                    db.SaveChanges();
                    return true;

                }
                catch (Exception feil)
                {
                    return false;
                }
            }
        }

        



        public bool slett(string epost)
        {
            using (var db = new DBContext())
            {
                try
                {
                    var slettObjekt = db.Brukere.Find(epost);
                    db.Brukere.Remove(slettObjekt);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception feil)
                {
                    return false;
                }
            }
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
