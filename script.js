//initialize config global variables
const CANVAS_SIZE = 600;


// initialize the DOM variables
const canvasElement = document.querySelector("#canvas");
const inputSquareNumber = document.querySelector("#square-number");
const inputRandomness = document.querySelector("#randomness");
const inputInitialOpacity = document.querySelector("#initial-opacity");
const inputBrushOpacity = document.querySelector("#brush-opacity");
const inputColorPicker = document.querySelector("#color-picker");

// initialize initial global variables
let gSquareNumber = 10;
let gSquareSize = CANVAS_SIZE/gSquareNumber;
let gTotalSquares = gSquareNumber*gSquareNumber;
let gRandomness = inputRandomness.value/10;
let gInitialOpacity = 0;
let gBrushHueArray = hexToRgbArray(inputColorPicker.value);
let gBrushOpacity = inputBrushOpacity.value/10;
let gBrushColorArray = gBrushHueArray.concat([gBrushOpacity]);

console.log(gBrushColorArray);

// set the canvas size
canvasElement.style.height = CANVAS_SIZE + "px";
canvasElement.style.width = CANVAS_SIZE + "px";

// delete all canvas and create amount of newSquares necessary to fill the canvas
// e add eventlistener to each one of them
function createCanvas()
{
    gTotalSquares = gSquareNumber*gSquareNumber;
    gSquareSize = CANVAS_SIZE/gSquareNumber;
    canvasElement.innerHTML = ""; 

    for (let i=0; i < gTotalSquares; i++){
        let newSquare = document.createElement("div");
        newSquare.classList.add("canvas-square");
        newSquare.style.height = gSquareSize + "px";
        newSquare.style.width = gSquareSize + "px";
        // create properties for each newSquare so to access and change them later
        newSquare.colorArray = getRandomColorArray(gRandomness).concat([gInitialOpacity]);
        console.log(newSquare.colorArray);
        // newSquare.opacity = gInitialOpacity;
        newSquare.style.backgroundColor = getColorFromItem(newSquare);
        // newSquare.textContent = `${newSquare.opacity}`;

        newSquare.addEventListener('mouseover', (e) => {
            gBrushColorArray = hexToRgbArray(inputColorPicker.value).concat(inputBrushOpacity.value/10);
            paintSquare(newSquare);
            // console.log(newSquare.colorArray);

            
            // if (newSquare.opacity <= 1) {
            //     newSquare.opacity += gBrushOpacity/10;
            //     newSquare.opacity = Math.min(newSquare.opacity,1);
            //     newSquare.style.backgroundColor = getColorFromItem(newSquare);
            //     // newSquare.textContent = `${newSquare.opacity}`;
            //     }
        });
        canvasElement.appendChild(newSquare);
    }
}

function getNewSquareColorArray(squareColorArray){
    const squareOpacity = squareColorArray[3];
    console.log(squareOpacity);
    const brushOpacity = gBrushColorArray[3];
    console.log(brushOpacity);

    let newSquareColorArray = squareColorArray.map((color,index) =>
        index <= 2 ? gBrushColorArray[index]*brushOpacity+color*squareOpacity*(1-brushOpacity) : Math.min(1, brushOpacity + squareOpacity));
    // let newSquareOpacityArray = [Math.min(1, brushOpacity + squareOpacity)];
    // let newSquareColorArray = newSquareHueArray.concat(newSquareOpacityArray);
    return newSquareColorArray;
}

function getSquareColorArray(square) {
    return square.colorArray.concat(square.opacity)
}


function paintSquare(square){
    console.log(square.colorArray);
    square.colorArray = getNewSquareColorArray(square.colorArray);
    square.style.backgroundColor = `rgba(` + `${square.colorArray.join(',')}`+ `)`;
    console.log("background rgba " + square.style.backgroundColor);
}



    // let gBrushOpacity = inputBrushOpacity.value;

    // if (newSquare.opacity <= 1) {
    //     newSquare.opacity += gBrushOpacity/10;
    //     newSquare.opacity = Math.min(newSquare.opacity,1);
    //     newSquare.style.backgroundColor = getColorFromItem(newSquare);
    //     // newSquare.textContent = `${newSquare.opacity}`;
    //     }   


// change the canvas offset opacity for values less than the drawed ones
function changeOpacityCanvas(oldOpacity) {
    let squareElements = document.querySelectorAll(".canvas-square");
    squareElements.forEach((item) => {
        if(areAlmostEqual(item.opacity, oldOpacity))
        {
            item.opacity = gInitialOpacity;
            item.style.backgroundColor = getColorFromItem(item);
            // item.textContent = `${item.opacity}`;
        }
    });
}

// change the overall canvas color randomness 
function changeRandomnessCanvas()
{
    let squareElements = document.querySelectorAll(".canvas-square");
    squareElements.forEach((item) => {
        item.colorArray = getRandomColorArray(gRandomness);
        item.style.backgroundColor = getColorFromItem(item);
    });
}

function getColorFromItem (item){
    let rgbArray = item.colorArray;
    rgbaColorString = `rgba(${rgbArray.join(',')},` + `${item.opacity}` +`)`;
    return rgbaColorString
}

function getRandomColorArray(randomness) {
    let r = Math.floor(255*(1 - randomness*Math.random()));
    let g = Math.floor(255*(1 - randomness*Math.random()));
    let b = Math.floor(255*(1 - randomness*Math.random()));
    return [r,g,b];
}



function areAlmostEqual(num1, num2, precision = 0.01) {
    return Math.abs(num1-num2) <= precision;
}


inputSquareNumber.addEventListener('input', (e) => {
    gSquareNumber = e.target.value;
    console.log(e.target.value);
    createCanvas();
});

inputRandomness.addEventListener('input', (e) => {
    gRandomness = e.target.value/10;
    console.log(e.target.value);
    changeRandomnessCanvas();
});

inputInitialOpacity.addEventListener('input', (e) => {
    let oldOpacity = gInitialOpacity;
    gInitialOpacity = e.target.value/10;
    console.log(gInitialOpacity);
    changeOpacityCanvas(oldOpacity);
});


createCanvas(gSquareNumber);

function hexToRgbArray(hex) {
    // Remove o caractere # se estiver presente
    hex = hex.replace(/^#/, '');

    // Se for um hexadecimal curto (#fff), expande para o formato completo (#ffffff)
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    // Converte para valores RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
}