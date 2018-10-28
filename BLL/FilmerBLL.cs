using Gruppeoppgave1.DAL;
using Gruppeoppgave1.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1.BLL
{
    public class FilmerBLL
    {
        public List<Film> alleFilmer()
        {
            var totalFilmer = new FilmerDAL();
            return totalFilmer.alleFilmer();
        }


        public bool lagreFilm(Film lagreFilm)
        {
            var filmLagre = new FilmerDAL();
            return filmLagre.lagreFilm(lagreFilm);
        }

        public Film hentFilm(int? id)
        {
            var filmHent = new FilmerDAL();
            return filmHent.hentFilm(id);
        }

        public Film hentFilmNavn(string id)
        {
            var navnHent = new FilmerDAL();
            return navnHent.hentFilmNavn(id);
        }

        public List<Film> hentFilmInnhold(string id)
        {
            var filmInnholdHent = new FilmerDAL();
            return filmInnholdHent.hentFilmInnhold(id);
        }

        public List<Film> hentFilmKategori(int id)
        {
            var filmKategoriHent = new FilmerDAL();
            return filmKategoriHent.hentFilmKategori(id);
        }

        public bool slett(int id)
        {
            var slettFilm = new FilmerDAL();
            return slettFilm.slett(id);
        }

    }

}
