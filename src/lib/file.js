import {readdir,readFile as fsReadFile,stat} from 'fs/promises';
import { join } from 'path';
export async function direxists(dir){
    try{
        const info = await statusbar(dir);
        return info.isDirectory();
    } catch(e){
        return false;
    }
}
export async function csvformat(content,sort){
    const data = content.split(/\r?\n|\r/);
    if(data.length < 2){
        console.log('fokk 1');
        return null;
    };
    console.log(data.type);
    console.log(data.length);
    console.log(data[0].split(';').length)
    var ret = new Array();
    if(!(data[0]=='Númer;Heiti;Einingar;Kennslumisseri;Námstig;')){
        console.log('fokk 2');
        return null;
    };
    var i = 0;
    for(const line of data){
        if(line == data[0]){
            continue;
        };
        var readline = line.split(';');
        if((readline.length < 5) || (readline.length > 6) ){
            continue;
        };if(!(namskeidsnum(readline[0]))){
            continue;
        };if(!(readline[1].length>0)){
            continue;
        };
        var num = formatNum(readline[2]);
        if(num == null){
            continue;
        };readline[2] = num;
        if(!(readline[3]== 'Haust' || readline[3] == 'Vor')){
            continue;
        };if(!(readline[4]== 'Grunnám' || readline[4]=='Framhaldsnám')){
            continue;
        };
        i++;
        ret.push(readline);
    };
    if(i>0){
        return ret;
    }else {console.log("fokk 3");
        return null;};

}
function formatNum(num){
    if(num == undefined){
        console.log("undef");
        return null;
    }
    //if(typeof num !== 'number'){
        //console.log("notNumber");
        //return null;
    //}
    var ret = parseFloat(num).toLocaleString('is');
    return Number(ret.split(',')[0]);

}
//Regex til að athuga hvort námskeiðsnúmer sé á réttu formi
function namskeidsnum(data){
    return /^(([A-Z|Á|É|Í|Ó|Ú|Ý|Ð|Þ|Æ|Ö]){3,})+(([0-9]){3,})+(([G|F|M]){1,})$/.test(data);
}
//function insertionSort(data, sortval){

//}
export async function readFilesFromDir(dir){
    let files = [];
    try{
        files = await readdir(dir);
    }catch (e){
        return [];
    }
    const mapped = files.map(async (file)=>{
        const path = join(dir,file);
        const info = await stat(path);
        if(info.isDirectory()){
            return null;
        }
        return path;
    });
    const resolved = await Promise.all(mapped);
    return resolved.filter(Boolean);
}
export async function readFile(file,{encoding = 'utf8'} = {}){
    try{
        const content = await fsReadFile(file);
        return content.toString(encoding);
    } catch(e){
        return null;
    }
};