//let file = read("/laeknadeild.csv")  

let csvreq = "laeknadeild.csv";
$.ajax({
    url: csvreq,
    dataType:"text"
}).done(tablemake);


//smíðum algjöran grunn html
//tökum við csv skránni til að lesa úr henni
//búum til titil á síðu
//function headmake(){
//    headdiv = document.createElement("head")
//    headdiv.innerHtml = "<head><meta charset=\"utf-8\"><Title=\"Læknadeild\"></head>"
//}
//búum til lýsingu  og BIG TITLE á síðu
//búum til lista sem heldur utan um fimm element: Númer, Heiti, Einingar, Kennslutímabil, námsstig
function tablemake(data){
    var allRows = data.split(/\r?\n|\r/);
    var table = '<table>';
    for (var singleRow =0; singleRow<allrows.length; singleRow++){
        if(singleRow === 0){
            table+= '<thead>';
            table += '<tr>';
        }else{
            table += '<tr>';
        }
        var rowCells = allRows[singleRow].split(',');
        for (var rowCell = 0; rowcell < rowCells.length; rowCell++){
            if(singleRow === 0){
                table += '<th>';
                table += rowCells[rowCell];
                table += '</th>';
            }else {
                table += '<td>';
                table += rowCells[rowCell];
                table += '</td>';
            }
        }
        if(singleRow===0){
            table += '</tr>';
            table += '</thead>';
            table += '<tbody>';
        } else{
            table += '</tr>';
        }
    }
    table += '</tbody>';
    table += '</table>';
    $('body').append(table);
}
//listi verður að vera raðanlegur, búum til menubox fyrir það
