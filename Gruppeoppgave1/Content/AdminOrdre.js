$(function () {

    function VisDropDown(jsKategorier) {
        var utStreng = "";

        utStreng += "<option>Velg Filmer</option>";
        for (var i in jsKategorier) {
            utStreng += "<option value='" + jsKategorier[i].Id + "'>" + jsKategorier[i].Navn + "</option>";
        }
        $("#drop").append(utStreng);
    }


        $.ajax({
            url: '/Home/hentAlleFilmNavn',
            type: 'GET',
            dataType: 'json',
            success: function (jsFilm) {
                VisDropDown(jsFilm);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });




    $("#visordretabell").click(function () {
        // var id = $(this).val();

        $.ajax({
            url: '/Home/hentAlleOrdre/',
            type: 'GET',
            dataType: 'json',
            success: function (ordertabell) {
                visTabellOrdre(ordertabell)

            },
            error: function (x, y, z) {

                alert("Kunne ikke hente Data");
            }
        });
    });
    $("#added").click(function () {

        // bygg et js objekt fra input feltene
        var jsInn = {
            OrdreDate: $("#ordredate").val(),
            BrukerId: $("#brukerid").val(),
            FilmId: $("#drop").val()
            //BildeTekst: "Hei",
        }

        $.ajax({
            url: '/Home/registerorder',
            type: 'POST',
            data: JSON.stringify(jsInn),
            contentType: "application/json;charset=utf-8",
            success: function (ok) {
                alert("submit successfully");
                // kunne ha feilhåndtert evt. feil i registreringen her
                //window.location.reload();
                // reload av vinduet må sje her altså etter at kallet har returnert
            },
            error: function (x, y, z) {
                // alert("failed");
                // alert(x + '\n' + y + '\n' + z);
                alert("Brukeren ble ikke registrert!");
            }
        });

        $.ajax({
            url: '/Home/hentAlleOrdre/',
            type: 'GET',
            dataType: 'json',
            success: function (Home) {
                visTabellOrdre(Home);

            },
            error: function (x, y, z) {

                alert("Kunne ikke hente Data");
            }
        });
    })
    $("#searchBox3").change(function () {
        var id = $(this).val();
        $.ajax({
            url: '/Home/hentOrderInneholder/' + id,
            type: 'GET',
            dataType: 'json',
            success: function (order) {
                visInfoDynamisk(order);
            },
            error: function (x, y, z) {
                //window.location.replace("/Home/AdminPage");
            }
        });
    });

    function test() {
        alert("yes!");
    }

   

    function visInfoDynamisk(order) {
        $("#visTabellOrdrer").html("");

        var htmlRowTop = '';

        htmlRowTop += '<table class="table table-striped table-bordered table-hover"><thead class="thead-dark">';
        htmlRowTop += '<tr><th scope="col">OrdrerId</th><th scope="col">OrdreDate</th><th scope="col">Epost</th>';
        htmlRowTop += '<th scope="col">Film</th><th scope="col"></th><th scope="col"></th>';
        htmlRowTop += '</tr></thead><tbody>';


        $.each(order, function (i, item) {


            htmlRowTop += '<tr>';
            htmlRowTop += '<td>' + item.OrdrerId + '</td>';
            htmlRowTop += '<td>' + item.OrdreDate + '</td>';
            htmlRowTop += '<td>' + item.BrukerId + '</td>';
            htmlRowTop += '<td>' + item.FilmNavn + '</td>';
            htmlRowTop += '<td><button data-toggle="modal" data-target="#' + item.OrdrerId + item.FilmNavn + '" id="update" class="btn btn-primary">Edit</button></td>';
            htmlRowTop += '<td><button id="delete" class="btn btn-danger" onclick="deleteValue(' + item.OrdrerId + ')">Delete</button></td>';

            htmlRowTop += '<div class="modal fade" id="' + item.OrdrerId + item.FilmNavn + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document">';
            htmlRowTop += '<div class="modal-content"><div class="modal-header"><h3 class="modal-title" id="exampleModalLabel">' + "Oppdater" + '</h3>';


            htmlRowTop += '<div class="modal-body">';

            htmlRowTop += '<span style="font-size: 20px">Order dato</span><br/>';
            htmlRowTop += '<input type="text" id="orderDato" value="' + item.OrdreDate + '"><br/>';
            htmlRowTop += '<span style="font-size: 20px">Epost</span><br/>';
            htmlRowTop += ' <input type="text" id="orderEpost" value="' + item.BrukerId + '"><br/>';
            htmlRowTop += '<span style="font-size: 20px">Film</span><br/>';
            htmlRowTop += '<input type="text" id="orderFilmNavn" value="' + item.FilmNavn + '"><br/>';



            htmlRowTop += '</div >';
            htmlRowTop += '<div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
            htmlRowTop += '<button  id="EditAdmin" type="button" class="btn btn-primary" onclick="test()">Save admin</button>         </div>   </div>   </div></div>';
        });

        htmlRowTop += '</tbody></table>';

        $("#visTabellOrdrer").append(htmlRowTop);
    }
})


function deleteValue(val) {


    var id = parseInt(val);

    $.ajax({
        url: '/Home/slettOrder/' + id,
        type: 'POST',
        dataType: 'json',
        success: function (boolean) {
            if (boolean) {
                alert("Orderet er nå slettet!");
            } else
                alert("Feil med å slette orderet");
        },
        error: function () {
            $.ajax({
                url: '/Home/hentAlleOrdre/',
                type: 'GET',
                dataType: 'json',
                success: function (Home) {
                    visTabellOrdre(Home);

                },
                error: function (x, y, z) {

                    alert("Kunne ikke hente Data");
                }
            });
        }
    });
}


function visTabellOrdre(order) {

    $("#visTabellOrdrer").html("");

    var htmlRowTop = '';

    htmlRowTop += '<table class="table table-striped table-bordered table-hover"><thead class="thead-dark">';
    htmlRowTop += '<tr><th scope="col">OrdrerId</th><th scope="col">OrdreDate</th><th scope="col">Epost</th>';
    htmlRowTop += '<th scope="col">Film</th><th scope="col"></th><th scope="col"></th>';
    htmlRowTop += '</tr></thead><tbody>';


    $.each(order, function (i, item) {


        htmlRowTop += '<tr>';
        htmlRowTop += '<td>' + item.OrdrerId + '</td>';
        htmlRowTop += '<td>' + item.OrdreDate + '</td>';
        htmlRowTop += '<td>' + item.BrukerId + '</td>';
        htmlRowTop += '<td>' + item.FilmNavn + '</td>';
        htmlRowTop += '<td><button data-toggle="modal" data-target="#' + item.OrdrerId + item.FilmNavn + '" id="update" class="btn btn-primary">Edit</button></td>';
        htmlRowTop += '<td><button id="delete" class="btn btn-danger" onclick="deleteValue(' + item.OrdrerId + ')">Delete</button></td>';

        htmlRowTop += '<div class="modal fade" id="' + item.OrdrerId + item.FilmNavn + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document">';
        htmlRowTop += '<div class="modal-content"><div class="modal-header"><h3 class="modal-title" id="exampleModalLabel">' + "Oppdater" + '</h3>';
       


        htmlRowTop += '<div class="modal-body">';

        htmlRowTop += '<span style="font-size: 20px">Order dato</span><br/>';
        htmlRowTop += '<input type="text" id="orderDato" value="' + item.OrdreDate + '"><br/>';
        htmlRowTop += '<span style="font-size: 20px">Epost</span><br/>';
        htmlRowTop += ' <input type="text" id="orderEpost" value="' + item.BrukerId + '"><br/>';
        htmlRowTop += '<span style="font-size: 20px">Film</span><br/>';
        htmlRowTop += '<input type="text" id="orderFilmNavn" value="' + item.FilmNavn + '"><br/>';

        

        htmlRowTop += '</div >';
        htmlRowTop +='<div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
        htmlRowTop += '<button  id="EditAdmin" type="button" class="btn btn-primary" onclick="test()">Save Admin</button>         </div>   </div>   </div></div>';
    });

    htmlRowTop += '</tbody></table>';

    $("#visTabellOrdrer").append(htmlRowTop);
}








