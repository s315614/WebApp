$(function () {
    
   // alert("Trykk på (Bruker) for å liste ut Brukere! Husk og vent i noen sekunder før listene vises");

    // opprett en hendelse på dropdown-listen når siden lastes

    $("#visbrukertabell").click(function () {
        // var id = $(this).val();

        $.ajax({
            url: '/Home/hentAlleBrukere/',
            type: 'GET',
            dataType: 'json',
            success: function (Home) {
                visTabellBrukere(Home);
                
            },
            error: function (x, y, z) {
                
                alert("Kunne ikke hente Data");
            }
        });
    })


    


    function visTabellBrukere(bruker) {

        $("#visTabellBruker").html("");

        var htmlRowTop = '';

        htmlRowTop += '<table class="table table-striped table-bordered table-hover"><thead class="thead-dark">';
        htmlRowTop += '<tr><th scope="col">Epost</th><th scope="col">Fornavn</th><th scope="col">Etternavn</th>';
        htmlRowTop += '<th scope="col">Addresse</th><th scope="col">Passord</th><th scope="col">Telefon</th><th scope="col">Fødselsdato</th><th scope="col"></th><th scope="col"></th>';
        htmlRowTop += '</tr></thead><tbody>';


        $.each(bruker, function (i, item) {


            htmlRowTop += '<tr>';
            htmlRowTop += '<td>' + item.Epost + '</td>';
            htmlRowTop += '<td>' + item.Fornavn + '</td>';
            htmlRowTop += '<td>' + item.Etternavn + '</td>';
            htmlRowTop += '<td>' + item.Adresse + '</td>';
            htmlRowTop += '<td>' + item.Passord + '</td>';
            htmlRowTop += '<td>' + item.Telefon + '</td>';
            htmlRowTop += '<td>' + item.Fødselsdato + '</td>';
            htmlRowTop += '<td><button id="update">Edit</button></td>';
            htmlRowTop += '<td><button id="update">Delete</button></td>';


        });

        htmlRowTop += '</tbody></table>';

        $("#visTabellBruker").append(htmlRowTop);


    }

   

    function VisDropDown(jsKategorier) {
        var utStreng = "";

        utStreng += "<option>Velg kategori</option>";
        for (var i in jsKategorier) {
            utStreng += "<option value='" + jsKategorier[i].KategoriId + "'>" + jsKategorier[i].KatgoriNavn + "</option>";
        }
        $("#drop").append(utStreng);
    }

})