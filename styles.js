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
  let newGame = true;
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

  let minesLeft;
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click',()=>{
      if (newGame) {
        let mineNumber;
        while (mineNumber!=0) {
          minesLeft = setMines(i);
          mineNumber = 0;
          let surrounding = surround(i,num1);
          surrounding.forEach(tile=>{
            if (minesLeft.includes(tile)) {
              mineNumber+=1;
            }
          });
        }
        minesLeft.forEach(e=>{
          e.style.backgroundColor='red'
        })
        newGame = false;
      } else {
      let mineNumber = 0;
      let surrounding = surround(i,num1);
      surrounding.forEach(tile=>{
        if (minesLeft.includes(tile)) {
          mineNumber+=1;
        }
      });
      buttons[i].textContent = mineNumber;
    };
    });
  };

  function setMines (cur) {
    let mineList = [];
    let mineCount = Math.floor(buttons.length/5);
    let tileTotal = buttons.length - 1;
    for (let i = 0; i < buttons.length; i++) {
      if (i!=cur) {
        if (Math.floor(Math.random() * tileTotal) + 1 <= mineCount) {
          mineList.push(buttons[i]);
          mineCount-=1;
          tileTotal-=1;        
        } else {
          tileTotal-=1;
        }; 
      }
    };
    return mineList;
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

    return surroundList;
    
  }
  });

});