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
            htmlRowTop += '<td><button id="update" class="btn btn-primary" data-toggle="modal" data-target="#' + item.Id + item.Navn + '">Edit</button></td>';
            htmlRowTop += '<td><button id="update" class="btn btn-danger">Delete</button></td>';
            htmlRowTop += '</tr>';

            htmlRowTop += [
                '<div class="modal fade" id="' + item.Id + item.Navn + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document">',
                '<div class="modal-content"><div class="modal-header"><h3 class="modal-title" id="exampleModalLabel">' + "Oppdater" + '</h3>',
                //'<form><input type="text" placeholder="'+item.Epost+'"></input></form>',
                '<div contenteditable="true" style="height:30px; width:400px; border-style: solid;">' + item.Navn + '</div><br><div contenteditable="true" style="height:150px; width:400px; border-style: solid;">' + item.Beskrivelse + '</div><br><div contenteditable="true"style="height:30px; width:400px; border-style: solid;">' + item.Pris + '</div><br><div contenteditable="true" style="height:30px; width:400px;border-style: solid;">' + item.KategoriNavn + '</div>',
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span></button></div>',
                '<div class="modal-body"></div> <div class="modal-footer"><h1>' + "Lag Form her" + '</h1>  <h3>' + item.Id + '</h3><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>',
                '<button  id="EditBruker" type="button" class="btn btn-primary" onclick="EditFilm(' + item.Id + ')">Save changes</button>         </div>   </div>   </div></div>'
            ];

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
               htmlRowTop += '<td><button id="update" class="btn btn-primary" data-toggle="modal" data-target="#' + item.Id + item.Navn + '">Edit</button></td>';
               htmlRowTop += '<td><button id="update" class="btn btn-danger">Delete</button></td>';
               htmlRowTop += '</tr>';

               htmlRowTop += [
                   '<div class="modal fade" id="' + item.Id + item.Navn + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document">',
                   '<div class="modal-content"><div class="modal-header"><h3 class="modal-title" id="exampleModalLabel">' + "Oppdater" + '</h3>',
                   //'<form><input type="text" placeholder="'+item.Epost+'"></input></form>',
                   '<div contenteditable="true" style="height:30px; width:400px; border-style: solid;">' + item.Navn + '</div><br><div contenteditable="true" style="height:150px; width:400px; border-style: solid;">' + item.Beskrivelse + '</div><br><div contenteditable="true"style="height:30px; width:400px; border-style: solid;">' + item.Pris + '</div><br><div contenteditable="true" style="height:30px; width:400px;border-style: solid;">' + item.KategoriNavn + '</div>',
                   '<button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span></button></div>',
                   '<div class="modal-body"></div> <div class="modal-footer"><h1>' + "Lag Form her" + '</h1>  <h3>' + item.Id + '</h3><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>',
                   '<button  id="EditBruker" type="button" class="btn btn-primary" onclick="EditFilm(' + item.Id + ')">Save changes</button>         </div>   </div>   </div></div>'
               ];

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