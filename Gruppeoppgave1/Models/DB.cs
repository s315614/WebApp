using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1.Models
{
    public class DB : DbContext
    {
        public DB()
            : base("name:kunde")
        {
            Database.CreateIfNotExists();
        }
        public DbSet<Kunde> Kunder { get;}
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
           
        }
    }
}