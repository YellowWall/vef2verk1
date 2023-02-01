function pagetemp(title, content){
    return `<!doctype html>
    <html lang="is">
        <head>
            <meta charset="utf-8">
            <title>${title}</title>
            <link rel="stylesheet" href="../public/styles.css">
        </head>
        <body>${content}</body>
    </html>`;
};
function hero(title,desc){
    return `<header>
        <h1>${title}</h1>
        <p>${desc}</p>
        </header>`;
}
function formatNum(num){
    if(num == undefined){
        return null;
    }
    if(typeof num !== 'number'){
        return null;
    }
    var ret = parseFloat(num).toLocaleString('is');
    return ret.split(',')[0];

}
function tablemake(data){
    const allRows = data.split(/\r?\n|\r/);
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
    return table;
}