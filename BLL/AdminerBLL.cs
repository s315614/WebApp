using Gruppeoppgave1.DAL;
using Gruppeoppgave1.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1.BLL
{
    public class AdminerBLL
    {
        public List<Admin> alleAdminer()
        {
            var adminDAL = new AdminerDAL();
            return adminDAL.alleAdminer();
        }

        public bool lagreAdmin(Admin innAdmin)
        {
            var Adminlagre = new AdminerDAL();
            return Adminlagre.lagreAdmin(innAdmin);
           
        }


        public bool slett(string Navn)
        {
            var slettAdmin = new AdminerDAL();
            return slettAdmin.slett(Navn);
        }

    }
}