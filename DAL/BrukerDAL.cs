using Gruppeoppgave1.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity.Infrastructure;

namespace Gruppeoppgave1.DAL
{
    public class BrukerDAL
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
        public List<Bruker> hentBrukerInnhold(string id)
        {
            using (var db = new DBContext())
            {

                List<Bruker> hentetBrukere = db.Brukere.Where(k => k.Fornavn.Contains(id)).Select(n => new Bruker
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

        public Bruker finnBrukerMedTelefon(int telefon)
        {
            var telefonString = telefon.ToString();
            using (var db = new DBContext())
            {
                Brukere hentetbruker = db.Brukere.FirstOrDefault(k => k.Telefon == telefonString);

                if (hentetbruker == null)
                {
                    return null;
                }

                var bruker = new Bruker()
                {
                    Epost = hentetbruker.Epost,
                    Fornavn = hentetbruker.Fornavn,
                    Etternavn = hentetbruker.Etternavn,
                    Adresse = hentetbruker.Adresse,
                    PassordByte = hentetbruker.Passord,
                    Telefon = hentetbruker.Telefon,
                    Fødselsdato = hentetbruker.Fødselsdato
                };
              

                return bruker;



            };

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
          
      
        public bool slettBruker(string id)
        {
            using (var db = new DBContext())
            {
                try
                {
                    var slettObjekt = db.Brukere.Find(id);
      

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


        public bool bruker_i_db(Bruker innBruker)
        {
            using (var db = new DBContext())
            {
                byte[] passord = lagHash(innBruker.Passord);
                Brukere funnetBruker = db.Brukere.FirstOrDefault
                    (b => b.Epost == innBruker.Epost && b.Passord == passord);


                if (funnetBruker == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }
      
        public Bruker hentEnBruker(string id)
        {
            var db = new DBContext();

            var enBrukerDB = db.Brukere.Find(id);

            if (enBrukerDB == null)
            {
                return null;
            }
            else
            {
                var utBruker = new Bruker()
                {
                    Epost = enBrukerDB.Epost,
                    Fornavn = enBrukerDB.Fornavn,
                    Etternavn = enBrukerDB.Etternavn,
                    Adresse = enBrukerDB.Adresse,
                    PassordByte = enBrukerDB.Passord,
                    Telefon = enBrukerDB.Telefon,
                    Fødselsdato = enBrukerDB.Fødselsdato
                };
                return utBruker;
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
