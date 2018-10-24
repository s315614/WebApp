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
    $("#add").click(function () {

        // bygg et js objekt fra input feltene
        var jsInn = {
            Epost: $("#epost").val(),
            Fornavn: $("#fornavn").val(),
            Etternavn: $("#etternavn").val(),
            Adresse: $("#adresse").val(),
            Passord: $("#passord").val(),
            Telefon: $("#telefon").val(),
            Fødselsdato: $("#fødselsdato").val()
           
        }
        

        $.ajax({
            url: '/Home/registerbruker',
            type: 'POST',
            data: JSON.stringify(jsInn),
            contentType: "application/json;charset=utf-8",
            success: function (ok) {
                show_data();
                alert("submit successfully");
                // kunne ha feilhåndtert evt. feil i registreringen her
                window.location.reload();
                // reload av vinduet må sje her altså etter at kallet har returnert
            },
            error: function (x, y, z) {
                alert("failed");
                //alert(x + '\n' + y + '\n' + z);
            }

        });

    })
    $("#searchBox1").change(function () {
        var id = $(this).val();
        $.ajax({
            url: '/Home/hentBrukerInneholder/' + id,
            type: 'GET',
            dataType: 'json',
            success: function (bruker) {
                visInfoDynamisk(bruker);
            },
            error: function (x, y, z) {
                //window.location.replace("/Home/AdminPage");
            }
        });
    });
    
    function visInfoDynamisk(bruker) {
        $("#visTabellBruker").html("");

        var htmlRowTop = '';

        htmlRowTop += '<table class="table table-striped table-bordered table-hover"><thead class="thead-dark">';
        htmlRowTop += '<tr><th scope="col">Epost</th><th scope="col">Fornavn</th><th scope="col">Etternavn</th>';
        htmlRowTop += '<th scope="col">Addresse</th><th scope="col">Telefon</th><th scope="col">Fødselsdato</th><th scope="col"></th><th scope="col"></th>';
        htmlRowTop += '</tr></thead><tbody>';


        $.each(bruker, function (i, item) {


            htmlRowTop += '<tr>';
            htmlRowTop += '<td>' + item.Epost + '</td>';
            htmlRowTop += '<td>' + item.Fornavn + '</td>';
            htmlRowTop += '<td>' + item.Etternavn + '</td>';
            htmlRowTop += '<td>' + item.Adresse + '</td>';
          //  htmlRowTop += '<td>' + item.PassordByte + '</td>';
            htmlRowTop += '<td>' + item.Telefon + '</td>';
            htmlRowTop += '<td>' + item.Fødselsdato + '</td>';
            htmlRowTop += '<td><button id="update">Edit</button></td>';
            htmlRowTop += '<td><button id="update" OnClick="RemoveBrukerButton_Click(' + item.Epost +')">Delete</button></td>';


        });

        htmlRowTop += '</tbody></table>';

        $("#visTabellBruker").append(htmlRowTop);
    }

    function visTabellBrukere(bruker) {

        $("#visTabellBruker").html("");

        var htmlRowTop = '';

        htmlRowTop += '<table class="table table-striped table-bordered table-hover"><thead class="thead-dark">';
        htmlRowTop += '<tr><th scope="col">Epost</th><th scope="col">Fornavn</th><th scope="col">Etternavn</th>';
        htmlRowTop += '<th scope="col">Addresse</th><th scope="col">Telefon</th><th scope="col">Fødselsdato</th><th scope="col"></th><th scope="col"></th>';
        htmlRowTop += '</tr></thead><tbody>';


        $.each(bruker, function (i, item) {


            htmlRowTop += '<tr>';
            htmlRowTop += '<td>' + item.Epost + '</td>';
            htmlRowTop += '<td>' + item.Fornavn + '</td>';
            htmlRowTop += '<td>' + item.Etternavn + '</td>';
            htmlRowTop += '<td>' + item.Adresse + '</td>';
          //  htmlRowTop += '<td>' + item.PassordByte + '</td>';
            htmlRowTop += '<td>' + item.Telefon + '</td>';
            htmlRowTop += '<td>' + item.Fødselsdato + '</td>';
            htmlRowTop += '<td><button id="update">Edit</button></td>';
            htmlRowTop += '<td><button id="update" OnClick="RemoveBrukerButton_Click('+item.Epost+')">Delete</button></td>';


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
function RemoveBrukerButton_Click(Epost) {
    window.location = "/Home/slett/" + Epost;
}