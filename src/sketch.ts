
// TOOLS
const toolBtns = document.querySelectorAll(".tool") as NodeListOf<HTMLElement>;
const sizeSlider = document.querySelector("#size-slider") as HTMLInputElement;
const fillShape = document.querySelector("#fill-shape") as HTMLInputElement;

// COLOURS
const colorBtns = document.querySelectorAll(".colors .option") as NodeListOf<HTMLElement>;
const colorPicker = document.querySelector("#color-picker") as HTMLInputElement;

// OPTIONS
const clearCanvas = document.querySelector(".clear-canvas") as HTMLElement;
const done = document.querySelector(".done") as HTMLElement;

// CANVAS
const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")! as CanvasRenderingContext2D;

// Global variabels with default values
let prevMouseX: number, 
    prevMouseY: number, 
    snapshot: ImageData,
    isDrawing: boolean = false, 
    selectedTool: string = "brush", 
    brushWidth: number = 5, 
    selectedColor: string = "#000";

const setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
}

window.addEventListener("load", () => {
    
    // Setting canvas widht/height.. 
    // offsetwidht/height returns 
    // viewbale widht/height of an element
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

const drawRect = (e: MouseEvent) => {
    if (!fillShape.checked) {
        const width = prevMouseX - e.offsetX;
        const height = prevMouseY - e.offsetY;
        return ctx.strokeRect(e.offsetX, e.offsetY,
        width, height);
    }
    const width = prevMouseX - e.offsetX;
    const height = prevMouseY - e.offsetY;
    ctx.fillRect(e.offsetX, e.offsetY, width, height);
}

const drawCircle = (e: MouseEvent) => {
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow((prevMouseX -
    e.offsetX), 2) 
    + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillShape.checked ? ctx.fill() : ctx.stroke();
}

const drawTriangle = (e: MouseEvent) => {
    ctx.beginPath(); 
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY); 
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); 
    ctx.closePath(); 
    fillShape.checked ? ctx.fill() : ctx.stroke();
}

// Function to draw a square
const drawSquare = (e: MouseEvent) => {
    const sideLength = Math.abs(prevMouseX - e.offsetX);
    ctx.beginPath();
    ctx.rect(e.offsetX, e.offsetY, sideLength, sideLength);
    fillShape.checked ? ctx.fill() : ctx.stroke();
}

// Function to draw a hexagon
const drawHexagon = (e: MouseEvent) => {
    const sideLength =
    Math.abs(prevMouseX - e.offsetX);
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = (2 * Math.PI / 6) * i;
        const x = e.offsetX + sideLength 
        * Math.cos(angle);
        const y = e.offsetY + sideLength 
        * Math.sin(angle);
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    fillShape.checked ? ctx.fill() : ctx.stroke();
}

// Function to draw a pentagon
const drawPentagon = (e: MouseEvent) => {
    const sideLength = 
    Math.abs(prevMouseX - e.offsetX);
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        const angle = (2 * Math.PI / 5) * 
        i - Math.PI / 2;
        const x = e.offsetX + sideLength 
        * Math.cos(angle);
        const y = e.offsetY + sideLength 
        * Math.sin(angle);
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    fillShape.checked ? ctx.fill() : ctx.stroke();
}

const drawLine = (e: MouseEvent) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

const drawArrow = (e: MouseEvent) => {
    const headLength = 10;
    const angle = Math.atan2(e.offsetY - prevMouseY,
    e.offsetX - prevMouseX);
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    // Draw arrowhead
    ctx.beginPath();
    ctx.moveTo(e.offsetX - headLength * 
    Math.cos(angle - Math.PI / 6), 
    e.offsetY - headLength * 
    Math.sin(angle - Math.PI / 6));
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(e.offsetX - headLength * 
    Math.cos(angle + Math.PI / 6),
    e.offsetY - headLength * 
    Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
}


const startDraw = (e: MouseEvent) => {
    isDrawing = true;
    prevMouseX = e.offsetX; 
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}


const drawPencil = (e: MouseEvent) => {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}


const drawing = (e: MouseEvent) => {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);

    if (selectedTool === "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" 
        ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (selectedTool === "rectangle") {
        drawRect(e);

    }
    else if (selectedTool === "circle") {
        drawCircle(e);

    } else if (selectedTool === "triangle") {
        drawTriangle(e);

    } else if (selectedTool === "square") {
        drawSquare(e);
    } else if (selectedTool === "hexagon") {
        drawHexagon(e);
    } else if (selectedTool === "pentagon") {
        drawPentagon(e);
    } else if (selectedTool === "line") {
        drawLine(e);
    } else if (selectedTool === "arrow") {
        drawArrow(e);
    }
    else {
        drawPencil(e);

    }
}


toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active")!
        .classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);

    });

});

sizeSlider.addEventListener("change", () => 
    brushWidth = parseInt(sizeSlider.value))

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .selected")!
        .classList.remove("selected");
        btn.classList.add("selected"); 
        selectedColor = window.getComputedStyle(btn)
        .getPropertyValue("background-color");
    });
});


colorPicker.addEventListener("change", () => {
    colorPicker.parentElement!.style.background = 
    colorPicker.value;
    colorPicker.parentElement!.click();
});

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setCanvasBackground();
})

done.addEventListener("click", () => {
    const img = canvas.toDataURL("image/png");
    localStorage.setItem("img", img);
    window.location.href = "gallery.html";
})

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);
