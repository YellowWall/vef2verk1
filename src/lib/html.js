export function pagetemp(title, content){
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
export function hero(title,desc){
    return `<header>
        <h1>${title}</h1>
        <p>${desc}</p>
        </header>`;
}
export function indentry(name,linkur){
    return `<li><a href="${linkur}">${name}</a></li>`;
}
export function indMake(content){
    return`<ul>
        ${content}
        </ul>`;
}
//endurskrifa tablemake til að taka við fylki
export function tablemake(data){
    var table = `
    <table>
    <thead>
    <tr>
        <th>Númer</th>
        <th>Heiti</th>
        <th>Einingar</th>
        <th>Kennslumisseri</th>
        <th>Námstig</th>
        <th>Linkur</th>
    </tr>
    </thead>`;
    for (var singleRow =0; singleRow<data.length; singleRow++){
        if(data[singleRow][0]== null){
            break;
        }
        table += `
            <tr>`;
        var rowCells = data[singleRow];
        for (var rowCell = 0; rowCell < rowCells.length-1; rowCell++){
            table += `
            <td>`;
            table += rowCells[rowCell];
            table += ` </td>`;
        }
        console.log()
        table += `
            <td>
            <link href="${rowCells[rowCells.length-1]}">Síða Námskeiðs</link>
            </td>`;
        table += `
        </tr>`;
    }
    table += `
    </tbody>`;
    table += `
    </table>`;
    return table;
}