$(function () {
    
    $("#visbrukertabell").click(function () {
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
    })

    $("#add").click(function () {

        // bygg et js objekt fra input feltene
        var jsInn = {
            Epost: $("#epost").val(),
            Fornavn: $("#fornavn").val(),
            Etternavn: $("#etternavn").val(),
            Adresse: $("#adresse").val(),
            Passord: $("#passord").val(),
            Telefon: $("#telefon").val(),
            Fødselsdato: $("#fødselsdato").val()
           
        }
        

        $.ajax({
            url: '/Home/registerbruker',
            type: 'POST',
            data: JSON.stringify(jsInn),
            contentType: "application/json;charset=utf-8",
            success: function (ok) {
                alert("submit successfully");
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
            },
            error: function (x, y, z) {
                //alert("failed");
                alert(x + '\n' + y + '\n' + z);
            }

        });

    })
    $("#searchBox1").change(function () {
        var id = $(this).val();
        $.ajax({
            url: '/Home/hentBrukerInneholder/' + id,
            type: 'GET',
            dataType: 'json',
            success: function (bruker) {
                visInfoDynamisk(bruker);
            },
            error: function (x, y, z) {
                //window.location.replace("/Home/AdminPage");
            }
        });
    });

})
    
    function visInfoDynamisk(bruker) {
        $("#visTabellBruker").html("");

       // alert("Tabell reloaded");
        var htmlRowTop = '';

        htmlRowTop += '<table class="table table-striped table-bordered table-hover"><thead class="thead-dark">';
        htmlRowTop += '<tr><th scope="col">Epost</th><th scope="col">Fornavn</th><th scope="col">Etternavn</th>';
        htmlRowTop += '<th scope="col">Addresse</th><th scope="col">Telefon</th><th scope="col">Fødselsdato</th><th scope="col"></th><th scope="col"></th>';
        htmlRowTop += '</tr></thead><tbody>';




        $.each(bruker, function (i, item) {


            htmlRowTop += '<tr>';
            htmlRowTop += '<td>' + item.Epost + '</td>';
            htmlRowTop += '<td>' + item.Fornavn + '</td>';
            htmlRowTop += '<td>' + item.Etternavn + '</td>';
            htmlRowTop += '<td>' + item.Adresse + '</td>';
            htmlRowTop += '<td>' + item.Telefon + '</td>';
            htmlRowTop += '<td>' + item.Fødselsdato + '</td>';

            htmlRowTop += '<td><button data-toggle="modal" data-target="#' + item.Navn + '" id="update" class="btn btn-primary">Edit</button></td>';
            htmlRowTop += '<td><button id="delete" class="btn btn-danger" onclick="deletebruker(' + item.Telefon +')">Delete</button></td></tr>';

            htmlRowTop += '<div class="modal fade" id="' + item.Navn + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document">';
            htmlRowTop += '<div class="modal-content"><div class="modal-header"><h3 class="modal-title" id="exampleModalLabel">' + "Oppdater" + '</h3>';

            htmlRowTop += '<div class="modal-body">';

            htmlRowTop += '<span style="font-size: 20px">Epost</span><br/>';
            htmlRowTop += '<input type="text" id="orderDato" value="' + item.Epost + '"><br/>';
            htmlRowTop += '<span style="font-size: 20px">Fornavn</span><br/>';
            htmlRowTop += '<input type="text" id="orderDato" value="' + item.Fornavn + '"><br/>';
            htmlRowTop += '<span style="font-size: 20px">Etternavn</span><br/>';
            htmlRowTop += '<input type="text" id="orderDato" value="' + item.Etternavn + '"><br/>';
            htmlRowTop += '<span style="font-size: 20px">Adresse</span><br/>';
            htmlRowTop += '<input type="text" id="orderDato" value="' + item.Adresse + '"><br/>';
            htmlRowTop += '<span style="font-size: 20px">Telefon</span><br/>';
            htmlRowTop += '<input type="text" id="orderDato" value="' + item.Telefon + '"><br/>';
            htmlRowTop += '<span style="font-size: 20px">Fødselsdato</span><br/>';
            htmlRowTop += '<input type="text" id="orderDato" value="' + item.Fødselsdato + '"><br/>';


            htmlRowTop += '</div >';
            htmlRowTop += '<div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
            htmlRowTop += '<button  id="EditBruker" type="button" class="btn btn-primary" onclick="EditBruker(this)">Save changes</button>         </div>   </div>   </div></div>';


        });
     

        $("#visTabellBruker").append(htmlRowTop);
    }

    function VisDropDown(jsKategorier) {
        var utStreng = "";

        utStreng += "<option>Velg kategori</option>";
        for (var i in jsKategorier) {
            utStreng += "<option value='" + jsKategorier[i].KategoriId + "'>" + jsKategorier[i].KatgoriNavn + "</option>";
        }
        $("#drop").append(utStreng);
    }



