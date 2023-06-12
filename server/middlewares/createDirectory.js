import * as path from "path";
import * as fs from "fs";
import {uploads} from "../multer.js";

function createDirectory(name){
    return async function (req,res,next){
        const dirPath = path.resolve("uploads",name);
        fs.mkdirSync(dirPath,{recursive :true});
        next()
    }
}
export default createDirectory;
