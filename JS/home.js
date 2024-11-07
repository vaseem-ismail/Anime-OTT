// const idName = document.getElementById("idname");
// console.log(idName.textContent)
// const idImage = document.getElementById("idImage");

// const locS = localStorage.getItem("username");
// console.log(locS);
// window.addEventListener("load",()=>{
//     if(locS !== ""){ 
//         idName.innerHTML = locS.upperCase();
//     }
// })

const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<html><body><div id="idname"></div><img id="idImage"></body></html>`);

const idName = dom.window.document.getElementById("idname");
const idImage = dom.window.document.getElementById("idImage");

// const locS = "john_doe"; // Assuming you got this from somewhere (e.g., localStorage in a browser)
const localValue = localStorage.getItem("Username").value;



if (localValue !== "") {
    idName.textContent = localValue.toUpperCase();  // Change the content to uppercase
}

console.log(idName.innerHTML);  // Output: JOHN_DOE
