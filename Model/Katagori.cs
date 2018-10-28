using System.ComponentModel.DataAnnotations;

namespace Gruppeoppgave1.Model
{
    public class Katagori
    {
        [Key]
        public int KategoriId { get; set; }
        public string KatgoriNavn { get; set; }
        
    }
    

}