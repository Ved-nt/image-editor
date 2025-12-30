let filters = {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
}

const imageCanvas = document.querySelector("#image-canvas")
const imgInput = document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d");
const resetButton = document.querySelector("#reset-btn");
let file = null;
let image=null;

const filterContainers = document.querySelector(".filters")

function createFilterElement(name, unit="%",value,min,max){
    const div=document.createElement("div");
    div.classList.add("filter");

    const input=document.createElement("input");
    input.type="range";
    input.min=min;
    input.max=max;
    input.value=value;
    input.id=name;

    const p = document.createElement("p");
    p.innerText = name

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", (event) => {
        filters[name].value=input.value;
        applyFilters();
    })

    return div;
}

// it converts all the keys present in filters(object) to an array and forEach is applied on that array
function createFilters(){
    Object.keys(filters).forEach(key => {
    
        //console.log(key, filters[key]); //it will give all the values of each property(value,min,max,unit for each property) 

        const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)
        filterContainers.appendChild(filterElement)
    }) 
}

createFilters();

imgInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const imagePlaceHolder = document.querySelector(".placeholder");
    imageCanvas.style.display="block";
    imagePlaceHolder.style.display = "none";

    const img = new Image();
    img.src=URL.createObjectURL(file);

    img.onload = () => {
    // Match canvas resolution to image size

        image=img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;

    // Draw image at full resolution
        canvasCtx.drawImage(img, 0, 0, img.width, img.height);
    };


})

function applyFilters() {
    canvasCtx.clearRect(0,0,imageCanvas.width,imageCanvas.height);
    canvasCtx.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
        `.trim();
    canvasCtx.drawImage(image, 0, 0, image.width, image.height);
}

resetButton.addEventListener("click", () => {
    filters = {
        brightness:{
            value:100,
            min:0,
            max:200,
            unit:"%"
        },
        contrast:{
            value:100,
            min:0,
            max:200,
            unit:"%"
        },
        saturation:{
            value:100,
            min:0,
            max:200,
            unit:"%"
        },
        hueRotation:{
            value:0,
            min:0,
            max:360,
            unit:"deg"
        },
        blur:{
            value:0,
            min:0,
            max:20,
            unit:"px"
        },
        grayscale:{
            value:0,
            min:0,
            max:100,
            unit:"%"
        },
        sepia:{
            value:0,
            min:0,
            max:100,
            unit:"%"
        },
        opacity:{
            value:100,
            min:0,
            max:100,
            unit:"%"
        },
        invert:{
            value:0,
            min:0,
            max:100,
            unit:"%"
        },
    }
    applyFilters();

    filterContainers.innerHTML=" ";
    createFilters();
})