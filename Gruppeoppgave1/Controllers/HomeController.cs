using Gruppeoppgave1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Gruppeoppgave1.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            
            if (Session["LoggetInn"] != null)
            {

                bool loggetInn = (bool)Session["LoggetInn"];
                if (loggetInn)
                {
                    return RedirectToAction("MainPage");
                }
            }
            

            var db = new DBFilmer();
            List<Film> alleFilmer = db.alleFilmer();
            return View(alleFilmer);

        }
      

        public ActionResult Login()
        {
            if (Session["Registrert"] != null)
            {
                bool fraRegistrert = (bool)Session["Registrert"];
                if (fraRegistrert)
                {
                    ViewBag.registrert = true;
                }
            }
            else
                ViewBag.registrert = false;

            if (Session["LoggetInn"] != null)
            {

                bool loggetInn = (bool)Session["LoggetInn"];
                
                if (loggetInn)
                {
                    return RedirectToAction("MainPage");
                }
            }

            Session["Registrert"] = false;
            ViewBag.feilBrukernavnPassord = false;
            return View();

        }


        [HttpPost]
        public ActionResult Login(Bruker innBruker)
        {
            if (Bruker_i_DB(innBruker))
            {
                Session["LoggetInn"] = true;
                Session["BrukerId"] = innBruker.Epost;
                return RedirectToAction("MainPage", "Home");
            }

            Session["LoggetInn"] = false;
            ViewBag.feilBrukernavnPassord = true;
            return View();

        }



        public ActionResult Registry()
        {
            ViewBag.finnesAllerede = false;
            return View();
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult Registry(Bruker innBruker)
        {
            ViewBag.finnesAllerede = false;
            var db = new DBBruker();
            bool OK = db.lagreBruker(innBruker);
            if (OK)
            {
                Session["Registrert"] = true;
                return RedirectToAction("Login");
            }

            ViewBag.finnesAllerede = true;
            ViewBag.ikkelagret = true;
            return View();

        }

        public ActionResult MainPage()
        {
            string epost = (string)Session["BrukerId"];

            if (Session["LoggetInn"] != null)
            {
                bool loggetInn = (bool)Session["LoggetInn"];
                if (loggetInn)
                {
                    var db = new DBFilmer();
                    List<Film> alleFilmer = db.alleFilmer();
                    ViewBag.message =  epost;
                    return View(alleFilmer);
                }
            }

            return RedirectToAction("Index");

        }

        public ActionResult ListProfile()
        {
            string epost = (string)Session["BrukerId"];

            if (Session["LoggetInn"] != null)
            {
                bool loggetInn = (bool)Session["LoggetInn"];
                if (loggetInn)
                {
                    var db = new DBOrder();
                    List<Order> alleOrdere = db.hentOrderInnhold(epost);
                    if(alleOrdere == null)
                    {
                        alleOrdere = new List<Order>();
                        return View(alleOrdere);
                    }
                    return View(alleOrdere);
                }
            }

            return RedirectToAction("Index");
           
        }

        public ActionResult Payment(int? Id)
        {
            if (Session["LoggetInn"] != null && Id != null)
            {
                bool loggetInn = (bool)Session["LoggetInn"];
                if (loggetInn)
                {
                    string epost = (string)Session["BrukerId"];
                    var db = new DBFilmer();
                    Film funnetFilm = db.hentFilm(Id);
                    if (funnetFilm == null)
                    {
                        return RedirectToAction("MainPage");
                    }
                    else
                    {
                        funnetFilm.BildeTekst = convertByteToImage(funnetFilm.Bilde);
                        ViewBag.message = epost;
                        return View(funnetFilm);

                    };
                }

            }

            return RedirectToAction("Index");

           

           
        }

        [HttpPost]
        public ActionResult Payment(Film innfilm)
        {

            string epost = (string)Session["BrukerId"];

            using (var db = new DBContext())
            {
                var order = new Ordrer();
                var filmer = db.Filmer.FirstOrDefault(b => b.Id == innfilm.Id);
                var brukere = db.Brukere.FirstOrDefault(b => b.Epost == epost);

                DateTime date = DateTime.Now;

                order.OrdreDate = date.ToString();
                order.BrukereId = brukere;
                order.FilmerId = filmer;

                db.Ordrer.Add(order);

                Session["payment"] = false;
                db.SaveChanges();

            }
       

            return RedirectToAction("MainPage");
        }

    
        public ActionResult Loggut()
        {
            Session["LoggetInn"] = false;
            Session["BrukerId"] = null;


            return RedirectToAction("Index");
        }


            private static bool Bruker_i_DB(Bruker innBruker)
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

        public string hentFilmInneholder(string id)
        {
            var db = new DBFilmer();

            List<Film> enFilm = db.hentFilmInnhold(id);

            if (enFilm == null)
            {
                return null;
            }

            foreach (var film in enFilm)
            {
                film.BildeTekst = convertByteToImage(film.Bilde);
            }

            var jsonSerializer = new JavaScriptSerializer();
            jsonSerializer.MaxJsonLength = Int32.MaxValue;
            string json = jsonSerializer.Serialize(enFilm);
            return json;
        }


        public string convertByteToImage(Byte[] image)
        {
            var base64 = Convert.ToBase64String(image);
            var imgSrc = String.Format("data:image/jpg;base64,{0}", base64);

            return imgSrc;
        }

        public string hentAlleNavn()
        {
            var db = new DBKategori();
            List<Katagori> alleKategorier = db.AlleKategorier();
            var alleNavn = new List<jsKategor>();
            foreach (Katagori k in alleKategorier)
            {
                var ettNavn = new jsKategor();
                ettNavn.KategoriId = k.KategoriId;
                ettNavn.KatgoriNavn = k.KatgoriNavn;

                alleNavn.Add(ettNavn);
            }
            var jsonSerializer = new JavaScriptSerializer();
            string json = jsonSerializer.Serialize(alleNavn);
            return json;
        }
        public string hentKatinfo(int id)
        {
            var db = new DBFilmer();
            List<Film> alleFilmerKategori = db.hentFilmKategori(id);

            if (alleFilmerKategori == null)
            {
                return null;
            }

            foreach (var film in alleFilmerKategori)
            {
                film.BildeTekst = convertByteToImage(film.Bilde);
            }


            var jsonSerializer = new JavaScriptSerializer();
            jsonSerializer.MaxJsonLength = Int32.MaxValue;
            string json = jsonSerializer.Serialize(alleFilmerKategori);
            return json;
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
