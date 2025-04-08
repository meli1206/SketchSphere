"use strict";
const restart = document.querySelector("#restart");
const home = document.querySelector("#home");
const promptsAndPictures = document.querySelector("#prompts-and-pictures");
restart.addEventListener("click", () => {
    window.location.href = "sphere.html";
});
home.addEventListener("click", () => {
    window.location.href = "index.html";
});
const img = localStorage.getItem("img") || "";
promptsAndPictures.src = img;
//# sourceMappingURL=gallery.js.map