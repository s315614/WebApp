$(function () {
    /* hentAlleNavn og bygg opp dropdown når siden lastes

    $.ajax({
        url: '/Home/hentAlleNavn',
        type: 'GET',
        dataType: 'json',
        success: function (jsKategor) {
            VisDropDown(jsKategor);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
    */
    alert("Trykk på (Filmer) for å liste ut filmene! Husk og vent i noen sekunder før listene vises");

    // opprett en hendelse på dropdown-listen når siden lastes

    $("#visfilmtabell").click(function () {
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
    });


    function visInfoDynamisk(bruker) {

        $("#visBrukere").html("");

        var htmlRow;

        $.each(film, function (i, item) {

           // var imgSrc = item.BildeTekst;
            htmlRow = [

                '<a data-toggle="modal" data-target="#' + item.Epost + '">',
                '<div class="col-xs-3 col-center-block">',
              //  '<img class="rounded-circle" src="' + imgSrc + '" alt="Generic placeholder image"/>',
                '<p></p>',
                '</div>',
                '</a>',

                '<div class="modal fade" id="' + item.Epost + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">',
                '<div class="modal-dialog" role="document">',
                '   <div class="modal-content">',
                '      <div class="modal-header">',
                '         <h3 class="modal-title" id="exampleModalLabel">' + item.Fornavn + '</h3>',
                '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">',
                '           <span aria-hidden="true">&times;</span>',
                '      </button>',
                ' </div>',
                '<div class="modal-body">',
              //  '   <img style="width:100%; height: 270px;" class="rounded-circle" src="' + item.BildeTekst + '" alt="Generic placeholder image">',
                '  <div>',
                '     <dl class="dl-horizontal">',
                '        <dt>',
                '           Fornavn',
                '      </dt>',
                '     <dd>',
                item.Fornavn,
                '   </dd>',

                '<dt>',
                '   Epost',
                ' </dt>',
                '<dd>',
                item.Epost,
                '</dd>',
                '<dt>',
                '   Etternavn',
                '</dt>',
                '<dd>',
                item.Etternavn,
                '</dd>',
                '<dt>',
                '   Adresse',
                ' </dt>',
                '<dd>',
                item.Adresse,
                '</dd>',
                '</dl>',
                ' </div>',
                ' </div>',
                '      <div class="modal-footer">',
                '           <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>',
                '<button type="button" class="btn btn-primary" onclick="toLogin()">Buy</button>',

                '         </div>',
                '      </div>',
                '   </div>',
                '</div>'
            ];

            $("#visFilmer").append(htmlRow.join(''));

        });


    }


    function visTabellBrukere(Brukere) {

        $("#visTabellBruker").html("");

        var htmlRowTop = '';

        htmlRowTop += '<table class="table"><thead class="thead-dark">';
        htmlRowTop += '<tr><th scope="col">Epost</th><th scope="col">Fornavn</th><th scope="col">Etternavn</th>';
        htmlRowTop += '<th scope="col">Addresse</th><th scope="col">Telefon</th><th scope="col"></th><th scope="col"></th>';
        htmlRowTop += '</tr></thead><tbody>';


        $.each(filmer, function (i, item) {


            htmlRowTop += '<tr>';
            htmlRowTop += '<td>' + item.Epost + '</td>';
            htmlRowTop += '<td>' + item.Fornavn + '</td>';
            htmlRowTop += '<td>' + item.Etternavn + '</td>';
            htmlRowTop += '<td>' + item.Adresse + '</td>';
           // htmlRowTop += '<td>' + item.Telefon + '</td>';
            htmlRowTop += '<td><button id="update">Edit</button></td>';
            htmlRowTop += '<td><button id="update">Delete</button></td>';


        });

        htmlRowTop += '</tbody></table>';

        $("#visTabellBruker").append(htmlRowTop);


    }

    function test() {
        alert("Du trykket på knappen");
    }


    function toLogin() {
        window.location = "/Home/Login/";
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