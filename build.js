import {fs,mkdir,writeFile} from "fs/promises";
import path, {join} from "path";
import {tablemake,pagetemp,hero} from "./lib/html.js";
import {direxists, readFile, readFilesFromDir} from './lib/calculator.js';
import { join } from "path";

const data_dir = './data';
const output_dir = './dir';
let csvreq = "laeknadeild.csv";

async function main(){
    if(!(await direxists(output_dir))){
        await mkdir(output_dir);
    };
    const dataFiles = await readFilesFromDir(data_dir);
    const fileread = whichfile();
    var indexskra = null;
    for(const ind of datafiles){
        if(path.basename(ind) == "index.json"){
            indexskra = ind;
        };
    };
    if(indexskra==null){
        throw console.error("Fann ekki indexskrá");
    };

    for (const file of dataFiles){
        if(fileread == path.basename(file) ){
            const content = await readFile(file);
            const table = tablemake(content);
            const filename = '${fileread}.html';
            
            const titdesc = await jsonread(indexskra,fileread);
            const title = titdesc[0];
            const herobox = hero(titdesc[0],titdesc[1]);
            const body = herobox + table;
            console.log(title);
            console.log(description);
            console.log(filepath);
            const mypage = pagetemp(title,body);
            const filepath = join(output_dir,filename);
            await writeFile(filepath, mypage, {flag: 'w+'});
        };
       
    };
    
}
function jsonread(file,a){
    var items = [];
    const entries = JSON.parse(file);
    for(entry of entries){
        if(entry.csv == a){
            return [entry.title,entry.description];
        }
    }
}

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
