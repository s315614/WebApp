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
    $("#insert").click(function () {

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
                alert("submit successfully");
                // kunne ha feilhåndtert evt. feil i registreringen her
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
                // reload av vinduet må sje her altså etter at kallet har returnert
            },
            error: function (x, y, z) {
               // alert("failed");
                alert(x + '\n' + y + '\n' + z);
            }
        });
    })
    //not finished searchBox2
    $("#searchBox2").change(function () {
        var id = $(this).val();
        $.ajax({
            url: '/Home/hentFilmInneholder/' + id,  //change must be made
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

    

    function visInfoDynamisk(admin) {
        $("#visTabellAdmin").html("");

        var htmlRowTop = '';

        htmlRowTop += '<table class="table table-striped table-bordered table-hover"><thead class="thead-dark">';
        htmlRowTop += '<tr><th scope="col">Navn</th><th scope="col"></th><th scope="col"></th>';
        htmlRowTop += '</tr></thead><tbody>';


        $.each(admin, function (i, item) {


            htmlRowTop += '<tr>';
            htmlRowTop += '<td>' + item.Navn + '</td>';
            htmlRowTop += '<td><button id="update">Edit</button></td>';
            htmlRowTop += '<td><button id="delete" onclick="deleteAdmin(' + item.Id + ')">Delete</button></td></tr>';

        });

        htmlRowTop += '</tbody></table>';

        $("#visTabellAdmin").append(htmlRowTop);
    }
        

})

function deleteAdmin(id) {
    
    var intId = parseInt(id);


    
    $.ajax({
        url: '/Home/slettAdmin/' + intId,
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
        }
    });
    
}


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

        htmlRowTop += '<td><button id="update">Edit</button></td>';
        htmlRowTop += '<td><button id="delete" onclick="deleteAdmin(' + item.Id + ')">Delete</button></td></tr>';


    });

    htmlRowTop += '</tbody></table>';

    $("#visTabellAdmin").append(htmlRowTop);


}