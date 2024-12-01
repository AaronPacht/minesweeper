document.addEventListener('DOMContentLoaded',(e)=>{


let table = document.getElementById("grid");
let square = document.getElementById("square")
let input1= document.getElementById("input1");
let input2= document.getElementById("input2");

input1.addEventListener('change',()=>{
  input2.value=input1.value;
});

square.addEventListener('click',()=>{
while (table.firstChild) {
    table.removeChild(table.firstChild);
}

let num1
let num2
if (input1.value>10) {
  num1 = input1.value;
} else {
  num1 = 10;
};
if (input2.value>10) {
  num2 = input2.value;
} else {
  num2 = 10;
};

let autos = ""
for (let index = 0; index < num1; index++) {
    autos+=" auto"
}
table.style.gridTemplateColumns = autos;
for (let index = 0; index < num1*num2; index++) {
    let newButton = document.createElement("button");
    table.appendChild(newButton);
}
});

});