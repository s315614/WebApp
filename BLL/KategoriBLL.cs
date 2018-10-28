using Gruppeoppgave1.DAL;
using Gruppeoppgave1.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1.BLL
{
    public class KategoriBLL
    {
        public List<Katagori> AlleKategorier()
        {
            var kategorierAlle = new KategoriDAL();
            return kategorierAlle.AlleKategorier();
        }

        public Katagori hentkategori(int id)
        {
            var kategoriHent = new KategoriDAL();
            return kategoriHent.hentkategori(id);
        }
    }
}