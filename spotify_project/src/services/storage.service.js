const {ImageKit} = require('@imagekit/nodejs')

const imagekitclientt = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
}) 

async function uploadfile(file) {
    const result = await imagekitclientt.files.upload({
        file,
        fileName:"music_" +Date.now(),
        folder: "yt-spotify"
    }) 
    return result

}

module.exports = {
    uploadfile
};
