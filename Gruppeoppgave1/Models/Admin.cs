using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1.Models
{
    public class Admin
    {
        [Key]
        [RegularExpression(@"[A-Za-zøæåØÆÅ]{2,50}",
        ErrorMessage = "Ugyldig Navn")]
        [Required(ErrorMessage = "Fornavn må oppgis")]
        [Display(Name = "Navn")]
        public string Navn { get; set; }

        [Display(Name = "Passord")]
        [Required(ErrorMessage = "Passord må oppgis")]
        [RegularExpression(@"[A-Za-zøæåØÆÅ0-9._%+-]{6,50}",
        ErrorMessage = "Passordet må være minst 6 karakterer")]
        [DataType(DataType.Password)]
        public string Passord { get; set; }

        public byte[] PassordByte { get; set; }
    }
}