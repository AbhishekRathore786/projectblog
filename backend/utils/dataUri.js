import dataUriParser from 'datauri/parser.js'
import path from 'path'

const parser = new dataUriParser()

const getDataUri = async (file)=>{
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName,file.buffer).content
    console.log("Get data uri chalaa")
}

export default getDataUri