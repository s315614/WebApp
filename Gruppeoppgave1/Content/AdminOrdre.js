$(function () {

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

    $("#drop").change(function () {
            var id = $(this).val();
            $.ajax({
                url: '/Home/hentKatinfo/' + id,
                type: 'GET',
                dataType: 'json',
                //  success: function (Home) {
                // visInfoDynamisk(Home);
                //  },
                error: function (x, y, z) {
                    //window.location.replace("/Home/AdminPage");
                    alert(x + '\n' + y + '\n' + z);
                }
            });
        });
    
    $("#visordretabell").click(function () {
        // var id = $(this).val();

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
    });
    $("#add2").click(function () {

        // bygg et js objekt fra input feltene
        var jsInn = {
            OrdreDate: $("#ordredate").val(),
            Epost: $("#brukerid").val(),
            Id: $("#dropDown").val()
            //BildeTekst: "Hei",
        }

        $.ajax({
            url: '/Home/registerorder',
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
            
            htmlRowTop += '<td><button id="update">Edit</button></td>';
            htmlRowTop += '<td><button id="update">Delete</button></td>';


        });

        htmlRowTop += '</tbody></table>';

        $("#visTabellOrdrer").append(htmlRowTop);


    }



    

})


function VisDropDown(jsKategorier) {
        var utStreng = "";

        utStreng += "<option>Velg Filmer</option>";
        for (var i in jsKategorier) {
            utStreng += "<option value='" + jsKategorier[i].Id + "'>" + jsKategorier[i].Navn + "</option>";
        }
        $("#drop").append(utStreng);
    
}