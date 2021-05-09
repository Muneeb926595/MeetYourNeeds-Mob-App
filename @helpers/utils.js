export const imageExists = (image_url) => {
  fetch(image_url, { method: "HEAD" })
    .then((res) => {
      console.log(res);
      if (res.ok) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => console.log("Error:", err));
};
