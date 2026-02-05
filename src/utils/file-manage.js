import {join} from "path";
import {readFile,writeFile} from "fs/promises";
const userPath=join(process.cwd(), "src/data/cars.json")
export async function getData(){

    const cars=await readFile(userPath,"utf8")
    return JSON.parse(cars)
}



export async function  addData(data){
await writeFile(userPath,JSON.stringify(data,null,2))
}