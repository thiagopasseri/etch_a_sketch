//initialize config global variables
const CANVAS_SIZE = 600;


// initialize the DOM variables
const canvasElement = document.querySelector("#canvas");
const inputSquareNumber = document.querySelector("#square-number");
const inputRandomness = document.querySelector("#randomness");
const inputInitialOpacity = document.querySelector("#initial-opacity");

// initialize initial global variables
let gSquareNumber = 10;
let gSquareSize = CANVAS_SIZE/gSquareNumber;
let gTotalSquares = gSquareNumber*gSquareNumber;
let gRandomness = 0;
let gInitialOpacity = 0;

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
        newSquare.colorArray = getRandomColorArray(gRandomness);
        newSquare.opacity = gInitialOpacity;
        newSquare.style.backgroundColor = getColorFromItem(newSquare);
        // newSquare.textContent = `${newSquare.opacity}`;

        newSquare.addEventListener('mouseover', (e) => {
            // console.log("teste");
            if (newSquare.opacity <= 1) {
                newSquare.opacity += 0.1;
                newSquare.opacity = Math.min(newSquare.opacity,1);
                newSquare.style.backgroundColor = getColorFromItem(newSquare);
                // newSquare.textContent = `${newSquare.opacity}`;
                }
        });
        canvasElement.appendChild(newSquare);
    }
}

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
    // console.log(`rgba(${r},${g},${b},0)`);
    // return `rgba(${r},${g},${b},0.1)`;
    // console.log([r,g,b]);
    return [r,g,b];
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

function areAlmostEqual(num1, num2, precision = 0.01) {
    return Math.abs(num1-num2) <= precision;
}
