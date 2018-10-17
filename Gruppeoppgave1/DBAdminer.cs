using Gruppeoppgave1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1
{
    public class DBAdminer
    {
        public List<Admin> alleAdminer()
        {
            using (var db = new DBContext())
            {
                List<Admin> alleAdminer = db.Adminer.Select(k => new Admin
                {
                    Navn = k.Navn,
                    PassordByte = k.Passord,
                    

                }).ToList();

                return alleAdminer;
            }
        }

        public bool lagreAdmin(Admin innAdmin)
        {

            using (var db = new DBContext())
            {
                try
                {
                    var nyAdminRad = new Adminer();
                    byte[] passord = lagHash(innAdmin.Passord);

                   
                    nyAdminRad.Navn = innAdmin.Navn;
                   
                    nyAdminRad.Passord = passord;

                    db.Adminer.Add(nyAdminRad);
                    db.SaveChanges();
                    return true;

                }
                catch (Exception feil)
                {
                    return false;
                }
            }
        }





        public bool slett(string Navn)
        {
            using (var db = new DBContext())
            {
                try
                {
                    var slettObjekt = db.Adminer.Find(Navn);
                    db.Adminer.Remove(slettObjekt);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception feil)
                {
                    return false;
                }
            }
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