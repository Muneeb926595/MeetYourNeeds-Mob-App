export const imageExists = (image_url) => {
  const isImageLoading = "loading";
  fetch(image_url, { method: "HEAD" })
    .then((res) => {
      if (res.ok) {
        isImageLoading = "not loading";
        return true;
      } else {
        isImageLoading = "not loading";
      }
    })
    .catch((err) => {
      console.log("Error:", err);
      isImageLoading = "not loading";
    });
  return isImageLoading;
};