function EditBruker(val) {
   // window.location = "/Home/EditBruker/" + val;
    
    $.ajax({
        url: '/Home/EditBruker/' + val,
        type: 'POST',
        dataType: 'json',
        success: function (boolean) {
            if (boolean) {
                alert("success!");
            } else {
                alert("failed!");
            }
        },
    });
}

function visTabellBrukere(bruker) {

    $("#visTabellBruker").html("");

    var htmlRowTop = '';

    htmlRowTop += '<table class="table table-striped table-bordered table-hover"><thead class="thead-dark">';
    htmlRowTop += '<tr><th scope="col">Epost</th><th scope="col">Fornavn</th><th scope="col">Etternavn</th>';
    htmlRowTop += '<th scope="col">Addresse</th><th scope="col">Telefon</th><th scope="col">Fødselsdato</th><th scope="col"></th><th scope="col"></th>';
    htmlRowTop += '</tr></thead><tbody>';

    $.each(bruker, function (i, item) {


        htmlRowTop += '<tr>';
        htmlRowTop += '<td>' + item.Epost + '</td>';
        htmlRowTop += '<td>' + item.Fornavn + '</td>';
        htmlRowTop += '<td>' + item.Etternavn + '</td>';
        htmlRowTop += '<td>' + item.Adresse + '</td>';
        htmlRowTop += '<td>' + item.Telefon + '</td>';
        htmlRowTop += '<td>' + item.Fødselsdato + '</td>';

        htmlRowTop += '<td><button data-toggle="modal" data-target="#' + item.Navn + '" id="update" class="btn btn-primary">Edit</button></td>';
        htmlRowTop += '<td><button id="delete" class="btn btn-danger" onclick="deletebruker(' + item.Telefon + ')">Delete</button></td></tr>';

        htmlRowTop += '<div class="modal fade" id="' + item.Navn + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document">';
        htmlRowTop += '<div class="modal-content"><div class="modal-header"><h3 class="modal-title" id="exampleModalLabel">' + "Oppdater" + '</h3>';

        htmlRowTop += '<div class="modal-body">';

        htmlRowTop += '<span style="font-size: 20px">Epost</span><br/>';
        htmlRowTop += '<input type="text" id="orderDato" value="' + item.Epost + '"><br/>';
        htmlRowTop += '<span style="font-size: 20px">Fornavn</span><br/>';
        htmlRowTop += '<input type="text" id="orderDato" value="' + item.Fornavn + '"><br/>';
        htmlRowTop += '<span style="font-size: 20px">Etternavn</span><br/>';
        htmlRowTop += '<input type="text" id="orderDato" value="' + item.Etternavn + '"><br/>';
        htmlRowTop += '<span style="font-size: 20px">Adresse</span><br/>';
        htmlRowTop += '<input type="text" id="orderDato" value="' + item.Adresse + '"><br/>';
        htmlRowTop += '<span style="font-size: 20px">Telefon</span><br/>';
        htmlRowTop += '<input type="text" id="orderDato" value="' + item.Telefon + '"><br/>';
        htmlRowTop += '<span style="font-size: 20px">Fødselsdato</span><br/>';
        htmlRowTop += '<input type="text" id="orderDato" value="' + item.Fødselsdato + '"><br/>';


        htmlRowTop += '</div >';
        htmlRowTop += '<div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
        htmlRowTop += '<button  id="EditBruker" type="button" class="btn btn-primary" onclick="EditBruker(this)">Save changes</button>         </div>   </div>   </div></div>';


    });
    htmlRowTop += '</tbody></table>';
    

    $("#visTabellBruker").append(htmlRowTop);


}



function deletebruker(telefon) {
    alert(telefon);

    var id = parseInt(telefon);

    $.ajax({
        url: '/Home/slettadminbruker/' + id,
        type: 'POST',
        dataType: 'json',
        success: function (boolean) {

        },
        error: function () {
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
        }
    });
}
