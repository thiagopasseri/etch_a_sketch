console.log("hello world!")

const canvasElement = document.querySelector("#canvas");
let gSquareNumber = 10;
let gRandomness = 0;
let gInitialOpacity = 0;

const CANVAS_SIZE = 600;
let gTotalSquares = gSquareNumber*gSquareNumber;
let gSquareSize = CANVAS_SIZE/gSquareNumber;

const inputSquareNumber = document.querySelector("#square-number");
const inputRandomness = document.querySelector("#randomness");
const inputInitialOpacity = document.querySelector("#initial-opacity");

canvasElement.style.height = CANVAS_SIZE + "px";
canvasElement.style.width = CANVAS_SIZE + "px";

function createCanvas()
{
    // let canvasChildrenElements = document.querySelectorAll(".canvas-square"); 
    // canvasChildrenElements.forEach((item) => {
    //     canvasElement.remove(item);
    // });
    gTotalSquares = gSquareNumber*gSquareNumber;
    gSquareSize = CANVAS_SIZE/gSquareNumber;
    canvasElement.innerHTML = ""; 

    for (let i=0; i < gTotalSquares; i++){
        let newSquare = document.createElement("div");
        newSquare.classList.add("canvas-square");
        newSquare.style.height = gSquareSize + "px";
        newSquare.style.width = gSquareSize + "px";
        newSquare.colorArray = getRandomColorArray(gRandomness);
        newSquare.opacity = gInitialOpacity;
        newSquare.style.backgroundColor = getColorFromItem(newSquare);
        canvasElement.appendChild(newSquare);
    }
}

function changeOpacityCanvas() {
    let squareElements = document.querySelectorAll(".canvas-square");
    squareElements.forEach((item) => {
        if(item.opacity !== gInitialOpacity)
        {
            item.opacity = gInitialOpacity;
            item.style.backgroundColor = getColorFromItem(item);
        }

    });
}

function changeRandomnessCanvas()
{
    let squareElements = document.querySelectorAll(".canvas-square");
    squareElements.forEach((item) => {
        item.colorArray = getRandomColorArray(gRandomness);
        item.style.backgroundColor = getColorFromItem(item);
    });
}

function createEventLisneter(){
    let squareElements = document.querySelectorAll(".canvas-square");
    squareElements.forEach((item)=> {
        item.addEventListener('mouseover', (e) => {
            // console.log("teste");
            if (item.opacity <= 1) {
                item.opacity += 0.1;
                // item.style.backgroundColor = `rgba(255,255,255,${item.opacity}` +`)`;
                item.style.backgroundColor = getColorFromItem(item);
                // console.log(item.style.backgroundColor);
                }
        })
    })
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
    createEventLisneter();
});

inputRandomness.addEventListener('input', (e) => {
    gRandomness = e.target.value/10;
    console.log(e.target.value);
    changeRandomnessCanvas();
    createEventLisneter();
});

inputInitialOpacity.addEventListener('input', (e) => {
    gInitialOpacity = e.target.value/10;
    console.log(e.target.value);
    createEventLisneter();
    changeOpacityCanvas();
});


createCanvas(gSquareNumber);
createEventLisneter();


