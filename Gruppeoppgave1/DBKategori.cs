using Gruppeoppgave1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1
{
    public class DBKategori
    {
        public List<Katagori> AlleKategorier()
        {
            using (var db = new DBContext())
            {
                List<Katagori> AlleKategorier = db.Kategorier.Select(k => new Katagori
                {
                    KategoriId = k.KategoriId,
                    KatgoriNavn = k.KatgoriNavn


                }).ToList();

                return AlleKategorier;
            }
        }
        public Katagori hentkategori(int id)
        {
            DBContext db = new DBContext();
            //Kategorier enDBKat = db.Kategorier.Find(KategoriId);
            Kategorier enDBKat = db.Kategorier.FirstOrDefault(k=> k.KategoriId == id);

            var enKat = new Katagori()
            {
                KategoriId = enDBKat.KategoriId,
                KatgoriNavn = enDBKat.KatgoriNavn
                
            };
            return enKat;
        }
    }
}