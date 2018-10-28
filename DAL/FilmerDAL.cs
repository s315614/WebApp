using Gruppeoppgave1.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1.DAL
{
    public class FilmerDAL
    {
        public List<Film> alleFilmer()
        {
            using (var db = new DBContext())
            {
                List<Film> alleFilmer= db.Filmer.Select(k => new Film
                {
                    Id = k.Id,
                    Navn = k.Navn,
                    Bilde = k.Bilde,
                    Beskrivelse = k.Beskrivelse,
                    Pris = k.Pris,
                    KategoriNavn = k.Kategorier.KatgoriNavn

                }).ToList();

                return alleFilmer;
            }
        }


        public bool lagreFilm(Film lagreFilm)
        {

            using (var db = new DBContext())
            {
                try
                {
                    var nyFilmRad = new Filmer();
                    var KategoriEtterId = db.Kategorier.Find(lagreFilm.KategoriId);


                    nyFilmRad.Navn = lagreFilm.Navn;
                    nyFilmRad.Bilde = lagreFilm.Bilde;

                    nyFilmRad.Beskrivelse = lagreFilm.Beskrivelse;
                    nyFilmRad.Pris = lagreFilm.Pris;
                    nyFilmRad.Kategorier = KategoriEtterId;


                    db.Filmer.Add(nyFilmRad);
                    db.SaveChanges();
                    return true;

                }
                catch (Exception feil)
                {
                    return false;
                }
            }
        }

        public Film hentFilm(int? id)
        {
            using (var db = new DBContext())
            {
                Filmer enFilm = db.Filmer.Find(id);
                var hentetFilm = new Film()
                {
                    Navn = enFilm.Navn,
                Bilde = enFilm.Bilde,

                Beskrivelse = enFilm.Beskrivelse,
                Pris = enFilm.Pris
            };

                return hentetFilm;
            }
        }

        public Film hentFilmNavn(string id)
        {
            using (var db = new DBContext())
            {
                Filmer enFilm = db.Filmer.FirstOrDefault(k => k.Navn == id);
                //Filmer enFilm = db.Filmer.Find(id);


                if (enFilm == null)
                {
                    return null;
                }
                var hentetFilm = new Film()
                {
                    Navn = enFilm.Navn,
                    Beskrivelse = enFilm.Beskrivelse,
                    Bilde = enFilm.Bilde,

                    Id = enFilm.Id,
                    KategoriNavn = enFilm.Kategorier.KatgoriNavn,
                    Pris = enFilm.Pris

                };

                return hentetFilm;
            }
        }

        public List<Film> hentFilmInnhold(string id)
        {
            using (var db = new DBContext())
            {

                List<Film> hentetFilmer = db.Filmer.Where(k => k.Navn.Contains(id)).Select(n => new Film
                {
                    Navn = n.Navn,
                    Id = n.Id,
                    Beskrivelse = n.Beskrivelse,
                    Bilde = n.Bilde,
                    KategoriNavn = n.Kategorier.KatgoriNavn,
                    Pris = n.Pris

                }).ToList();

                if (hentetFilmer.Count < 1)
                {
                    return null;
                }
                return hentetFilmer;
            }
        }

        public List<Film> hentFilmKategori(int id)
        {
            using (var db = new DBContext())
            {

                List<Film> hentetFilmer = db.Filmer.Where(k => k.Kategorier.KategoriId == id).Select(n => new Film
                {
                    Navn = n.Navn,
                    Id = n.Id,
                    Beskrivelse = n.Beskrivelse,
                    Bilde = n.Bilde,
                    KategoriNavn = n.Kategorier.KatgoriNavn,
                    Pris = n.Pris

                }).ToList();

                if (hentetFilmer.Count < 1)
                {
                    return null;
                }
                return hentetFilmer;
            }
        }



        public bool slett(int id)
        {
            using (var db = new DBContext())
            {
                try
                {
                    var slettObjekt = db.Filmer.Find(id);
                    db.Filmer.Remove(slettObjekt);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception feil)
                {
                    return false;
                }
            }
        }









    }



}
