using Gruppeoppgave1.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1.DAL
{
    public class AdminerDALL
    {
        public List<Admin> alleAdminer()
        {
            using (var db = new DBContext())
            {
                List<Admin> alleAdminer = db.Adminer.Select(k => new Admin
                {
                    Id = k.Id,
                    Navn = k.Navn,
                    PassordByte = k.Passord,


                }).ToList();

                return alleAdminer;
            }
        }
        public List<Admin> hentAdminInnhold(string id)
        {
            using (var db = new DBContext())
            {

                List<Admin> hentetAdminer = db.Adminer.Where(k => k.Navn.Contains(id)).Select(n => new Admin
                {
                    Id = n.Id,
                    Navn = n.Navn,
                    PassordByte = n.Passord    //check if it goes
                    

                }).ToList();

                if (hentetAdminer.Count < 1)
                {
                    return null;
                }
                return hentetAdminer;
            }
        }
        public bool hentAdminInnholdPassordBrukernavn(Bruker innBruker)
        {
             byte[] passord = lagHash(innBruker.Passord);

            using (var db = new DBContext())
            {
                Adminer funnetAdmin = db.Adminer.FirstOrDefault(b => b.Navn == innBruker.Epost && b.Passord == passord);

                if (funnetAdmin == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
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


        public bool endreAdmin(Admin admin)
        {
            using (var db = new DBContext())
            {
                try
                {
                    var endreObjekt = db.Adminer.Find(admin.Id);
                    
                    endreObjekt.Navn = admin.Navn;

                    db.SaveChanges();
                }
                catch (Exception feil)
                {
                    return false;
                }
                return true;
            }
        }


        public bool slettAdmin(int id)
        {
            using (var db = new DBContext())
            {
                try
                {
                    var slettObjekt = db.Adminer.Find(id);
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