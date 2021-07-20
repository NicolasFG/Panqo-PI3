require('dotenv').config();

const {uploadFile,getFileStream}= require('../../s3');

async function getImage(req,res){
    const key=req.params.key;
    const readStrem=getFileStream(key);
    readStrem.pipe(res);
}


async function uploadImage(req,res){
    const file=req.file;
    const result = await uploadFile(file);
    res.send({image_key: result.Key,image_url:`${process.env.API_URL}/api/images/${result.Key}`});
}

module.exports = {
    uploadImage,
    getImage
}