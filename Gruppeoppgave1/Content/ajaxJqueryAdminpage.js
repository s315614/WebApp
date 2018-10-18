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

    $("#registrer").click(function () {

        // bygg et js objekt fra input feltene
        var jsInn = {
            Navn: $("#navn").val(),
            Beskrivelse: $("#beskrivelse").val(),
            Pris: $("#pris").val(),
            KategoriId: $("#kategorinavn").val(),
            //BildeTekst: $("#bilde").val()
            //BildeTekst: "Hei",
        }

        $.ajax({
            url: '/Home/register',
            type: 'POST',
            data: JSON.stringify(jsInn),
            contentType: "application/json;charset=utf-8",
            success: function (ok) {
                // kunne ha feilhåndtert evt. feil i registreringen her
                window.location.reload();
                // reload av vinduet må sje her altså etter at kallet har returnert
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    })

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
                //window.location.replace("/Home/AdminPage");
            }
        });
    });


    function visInfoDynamisk(film) {

        $("#visTabell").html("");
        x
        var htmlRowTop = '';

        htmlRowTop += '<table class="table table-striped table-bordered table-hover"><thead class="thead-dark">';
        htmlRowTop += '<tr><th scope="col">FilmId</th><th scope="col">Navn</th><th scope="col">Beskrivelse</th>';
        htmlRowTop += '<th scope="col">Pris</th><th scope="col">Kategori</th><th scope="col"></th><th scope="col"></th>';
        htmlRowTop += '</tr></thead><tbody>';


        $.each(film, function (i, item) {


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

        htmlRowTop += '</tbody></table>';

        $("#visTabell").append(htmlRowTop);


    }


    function visTabellFilmer(filmer) {

        $("#visTabell").html("");

        var htmlRowTop = '';
               
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