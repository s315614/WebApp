$(function () {
    // hentAlleNavn og bygg opp dropdown når siden lastes

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

    // opprett en hendelse på dropdown-listen når siden lastes

    $("#drop").change(function () {
        var id = $(this).val();
        $.ajax({
            url: '/Home/hentKatinfo/' + id,
            type: 'GET',
            dataType: 'json',
            success: function (Home) {
                visInfoDynamisk(Home);
            },
            error: function (x, y, z) {
                window.location.replace("/Home/MainPage");
            }
        });
    });

    $("#searchBox").change(function () {
        var id = $(this).val();
        $.ajax({
            url: '/Home/hentFilmInneholder/' + id,
            type: 'GET',
            dataType: 'json',
            success: function (film) {
                visInfoDynamisk(film);
            },
            error: function (x, y, z) {
                window.location.replace("/Home/MainPage");
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




})

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
