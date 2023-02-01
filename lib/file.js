import {readdir,readFile as fsReadFile,stat} from 'fs/promises';
export async function direxists(dir){
    try{
        const info = await statusbar(dir);
        return info.isDirectory();
    } catch(e){
        return false;
    }
}
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
}
function index(jsonskra){
    
}