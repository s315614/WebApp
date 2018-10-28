using Gruppeoppgave1.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1.DAL
{
    public class OrderDAL
    {
        public List<Order> alleOrdre()
        {
            using (var db = new DBContext())
            {
                List<Order> alleOrdre = db.Ordrer.Select(k => new Order
                {
                    OrdrerId = k.OrdrerId,
                    OrdreDate = k.OrdreDate,
                    BrukerId = k.BrukereId.Epost,
                    FilmNavn = k.FilmerId.Navn
                    

                }).ToList();

                return alleOrdre;
            }
        }
        public List<Order> hentOrderInnhold(string id)
        {
            using (var db = new DBContext())
            {
                List<Order> hentetOrdere = db.Ordrer.Where(k => k.BrukereId.Epost.Contains(id)).Select(n => new Order
                {
                    OrdrerId = n.OrdrerId,
                    OrdreDate = n.OrdreDate,
                    FilmId = n.FilmerId.Id,
                    BrukerId = n.BrukereId.Epost,
                    FilmNavn = n.FilmerId.Navn,
                    FilmKategori = n.FilmerId.Kategorier.KatgoriNavn,
                    FilmPris = n.FilmerId.Pris

                }).ToList();

                if (hentetOrdere.Count < 1)
                {
                    return null;
                }
                return hentetOrdere;
            }
        }
        public bool lagreOrdre(Order lagerorder)
        {

            using (var db = new DBContext())
            {
                try
                {
                    var nyOrdreRad = new Ordrer();
                    var BrukeretterId = db.Brukere.Find(lagerorder.BrukerId);   //problem med aksepteres Epost
                    var FilmetterId = db.Filmer.Find(lagerorder.FilmId);        //problem med aksepteres Id

                    nyOrdreRad.OrdreDate = lagerorder.OrdreDate;
                    nyOrdreRad.BrukereId = BrukeretterId;
                    nyOrdreRad.FilmerId = FilmetterId;
                   
                    db.Ordrer.Add(nyOrdreRad);
                    db.SaveChanges();
                    return true;

                }
                catch (Exception feil)
                {
                    return false;
                }
            }
        }

        public bool slettOrder(int id)
        {
            using (var db = new DBContext())
            {
                try
                {
                    var slettObjekt = db.Ordrer.Find(id);
                    db.Ordrer.Remove(slettObjekt);
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