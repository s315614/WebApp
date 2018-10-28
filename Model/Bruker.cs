using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1.Model
{
    public class Bruker
    {
        [Key]
        [Required(ErrorMessage = "Epost må oppgis")]
        [Display(Name = "Epost")]
        [RegularExpression(@"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}",
        ErrorMessage = "Ugyldig epost adresse")]
        [DataType(DataType.EmailAddress)]
        public string Epost { get; set; }
        [RegularExpression(@"[A-Za-z]{2,50}",
        ErrorMessage = "Ugyldig Navn")]
        [Required(ErrorMessage = "Fornavn må oppgis")]
        [Display(Name = "Fornavn")]
        public string Fornavn { get; set; }
        [RegularExpression(@"[A-Za-z]{2,50}",
        ErrorMessage = "Ugyldig Navn")]
        [Required(ErrorMessage = "Etternavn må oppgis")]
        [Display(Name = "Etternavn")]
        public string Etternavn { get; set; }
        public string Adresse { get; set; }
        [Display(Name = "Passord")]
        [Required(ErrorMessage = "Passord må oppgis")]
        [RegularExpression(@"[A-Åa-å0-9._%+-]{6,50}",
        ErrorMessage = "Passordet må være minst 6 karakterer")]
        [DataType(DataType.Password)]
        public string Passord { get; set; }
        [Display(Name = "Telefon")]
        [Required(ErrorMessage = "Telefonnummer må oppgis")]
        [RegularExpression(@"[0-9]{8}", ErrorMessage = "Telefonnummer må være 8 siffer")]
        public string Telefon { get; set; }
        [Display(Name = "Fødselsdato")]
        [Required(ErrorMessage = "Fødselsdato må oppgis")]
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        //[MinimumAge(18)]

        public string Fødselsdato { get; set; }
        public byte[] PassordByte { get; set; }
    }
}