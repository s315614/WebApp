$(function () {

    // alert("Trykk på (Bruker) for å liste ut Brukere! Husk og vent i noen sekunder før listene vises");

    // opprett en hendelse på dropdown-listen når siden lastes

    $("#visadmintabell").click(function () {
        // var id = $(this).val();

        $.ajax({
            url: '/Home/hentAlleAdminer/',
            type: 'GET',
            dataType: 'json',
            success: function (Home) {
                visTabellAdminer(Home);

            },
            error: function (x, y, z) {

                alert("Kunne ikke hente Data");
            }
        });
    })





    function visTabellAdminer(admin) {

        $("#visTabellAdmin").html("");

        var htmlRowTop = '';

        htmlRowTop += '<table class="table table-striped table-bordered table-hover"><thead class="thead-dark">';
        htmlRowTop += '<tr><th scope="col">Navn</th>';
        htmlRowTop += '<th scope="col"></th><th scope="col"></th>';
        htmlRowTop += '</tr></thead><tbody>';


        $.each(admin, function (i, item) {


            htmlRowTop += '<tr>';
            htmlRowTop += '<td>' + item.Navn + '</td>';
           
           // htmlRowTop += '<td>' + item.PassordByte + '</td>';
           
            htmlRowTop += '<td><button id="update">Edit</button></td>';
            htmlRowTop += '<td><button id="update">Delete</button></td></tr>';


        });

        htmlRowTop += '</tbody></table>';

        $("#visTabellAdmin").append(htmlRowTop);


    }
    $("#add3").click(function () {

        // bygg et js objekt fra input feltene
        var jsInn = {
            Navn: $("#adminNavn").val(),
            Passord: $("#adminPassord").val()
            
        }

        $.ajax({
            url: '/Home/addAdmin',
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
    $("#searchBox2").change(function () {
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


    

})