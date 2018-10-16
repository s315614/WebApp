using Gruppeoppgave1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1
{
    public class DBOrder
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
                    FilmId = k.FilmerId.Id,
                    FilmNavn = k.FilmerId.Navn

                }).ToList();

                return alleOrdre;
            }
        }
        public List<Order> hentOrderInnhold(string id)
        {
            using (var db = new DBContext())
            {

                List<Order> hentetOrdere = db.Ordrer.Where(k => k.BrukereId.Epost == id).Select(n => new Order
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
    }
}