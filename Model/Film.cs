using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1.Model
{
    public class Film
    {
        [Key]
        public int Id { get; set; }
        public string Navn { get; set; }
        public byte[] Bilde { get; set; }
        public string BildeTekst { get; set; }
        public string Beskrivelse { get; set; }
        public double Pris { get; set; }
        public string KategoriNavn { get; set; }
        public int KategoriId { get; set; }

    }
}