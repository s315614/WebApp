using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;


namespace Gruppeoppgave1.Model
{
    public class Katagori
    {
        [Key]
        public int KategoriId { get; set; }
        public string KatgoriNavn { get; set; }
        
    }
    

}