import multer from "multer";
import * as fs from "fs";
export function uploads(name){
    return multer({storage : multer.diskStorage({
            destination :(_,__,cb) => {
                cb(null,`uploads/${name}`)
            },
            filename:(_,file,cb) => {
                file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
                cb(null,file.originalname)
            }
        })})

}
