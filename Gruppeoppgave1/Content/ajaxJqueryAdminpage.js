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
            url: '/Home/hentAlleFilmer/',
            type: 'GET',
            dataType: 'json',
            success: function (Home) {
                visTabellFilmer(Home);
                //alert("Du har trykket på knappen!");
            },
            error: function (x, y, z) {
                //window.location.replace("/Home/MainPage");
                alert("Kunne ikke hente film");
            }
        });
    });


    function visInfoDynamisk(film) {

        $("#visFilmer").html("");

        var htmlRow;

        $.each(film, function (i, item) {

            var imgSrc = item.BildeTekst;
            htmlRow = [

                '<a data-toggle="modal" data-target="#' + item.Id + '">',
                '<div class="col-xs-3 col-center-block">',
                '<img class="rounded-circle" src="' + imgSrc + '" alt="Generic placeholder image"/>',
                '<p></p>',
                '</div>',
                '</a>',

                '<div class="modal fade" id="' + item.Id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">',
                '<div class="modal-dialog" role="document">',
                '   <div class="modal-content">',
                '      <div class="modal-header">',
                '         <h3 class="modal-title" id="exampleModalLabel">' + item.Navn + '</h3>',
                '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">',
                '           <span aria-hidden="true">&times;</span>',
                '      </button>',
                ' </div>',
                '<div class="modal-body">',
                '   <img style="width:100%; height: 270px;" class="rounded-circle" src="' + item.BildeTekst + '" alt="Generic placeholder image">',
                '  <div>',
                '     <dl class="dl-horizontal">',
                '        <dt>',
                '           Navn',
                '      </dt>',
                '     <dd>',
                item.Navn,
                '   </dd>',

                '<dt>',
                '   Beskrivelse',
                ' </dt>',
                '<dd>',
                item.Beskrivelse,
                '</dd>',
                '<dt>',
                '   Pris',
                '</dt>',
                '<dd>',
                item.Pris,
                '</dd>',
                '<dt>',
                '   KategoriId',
                ' </dt>',
                '<dd>',
                item.KategoriNavn,
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


    function visTabellFilmer(filmer) {

        $("#visTabell").html("");

        var htmlRowTop = '';

        htmlRowTop += '<form>';
        htmlRowTop += '<tr>';
        htmlRowTop += '<td><input type="text" name="Id"></td>';
        htmlRowTop += '<td><input type="text" name="Navn"></td>';
        htmlRowTop += '<td><input type="text" name="Beskrivelse"></td>';
        htmlRowTop += '<td><input type="text" name="Pris"></td>';
        htmlRowTop += '<td><input type="text" name="KategoriNavn"></td>';
        htmlRowTop += '<td><button id="update" class="btn btn-success">Add</button></td>';
        htmlRowTop += '</tr>';
        htmlRowTop += '</form>';

        htmlRowTop +='<table class="table table-striped table-bordered table-hover"><thead class="thead-dark">';
        htmlRowTop += '<tr><th scope="col">FilmId</th><th scope="col">Navn</th><th scope="col">Beskrivelse</th>';
        htmlRowTop += '<th scope="col">Pris</th><th scope="col">Kategori</th><th scope="col"></th><th scope="col"></th>';
        htmlRowTop += '</tr></thead><tbody>';
        

           $.each(filmer, function (i, item) {
              

               htmlRowTop += '<tr>';
               htmlRowTop += '<td>' + item.Id + '</td>';
               htmlRowTop += '<td>' + item.Navn + '</td>';
               htmlRowTop += '<td>' + item.Beskrivelse + '</td>';
               htmlRowTop += '<td>' + item.Pris + '</td>';
               htmlRowTop += '<td>' + item.KategoriNavn + '</td>';
               htmlRowTop += '<td><button id="update" class="btn btn-primary">Edit</button></td>';
               htmlRowTop += '<td><button id="update" class="btn btn-danger">Delete</button></td>';
               htmlRowTop += '</tr>';

               });

        htmlRowTop +=  '</tbody></table>';

        $("#visTabell").append(htmlRowTop);


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