$(function () {
    
   // alert("Trykk på (Bruker) for å liste ut Brukere! Husk og vent i noen sekunder før listene vises");

    // opprett en hendelse på dropdown-listen når siden lastes
   //alert("Tabell reloaded!!!!!");
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
   /* $("#delete").click(function () {
        var jsInn = {
            Fornavn: item.Fornavn
        }
        $.ajax({
            url: '/Home/slettBruker',
            type: 'POST',
            data: JSON.stringify(jsInn),
            contentType: "application/json;charset=utf-8",
            success: function (ok) {
                window.location.reload;
            },
            error: function (x, y, z) {
                //alert("failed");
                alert(x + '\n' + y + '\n' + z);
            }
        });
    })*/
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
                show_data();
                alert("submit successfully");
                // kunne ha feilhåndtert evt. feil i registreringen her
                window.location.reload();
                // reload av vinduet må sje her altså etter at kallet har returnert
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
          //  htmlRowTop += '<td>' + item.PassordByte + '</td>';
            htmlRowTop += '<td>' + item.Telefon + '</td>';
            htmlRowTop += '<td>' + item.Fødselsdato + '</td>';
           // htmlRowTop += '<td><a data-toggle="modal" data-target="#' + item.Epost + '">Trykk her for pop up!</a></td>';
            htmlRowTop += '<td><button data-toggle="modal" data-target="#' + item.Fornavn + item.Fødselsdato + '" id="update" class="btn btn-primary">Edit</button></td>';
            htmlRowTop += '<td><button id="delete" class="btn btn-danger onClick="RemoveBrukerButton_Click(this)">Delete</button></td>';

            htmlRowTop += [
                '<div class="modal fade" id="' + item.Fornavn + item.Fødselsdato + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document">',
                '<div class="modal-content"><div class="modal-header"><h3 class="modal-title" id="exampleModalLabel">' + "Oppdater" + '</h3>',
                //'<form><input type="text" placeholder="'+item.Epost+'"></input></form>',
                '<div contenteditable="true" style="height:30px; width:400px; border-style: solid;">' + item.Epost + '</div><br><div contenteditable="true" style="height:30px; width:400px; border-style: solid;">' + item.Etternavn + '</div><br><div contenteditable="true"style="height:30px; width:400px; border-style: solid;">' + item.Adresse + '</div><br><div contenteditable="true" style="height:30px; width:400px;border-style: solid;">' + item.Telefon + '</div>',
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span></button></div>',
                '<div class="modal-body"></div> <div class="modal-footer"><h1>' + "Lag Form her" + '</h1>  <h3>' + item.Epost + '</h3><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>',
                '<button  id="EditBruker" type="button" class="btn btn-primary" onclick="EditBruker(this)">Save changes</button>         </div>   </div>   </div></div>'
            ];

        });
        /*
        htmlRowTop += '</tbody></table>';
        htmlRowTop += [
            '<div class="modal fade" id="' + item.Epost + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">',
            '<div class="modal-dialog" role="document">',
            '   <div class="modal-content">',
            '      <div class="modal-header">',
            '         <h3 class="modal-title" id="exampleModalLabel">' + "Oppdater" + '</h3>',
            '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">',
            '           <span aria-hidden="true">&times;</span>',
            '      </button>',
            ' </div>',
            '<div class="modal-body">',
            ' </div>',
            '      <div class="modal-footer">',
            '           <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>',
            '<button type="button" class="btn btn-primary" onclick="toLogin()">Buy</button>',

            '         </div>',
            '      </div>',
            '   </div>',
            '</div>'
        ];
        */

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

})
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
function RemoveBrukerButton_Click(val) {
  //  console.log(val);
   // var id = parseString(val);
    var id = $(val).val();
    $.ajax({
        url: '/Home/DeleteBruker/' + id,
        type: 'POST',
        dataType: 'json',
        success: function (boolean) {
            if (boolean) {
                alert("Bruker er nå slettet!");
            } else {
                alert("Feil med å slette Bruker");
            }

        },
        Error: function () {
            alert("failed");
        }
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
        //  htmlRowTop += '<td>' + item.PassordByte + '</td>';
        htmlRowTop += '<td>' + item.Telefon + '</td>';
        htmlRowTop += '<td>' + item.Fødselsdato + '</td>';
        htmlRowTop += '<td><button data-toggle="modal" data-target="#' + item.Fornavn + item.Fødselsdato +'" id="update" class="btn btn-primary">Edit</button></td>';
        htmlRowTop += '<td><button id="delete" class="btn btn-danger onClick="RemoveBrukerButton_Click(this)">Delete</button></td>';

        htmlRowTop += [
            '<div class="modal fade" id="' + item.Fornavn + item.Fødselsdato +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document">',
            '<div class="modal-content"><div class="modal-header"><h3 class="modal-title" id="exampleModalLabel">' + "Oppdater" + '</h3>',
            //'<form><input type="text" placeholder="'+item.Epost+'"></input></form>',
            '<div contenteditable="true" style="height:30px; width:400px; border-style: solid;">' + item.Epost + '</div><br><div contenteditable="true" style="height:30px; width:400px; border-style: solid;">' + item.Etternavn + '</div><br><div contenteditable="true"style="height:30px; width:400px; border-style: solid;">' + item.Adresse + '</div><br><div contenteditable="true" style="height:30px; width:400px;border-style: solid;">' + item.Telefon + '</div>',
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span></button></div>',
            '<div class="modal-body"></div> <div class="modal-footer"><h1>' + "Lag Form her" + '</h1>  <h3>' + item.Epost + '</h3><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>',
            '<button  id="EditBruker" type="button" class="btn btn-primary" onclick="EditBruker(this)">Save changes</button>         </div>   </div>   </div></div>'
        ];

    });
    htmlRowTop += '</tbody></table>';
    

    $("#visTabellBruker").append(htmlRowTop);


}
