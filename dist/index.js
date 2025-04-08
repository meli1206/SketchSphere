"use strict";
const yourName = document.querySelector("#your-name");
const createSphere = document.querySelector("#create-sphere");
const joinSphere = document.querySelector("#join-sphere");
createSphere.addEventListener("click", () => {
    localStorage.setItem("your-name", yourName.value);
    window.location.href = "sphere.html";
});
joinSphere.addEventListener("click", () => {
    localStorage.setItem("your-name", yourName.value);
    window.location.href = "join-sphere.html";
});
//# sourceMappingURL=index.js.map