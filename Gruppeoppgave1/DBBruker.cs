using Gruppeoppgave1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1
{
    public class DBBruker
    {

        public List<Bruker> alleBrukere()
        {
            using (var db = new DBContext())
            {
                List<Bruker> alleBrukere = db.Brukere.Select(k => new Bruker
                {
                    Epost =  k.Epost,
                    Fornavn = k.Fornavn,
                    Etternavn = k.Etternavn,
                    Adresse = k.Adresse,
                    Fødselsdato = k.Fødselsdato,
                    PassordByte = k.Passord,
                    Telefon = k.Telefon
 
                }).ToList();

                return alleBrukere;
            }
        }
        public List<Bruker> hentBrukerInnhold(string Epost)
        {
            using (var db = new DBContext())
            {

                List<Bruker> hentetBrukere = db.Brukere.Where(k => k.Fornavn.Contains(Epost)).Select(n => new Bruker
                {
                    Epost = n.Epost,
                    Fornavn = n.Fornavn,
                    Etternavn = n.Etternavn,
                    Adresse = n.Adresse,
                    PassordByte = n.Passord,    //check if it goes
                    Telefon = n.Telefon,
                    Fødselsdato = n.Fødselsdato

                }).ToList();

                if (hentetBrukere.Count < 1)
                {
                    return null;
                }
                return hentetBrukere;
            }
        }
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
