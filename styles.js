document.addEventListener('DOMContentLoaded',(e)=>{

  let table = document.getElementById("grid");
  let square = document.getElementById("square")
  let input1 = document.getElementById("input1");
  let input2 = document.getElementById("input2");
  let input3 = document.getElementById("input3");
  
  input1.value=5;
  input2.value=5;
  input3.placeholder="?";
  input3.disabled = true;

  input1.addEventListener('change',()=>{
    input2.value=input1.value;
  });
  
  square.addEventListener('click',()=>{
  let newGame = true;
  let gameLost = false;
  while (table.firstChild) {
      table.removeChild(table.firstChild);
  }
  
  let num1
  let num2
  if (input1.value>10) {
    num1 = Number(input1.value);
  } else {
    num1 = 10;
    input1.value = 10;
  };
  if (input2.value>10) {
    num2 = Number(input2.value);
  } else {
    num2 = 10;
    input2.value = 10;
  };
  input3.value = Math.floor(num1*num2/5);

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
      newButton.style.backgroundColor = "rgb(201, 200, 200)";
      if (index+1===num1*currentClass) {
        currentClass+=1;
      };
      table.appendChild(newButton);
      buttons.push(newButton)
  }

  let minesLeft;
  let spacesLeft = num1*num2-Math.floor(buttons.length/5);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click',()=>{
      if (!gameLost) {
        if (newGame && !buttons[i].innerHTML) {
          getMines(i,num1);
        } else if(!buttons[i].innerHTML && minesLeft.includes(buttons[i])){
          mined();
        } else if(buttons[i].style.backgroundColor != "gray" && !buttons[i].innerHTML){
          nextFunc(i);
        } else if(buttons[i].style.backgroundColor === "gray" && buttons[i].innerHTML){
          clickSurr(i,num1);
        };
      };
    });
  };

  let minesLeftNumber = Math.floor(buttons.length/5);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('contextmenu',(e)=>{
      e.preventDefault()
      if(buttons[i].style.backgroundColor != "gray"){
        if (!buttons[i].innerHTML && input3.value != 0) {
          buttons[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="4 0 27 24" overflow="visible" fill="none" stroke="red" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>`;
          input3.value -= 1;
          if (minesLeft && minesLeft.includes(buttons[i])) {
            minesLeftNumber -= 1;
            if (minesLeftNumber === 0) {
              win();
            }
          }
        }else if(buttons[i].innerHTML){
          buttons[i].innerHTML = "";
          input3.value = Number(input3.value)+1;
          if (minesLeft && minesLeft.includes(buttons[i])) {
            minesLeftNumber += 1;
          }
        };
      };
    });
  };

  function win() {
    for (let index = 0; index < buttons.length; index++) {
      if (buttons[index].style.backgroundColor === "white") {
        getNumber(index);
      };
    };
    minesLeft.forEach(e=>{
      e.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="4 0 27 24" overflow="visible" fill="none" stroke="red" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>`;
    });
  };

  function clickSurr(i,row) {
    let flagNumber = 0;
    let around = surround(i,row)[0];
    around.forEach(tile=>{
      if (tile.innerHTML === `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="4 0 27 24" overflow="visible" fill="none" stroke="red" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>`) {
        flagNumber+=1;
      };
    });
    if (flagNumber === Number(buttons[i].innerHTML)) {
      nextFunc(i,surround(i,row));
    }
  };

  function nextFunc(i,preset) {
    if (preset) {
      var next = preset[1];
    } else {
      var next = getNumber(i);
    }
    if(next){
      for (let index = 0; index < next.length; index++) {
        if (!buttons[next[index]].innerHTML && !minesLeft.includes(buttons[next[index]])) {
          var more = getNumber(next[index]);
        };
        if (more) {
          more.forEach(e=>{
            if (!next.includes(e)) {
              next.push(e);
            };
          });
        }
      };
    };
    if (preset) {
      preset[0].forEach(e=>{
        if (minesLeft.includes(e) && e.innerHTML === "") {
          mined();
        };
      });
    };
  };

  function mined(){
    minesLeft.forEach(e=>{
      e.style.backgroundColor='red';
      if (e.innerHTML === `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="4 0 27 24" overflow="visible" fill="none" stroke="red" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>`) {
        e.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="4 0 27 24" overflow="visible" fill="none" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>`
      }else{
      e.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="4.5 0 26.5 24" overflow="visible" fill="none" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
      };
    });
    buttons.forEach(e=>{
      e.disabled = true;
    });
    gameLost = true;
  };

  function getNumber(i){
    if (buttons[i].style.backgroundColor != "gray") {
      spacesLeft -= 1;
    };
    buttons[i].style.backgroundColor = "gray";
    if (spacesLeft === 0) {
      win();
    };
    let mineNumber = 0;
    let [surrounding,surroundingIndexes] = surround(i,num1);
    surrounding.forEach(tile=>{
      if (minesLeft.includes(tile)) {
        mineNumber+=1;
      }
    });
    if (mineNumber === 0) {
      return surroundingIndexes;
    } else {
      buttons[i].textContent = mineNumber;
    };
  };

  function getMines (i,num1) {
    minesLeft = setMines(i,num1);
    nextFunc(i);
    newGame = false;
  };

  function setMines (cur,row) {
    let mineList = [];
    let mineCount = Math.floor(buttons.length/5);
    let surrounding = surround(cur,row)[1];
    let tileTotal = buttons.length - 1 - surrounding.length;
      for (let i = 0; i < buttons.length; i++) {
        if (i!=cur && !surrounding.includes(i) && !mineList.includes(buttons[i])) {
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
    let surroundListIndexes = [];

    if (buttons[clk-1] && Number(buttons[clk-1].className)===Number(buttons[clk].className)) {
      surroundList.push(buttons[clk-1]);
      surroundListIndexes.push(clk-1);
    }

    if (buttons[clk+1] && Number(buttons[clk+1].className)===Number(buttons[clk].className)) {
      surroundList.push(buttons[clk+1]);
      surroundListIndexes.push(clk+1);
    }

    if (buttons[clk-row]) {
      surroundList.push(buttons[clk-row]);
      surroundListIndexes.push(clk-row);
      if (buttons[clk-row-1] && Number(buttons[clk-row-1].className)===Number(buttons[clk].className)-1) {
        surroundList.push(buttons[clk-row-1]);
        surroundListIndexes.push(clk-row-1);
      }
      if (buttons[clk-row+1] && Number(buttons[clk-row+1].className)===Number(buttons[clk].className)-1) {
        surroundList.push(buttons[clk-row+1]);
        surroundListIndexes.push(clk-row+1);
      }
    }

    if (buttons[clk+row]) {
      surroundList.push(buttons[clk+row]);
      surroundListIndexes.push(clk+row);
      if (buttons[clk+row-1] && Number(buttons[clk+row-1].className)===Number(buttons[clk].className)+1) {
        surroundList.push(buttons[clk+row-1]);
        surroundListIndexes.push(clk+row-1);
      }
      if (buttons[clk+row+1] && Number(buttons[clk+row+1].className)===Number(buttons[clk].className)+1) {
        surroundList.push(buttons[clk+row+1]);
        surroundListIndexes.push(clk+row+1);
      }
    }

    return [surroundList,surroundListIndexes];
    
  }
  });

});