const bufferArrayToBase64 = (buffer) => {
    var binary = "";
    buffer.forEach((element) => {
      binary += "" + element.data;
    });
    return binary;
}

const getFileSource = (post) => {
    var base64Flag = `data:${post.file.contentType};base64,`;
    var imageStr = bufferArrayToBase64(post.data);
    return "" + base64Flag + imageStr;
}

module.exports = {
    getFileSource
}