import {mkdir,writeFile} from "fs/promises";
import path,{join} from "path";
import {indMake, indentry,tablemake,pagetemp,hero} from "./lib/html.js";
import { csvformat, direxists, readFile, readFilesFromDir} from './lib/file.js';

const data_dir = './data';
const output_dir = './dist';
let csvreq = "laeknadeild.csv";

async function main(){
    //if (!(await direxists(output_dir))){
    //    await mkdir(output_dir);
    //};
    const dataFiles = await readFilesFromDir(data_dir);
    const fileread = whichfile();
    var indexskra = null;
    for(const ind of dataFiles){
        if(path.basename(ind) == "index.json"){
            indexskra = ind;
        }
    };
    if(indexskra==null){
        throw console.error("Fann ekki indexskrá");
    };
    var ind = '';
    for (const file of dataFiles){
        if(path.basename(file)=='index.json'){
            continue;
        }
        const content = await readFile(file,{encoding: 'binary'});
        const arr = await csvformat(content);
        if(arr !== null){
            const table = tablemake(arr);
            const filename = `${path.basename(file).split('.')[0]}.html`;
            const titdesc = await jsonread(indexskra,fileread);
            const title = titdesc[0];
            const herobox = hero(titdesc[0],titdesc[1]);
            const body = herobox + table;
            const mypage = pagetemp(title,body);
            const filepath = join(output_dir,filename);
            await writeFile(filepath, mypage, {flag: 'w+'});
            ind += indentry(titdesc[0],filename);
        };
       
    };
    if(ind !== ''){
        ind = indMake(ind);
        const indpage = pagetemp("Index", ind);
        const indpath = join(output_dir,"Index.html");
        await writeFile(indpath,indpage,{flag:'w+'});
    }
}
async function jsonread(file,a){
    const data = await readFile(file);
    const entries = JSON.parse(data);
    for(const entry of entries){
        if(entry.csv == a){
            return [entry.title,entry.description];
        }
    }
}
main().catch((err) => console.error(err));

//let file = read("/laeknadeild.csv")  
function whichfile(){
    return csvreq;
}

//fs.readFile(csvreq,function read(err,data){
//    if (err){
//        throw err;
//    }
//    const content = data;
//    console.log(content);
//    tablemake(content);
//});


//smíðum algjöran grunn html
//tökum við csv skránni til að lesa úr henni
//búum til titil á síðu
//function headmake(){
//    headdiv = document.createElement("head")
//    headdiv.innerHtml = "<head><meta charset=\"utf-8\"><Title=\"Læknadeild\"></head>"
//}
//búum til lýsingu  og BIG TITLE á síðu
//búum til lista sem heldur utan um fimm element: Númer, Heiti, Einingar, Kennslutímabil, námsstig

//listi verður að vera raðanlegur, búum til menubox fyrir það
