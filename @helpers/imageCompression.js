import imageCompression from "browser-image-compression";

export const lighterImage = (file) => {
  return new Promise(function (resolve, reject) {
    var options = {
      maxSizeMB: 1.5,
      maxWidthOrHeight: 1600,
      useWebWorker: true,
    };
    imageCompression(file, options)
      .then(function (compressedFile) {
        resolve(compressedFile);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export const isImage = (type) => {
  const mimeTypes = ["image/gif", "image/jpeg", "image/png"];
  return mimeTypes.includes(type);
};
