
const yourName = document.querySelector("#your-name") as HTMLInputElement;
const createSphere = document.querySelector("#create-sphere") as HTMLButtonElement;
const joinSphere = document.querySelector("#join-sphere") as HTMLButtonElement;

createSphere.addEventListener("click", () => {
    localStorage.setItem("your-name", yourName.value);
    window.location.href = "sphere.html"
});
joinSphere.addEventListener("click", () => {
    localStorage.setItem("your-name", yourName.value);
    window.location.href = "join-sphere.html"
});