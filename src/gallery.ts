const restart = document.querySelector("#restart") as HTMLButtonElement;
const home = document.querySelector("#home") as HTMLButtonElement;
const promptsAndPictures = document.querySelector("#prompts-and-pictures") as HTMLImageElement;

restart.addEventListener("click", () => {
    window.location.href = "sphere.html"
});
home.addEventListener("click", () => {
    window.location.href = "index.html"
});

const img = localStorage.getItem("img") || "";
promptsAndPictures.src = img;