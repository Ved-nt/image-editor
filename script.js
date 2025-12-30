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
const downloadButton = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets")

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

downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download="edited-image.png";//a tag will not try to open anything instead it will download that is present in its link
    link.href=imageCanvas.toDataURL();//anything that is present in imageCanvas will be converted to URL and it will be set in href
    link.click();//when we click on the a tag it will be donwloaded
})

const presets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    drama: {
        brightness: 105,
        contrast: 140,
        saturation: 125,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0,
    },

    vintage: {
        brightness: 105,
        contrast: 85,
        saturation: 75,
        hueRotation: 8,
        blur: 1,
        grayscale: 5,
        sepia: 45,
        opacity: 100,
        invert: 0,
    },

    oldschool: {
        brightness: 95,
        contrast: 85,
        saturation: 70,
        hueRotation: 5,
        blur: 1,
        grayscale: 20,
        sepia: 45,
        opacity: 100,
        invert: 0,
    },

    blackAndWhite: {
        brightness: 100,
        contrast: 120,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    cinematic: {
        brightness: 95,
        contrast: 130,
        saturation: 110,
        hueRotation: 350,
        blur: 0,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0,
    },

    faded: {
        brightness: 115,
        contrast: 80,
        saturation: 85,
        hueRotation: 0,
        blur: 0,
        grayscale: 5,
        sepia: 10,
        opacity: 100,
        invert: 0,
    },

    cool: {
        brightness: 105,
        contrast: 110,
        saturation: 115,
        hueRotation: 190,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    warm: {
        brightness: 110,
        contrast: 105,
        saturation: 120,
        hueRotation: 15,
        blur: 0,
        grayscale: 0,
        sepia: 15,
        opacity: 100,
        invert: 0,
    },

    cyberpunk: {
        brightness: 110,
        contrast: 145,
        saturation: 160,
        hueRotation: 270, // purple / neon shift
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    softGlow: {
        brightness: 120,
        contrast: 90,
        saturation: 110,
        hueRotation: 0,
        blur: 3, // glow effect
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0,
    },

    noir: {
        brightness: 90,
        contrast: 160,
        saturation: 0,
        hueRotation: 0,
        blur: 1,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },
    retropop: {
        brightness: 115,
        contrast: 135,
        saturation: 150,
        hueRotation: 20,   // warm retro color shift
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0,
    }
};

Object.keys(presets).forEach(presetName => {
    const presetButton = document.createElement("button");
    presetButton.classList.add("btn");
    presetButton.innerText=presetName;
    presetsContainer.appendChild(presetButton);

    presetButton.addEventListener("click", ()=>{
        const preset = presets[presetName];

        Object.keys(preset).forEach(filterName => {
            filters[filterName].value=preset[filterName];
        })

        applyFilters();
        filterContainers.innerHTML = "";
        createFilters();
    })
})
