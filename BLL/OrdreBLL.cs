using Gruppeoppgave1.DAL;
using Gruppeoppgave1.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1.BLL
{
    public class OrdreBLL
    {
        public List<Order> alleOrdre()
        {
            var ordreAlle = new OrdreDAL();
            return ordreAlle.alleOrdre();
        }

        public List<Order> hentOrderInnhold(string id)
        {
            var ordreInnhold = new OrdreDAL();
            return ordreInnhold.hentOrderInnhold(id);
        }
    }
}