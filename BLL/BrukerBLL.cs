using Gruppeoppgave1.DAL;
using Gruppeoppgave1.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gruppeoppgave1.BLL
{
    public class BrukerBLL
    {

        public List<Bruker> alleBrukere()
        {
            var brukere = new BrukerDAL();
            return brukere.alleBrukere();

        }
        public List<Bruker> hentBrukerInnhold(string Epost)
        {
            var henteBrukerinfo = new BrukerDAL();
            return henteBrukerinfo.hentBrukerInnhold(Epost);
        }
        public bool lagreBruker(Bruker innBruker)
        {
            var lagreBrukerInfo = new BrukerDAL();
            return lagreBrukerInfo.lagreBruker(innBruker);
        }

        public bool slett(string epost)
        {
            var slettBruker = new BrukerDAL();
            return slettBruker.slett(epost);
        }

    }
    
}
