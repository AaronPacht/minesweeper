document.addEventListener('DOMContentLoaded',(e)=>{

  let table = document.getElementById("grid");
  let square = document.getElementById("square")
  let input1= document.getElementById("input1");
  let input2= document.getElementById("input2");
  
  input1.placeholder=1;
  input2.placeholder=1;

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
  let buttons = [];
  let currentClass = 1;
  for (let index = 0; index < num1*num2; index++) {
      let newButton = document.createElement("button");
      newButton.className = currentClass;
      if (index+1===num1*currentClass) {
        currentClass+=1;
      };
      table.appendChild(newButton);
      buttons.push(newButton)
  }

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click',()=>{
      surround(i,num1);
    });
  };

  function surround (clk,row) {
    let surroundList = [];

    if (buttons[clk-1] && Number(buttons[clk-1].className)===Number(buttons[clk].className)) {
      surroundList.push(buttons[clk-1])
    }

    if (buttons[clk+1] && Number(buttons[clk+1].className)===Number(buttons[clk].className)) {
      surroundList.push(buttons[clk+1])
    }

    if (buttons[clk-row]) {
      surroundList.push(buttons[clk-row])
      if (buttons[clk-row-1] && Number(buttons[clk-row-1].className)===Number(buttons[clk].className)-1) {
        surroundList.push(buttons[clk-row-1])
      }
      if (buttons[clk-row+1] && Number(buttons[clk-row+1].className)===Number(buttons[clk].className)-1) {
        surroundList.push(buttons[clk-row+1])
      }
    }

    if (buttons[clk+row]) {
      surroundList.push(buttons[clk+row])
      if (buttons[clk+row-1] && Number(buttons[clk+row-1].className)===Number(buttons[clk].className)+1) {
        surroundList.push(buttons[clk+row-1])
      }
      if (buttons[clk+row+1] && Number(buttons[clk+row+1].className)===Number(buttons[clk].className)+1) {
        surroundList.push(buttons[clk+row+1])
      }
    }

    console.log(surroundList);
    
  }
  });

});