using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1.Models
{
    public class Order
    {
        [Key]
        public int OrdrerId { get; set; }
        public string OrdreDate { get; set; }

        public string FilmNavn { get; set; }
       public double FilmPris { get; set; }
       public string FilmKategori { get; set; }
        public string BrukerId { get; set; }

        public int FilmId { get; set; }

    }
}