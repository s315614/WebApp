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
     //   DBContext db = new DBContext();
        public bool lagreAdmin(Admin innAdmin)
        {
           /* var nyAdmin = new Adminer
            {
                Navn = innAdmin.Navn,
                Passord = innAdmin.PassordByte
            };
            try
            {
                db.Adminer.Add(nyAdmin);
                db.SaveChanges();
            }
            catch(Exception feil)
            {
                return false;
            }
            return true; */
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





        public bool slett(int id)
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