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
let gSquareNumber = inputSquareNumber.value;
let gSquareSize = CANVAS_SIZE/gSquareNumber;
let gTotalSquares = gSquareNumber*gSquareNumber;
let gRandomness = inputRandomness.value/10;
let gBackgroundOpacity = inputInitialOpacity.value;
let gBrushHueArray = hexToRgbArray(inputColorPicker.value);
let gBrushOpacity = inputBrushOpacity.value/10;
let gBrushColorArray = gBrushHueArray.concat([gBrushOpacity]);


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
        newSquare.colorArray = getRandomHueArray(gRandomness).concat([gBackgroundOpacity]);

        refreshSquare(newSquare);

        newSquare.addEventListener('mouseover', (e) => {
            gBrushColorArray = hexToRgbArray(inputColorPicker.value).concat(inputBrushOpacity.value/10);
            paintSquare(newSquare);

        });
        canvasElement.appendChild(newSquare);
    }
}


// função que recebe (x,y) e retorna o square (x,y)
// fuction (x,y) {
//     const n = x + y*
//     const squareXY = document.querySelector("#canvas div:nth-child()");
// }

// fatorar essa função: não precisa usar vetor, fazer uma função opacityCoeficient
function getNewSquareColorArray(squareColorArray) {

    let newSquareColorArray = squareColorArray.map((color,index) => {
        let singleColorMixArray = getSingleColorMixArray(
            gBrushColorArray[index],
            gBrushColorArray[3],
            color,
            squareColorArray[3]
        );
        console.log(singleColorMixArray);
        return index <= 2
        ? Math.floor(singleColorMixArray[0]) 
        : Math.min(1, singleColorMixArray[1])}
    );
    return newSquareColorArray;
}

function getSquareColorArray(square) {
    return square.colorArray.concat(square.opacity);
}

function getSingleColorMixArray (color1, opacity1, color2, opacity2){
    let opacityCoeficient = opacity1+(1-opacity1)*opacity2;
    //returns the mix of a single dimensional color with opacity (c1*p1 +(1-p1)*c2*p2)/opacityCoeficient 
    return [(color1*opacity1 + (1 - opacity1)*color2*opacity2)/opacityCoeficient,opacityCoeficient];
}

function paintSquare(square){
    square.colorArray = getNewSquareColorArray(square.colorArray);
    square.textContent = `${square.colorArray}`;
    refreshSquare(square);
}

function refreshSquare(square) {
    square.style.backgroundColor = `rgba(` + `${square.colorArray.join(',')}`+ `)`;
    // square.textContent = `${square.colorArray}`
}

// change the canvas offset opacity for values less than the drawed ones
function changeOpacityCanvas(oldOpacity) {
    let squareElements = document.querySelectorAll(".canvas-square");
    squareElements.forEach((item) => {
        let itemOpacity = item.colorArray[3];
        if(areAlmostEqual(itemOpacity, oldOpacity))
        {
            item.colorArray[3] = gBackgroundOpacity;
            refreshSquare(item);
        }
        
    });
}

// change the overall canvas color randomness 
function changeRandomnessCanvas()
{
    let squareElements = document.querySelectorAll(".canvas-square");
    squareElements.forEach((square) => {
        square.colorArray = getRandomHueArray(gRandomness).concat(gBackgroundOpacity);
        refreshSquare(square);
    });
}

function getColorFromItem (item){
    let rgbArray = item.colorArray;
    rgbaColorString = `rgba(${rgbArray.join(',')},` + `${item.opacity}` +`)`;
    return rgbaColorString
}

function getRandomHueArray(randomness) {
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
    // console.log(e.target.value);
    createCanvas();
});

inputRandomness.addEventListener('input', (e) => {
    gRandomness = e.target.value/10;
    changeRandomnessCanvas();
});

inputInitialOpacity.addEventListener('input', (e) => {
    let oldOpacity = gBackgroundOpacity;
    gBackgroundOpacity = e.target.value/10;
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