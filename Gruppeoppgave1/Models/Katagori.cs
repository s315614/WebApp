using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace Gruppeoppgave1.Models
{
    public class Katagori
    {
        [Key]
        public int KategoriId { get; set; }
        public string KatgoriNavn { get; set; }
        
    }
    

}