using Gruppeoppgave1.DAL;
using Gruppeoppgave1.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gruppeoppgave1.BLL
{
        public class DatabaseLogikk
        {
            //Admin
            public List<Admin> alleAdminer()
            {
                var adminDal = new AdminerDALL();

                return adminDal.alleAdminer();

            }

            public List<Admin> hentAdminInnhold(string id)
            {
                var adminDal = new AdminerDALL();
                return adminDal.hentAdminInnhold(id);

            }

            public bool lagreAdmin(Admin innAdmin)
            {
                var adminDal = new AdminerDALL();
                return adminDal.lagreAdmin(innAdmin);
            }

            public bool endreAdmin(Admin admin)
            {
                var adminDal = new AdminerDALL();
                return adminDal.endreAdmin(admin);
            }

            public bool slettAdmin(int id)
            {
                var adminDal = new AdminerDALL();
                return adminDal.slettAdmin(id);
            }

        public bool hentAdminInnholdPassordBrukernavn(Bruker innBruker)
        {
            var adminDal = new AdminerDALL();
            return adminDal.hentAdminInnholdPassordBrukernavn(innBruker);
        }

            //Bruker

            public List<Bruker> alleBrukere()
            {
                var brukerDal = new BrukerDAL();
                return brukerDal.alleBrukere();
            }

            public List<Bruker> hentBrukerInnhold(string id)
            {
                var brukerDal = new BrukerDAL();
                return brukerDal.hentBrukerInnhold(id);
            }

            public Bruker finnBrukerMedTelefon(int telefon)
            {
                var brukerDal = new BrukerDAL();
                return brukerDal.finnBrukerMedTelefon(telefon);
            }

            public bool lagreBruker(Bruker innBruker)
            {
                var brukerDal = new BrukerDAL();
                return brukerDal.lagreBruker(innBruker);
            }

        public bool bruker_i_db(Bruker innBruker)
        {
            var brukerDal = new BrukerDAL();
            return brukerDal.bruker_i_db(innBruker);
        }

            public bool slettBruker(string id)
            {
            var brukerDal = new BrukerDAL();
                return brukerDal.slettBruker(id);
            }

            public Bruker hentEnBruker(string id)
            {
                var brukerDal = new BrukerDAL();
                return brukerDal.hentEnBruker(id);
            }

            //Film
            public List<Film> alleFilmer()
            {
                var filmerDal = new FilmerDAL();
                return filmerDal.alleFilmer();
            }

            public bool lagreFilm(Film lagreFilm)
            {
                var filmerDal = new FilmerDAL();
                return filmerDal.lagreFilm(lagreFilm);
            }

            public Film hentFilm(int? id)
            {
                var filmerDal = new FilmerDAL();
                return filmerDal.hentFilm(id);
            }

            public Film hentFilmNavn(string id)
            {
                var filmerDal = new FilmerDAL();
                return filmerDal.hentFilmNavn(id);
            }

            public List<Film> hentFilmInnhold(string id)
            {
                var filmerDal = new FilmerDAL();
                return filmerDal.hentFilmInnhold(id);
            }

            public List<Film> hentFilmKategori(int id)
            {
                var filmerDal = new FilmerDAL();
                return filmerDal.hentFilmKategori(id);
            }

            public bool slettFilm(int id)
            {
                var filmerDal = new FilmerDAL();
                return filmerDal.slettFilmer(id);
            }

            //Kategori
            public List<Katagori> AlleKategorier()
            {
                var kategoriDal = new KategoriDAL();
                return kategoriDal.AlleKategorier();
            }

            public Katagori hentkategori(int id)
            {
                var kategoriDal = new KategoriDAL();
                return kategoriDal.hentkategori(id);
            }

            //Order
            public List<Order> alleOrdre()
            {
                var orderDal = new OrderDAL();
                return orderDal.alleOrdre();
            }

            public List<Order> hentOrderInnhold(string id)
            {
                var orderDal = new OrderDAL();
                return orderDal.hentOrderInnhold(id);
            }

            public bool lagreOrdre(Order lagerorder)
            {
                var orderDal = new OrderDAL();
                return orderDal.lagreOrdre(lagerorder);
            }

            public bool slettOrder(int id)
            {
                var orderDal = new OrderDAL();
                return orderDal.slettOrder(id);
            }





        }
    }


