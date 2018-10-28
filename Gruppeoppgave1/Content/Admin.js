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


    $("#EditBruker").click(function () {
        alert($("#adminEndreNavn").val());

        var jsInn = {
            Navn: $("#adminEndreNavn").val()
        }

        
        $.ajax({
            url: '/Home/updateAdmin',
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
            url: '/Home/hentAdminInneholder/' + id,  
            type: 'GET',
            dataType: 'json',
            success: function (admin) {
                visInfoDynamisk(admin);
            },
            error: function (x, y, z) {
                //window.location.replace("/Home/AdminPage");
            }
        });
    });

    

})

function visInfoDynamisk(admin) {
    $("#visTabellAdmin").html("");

    var htmlRowTop = '';

    htmlRowTop += '<table class="table table-striped table-bordered table-hover"><thead class="thead-dark">';
    htmlRowTop += '<tr><th scope="col">Navn</th><th scope="col"></th><th scope="col"></th>';
    htmlRowTop += '</tr></thead><tbody>';


    $.each(admin, function (i, item) {



        htmlRowTop += '<tr>';
        htmlRowTop += '<td>' + item.Navn + '</td>';

        htmlRowTop += '<td><button data-toggle="modal" data-target="#' + item.Navn + '" id="update" class="btn btn-primary">Edit</button></td>';
        htmlRowTop += '<td><button id="delete" class="btn btn-danger" onclick="deleteAdmin(' + item.Id + ')">Delete</button></td></tr>';

        htmlRowTop += '<div class="modal fade" id="' + item.Navn + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document">';
        htmlRowTop += '<div class="modal-content"><div class="modal-header"><h3 class="modal-title" id="exampleModalLabel">' + "Oppdater" + '</h3>';

        htmlRowTop += '<div class="modal-body">';

        htmlRowTop += '<span style="font-size: 20px">Navn</span><br/>';
        htmlRowTop += '<input type="text" id="adminEndreNavn" value="' + item.Navn + '"><br/>';


        htmlRowTop += '</div >';
        htmlRowTop += '<div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
        htmlRowTop += '<button  id="EditBruker" type="button" class="btn btn-primary" >Save changes</button>         </div>   </div>   </div></div>';
    

    });


    htmlRowTop += '</tbody></table>';

    $("#visTabellAdmin").append(htmlRowTop);
}



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
       
        htmlRowTop += '<td><button data-toggle="modal" data-target="#' + item.Navn + '" id="update" class="btn btn-primary">Edit</button></td>';
        htmlRowTop += '<td><button id="delete" class="btn btn-danger" onclick="deleteAdmin(' + item.Id + ')">Delete</button></td></tr>';

        htmlRowTop += '<div class="modal fade" id="' + item.Navn  + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document">';
        htmlRowTop += '<div class="modal-content"><div class="modal-header"><h3 class="modal-title" id="exampleModalLabel">' + "Oppdater" + '</h3>';

        htmlRowTop += '<div class="modal-body">';

        htmlRowTop += '<span style="font-size: 20px">Navn</span><br/>';
        htmlRowTop += '<input type="text" id="adminEndreNavn" value="' + item.Navn + '"><br/>';


        htmlRowTop += '</div >';
        htmlRowTop += '<div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
        htmlRowTop += '<button  id="EditBruker" type="button" class="btn btn-primary">Save changes</button>         </div>   </div>   </div></div>';
        

    });

    htmlRowTop += '</tbody></table>';

    $("#visTabellAdmin").append(htmlRowTop);


} 