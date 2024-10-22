const Btn1 = document.getElementsByClassName("search-button");
const inp = document.getElementById("search-bar");
const dataTy = document.getElementById("suggestion");
const values = document.getElementsByClassName("values");
// const Animelist = document.getElementsByClassName("anime-list");

Btn1[0].addEventListener("click", () => {
    for (i = 0; i <= Animelist.length - 1; i++)
        if (inp.textContent == Animelist[i].textContent) {
            Animelist[i].style.display = "block";
        }
        else {
            dataTy.style.display = "none";
        }
})
inp.addEventListener("click", () => {
    while(values.length>=0){
        values[0].style.display = "none";
    }
  });
// if(values.length>=0){
//     values[0].style.display = "none";
// }