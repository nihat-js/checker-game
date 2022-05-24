
var Game = {
    turn  : 2,
    selected_stone :  [0,0],
    selected_stone_type : 0,
    selected_stone_span : 0  ,
    possible_move : [],

    createStone  : function  (player,type='a'){
       
        let crt_img = document.createElement('img');
        crt_img.dataset.player=player;
        crt_img.dataset.type=type;
        crt_img.setAttribute("onclick","firstStep(event)");
         crt_img.src = 'images/checker-'+player+'-'+type + '.png';
        return crt_img;
    }
    
}


const startGame = () => {
    for(let i=1;i<=8;i++){
        for (let j=1;j<=8;j++){
            let color ;
            if (i%2==1 & j%2==1 || i%2==0 & j%2==0 ){ color = "primary"  }else{  color = "secondary " }
            document.querySelector('.game').innerHTML += ` <span class="${color}  for-1-${i}-${j} for-2-${9-i}-${j}"   >  </span> `;
        }
    }
   //  document.querySelector('.game .for-1-3-3').append(Game.createStone(1,'b'))
   //  document.querySelector('.game .for-1-5-7').append(Game.createStone(1,'b'))
   //  document.querySelector('.game .for-1-7-5').append(Game.createStone(1,'b'))
   //  document.querySelector('.game .for-1-3-5').append(Game.createStone(1,'b'))
   //  document.querySelector('.game .for-2-1-4').append(Game.createStone(2,'b'))
    
    for (let i=1;i<=3;i++){
        for( let j=1;j<=8;j++){
            if (i%2==1 & j%2==1 || i%2==0 & j%2==0 ){
                document.querySelector(`.game .for-1-${i}-${j}`).append( Game.createStone(1) );
            }
        }
    }
    
    for (let i=1;i<=3;i++){
        for( let j=1;j<=8;j++){
            if (i%2==1 & j%2==0 || i%2==0 & j%2==1 ){
                document.querySelector(`.game .for-2-${i}-${j}`).append( Game.createStone(2) );
            }
        }
    }
  
    

}
startGame();


function firstStep(event){
    let i,j,result_1,result_2;
    let player = event.target.dataset.player;
    if ( Game.turn != player ) return false;

      if (Game.selected_stone[0] != 0 ){
            Game.selected_stone_span.classList.remove('active');
            Game.possible_move.forEach((item)=>{ document.querySelector(item).classList.remove('green');  document.querySelector(item).setAttribute("onclick","")  })
        }
        
      i = parseInt(event.target.parentElement.classList[player].slice(6,7));
      j=  parseInt( event.target.parentElement.classList[player].slice(8)  );
      Game.selected_stone = [i,j];
      Game.selected_stone_span=document.querySelector(`.game .for-${Game.turn}-${Game.selected_stone[0]}-${Game.selected_stone[1]}`);
      Game.selected_stone_span.classList.add('active');
      Game.selected_stone_type = event.target.dataset.type;
      Game.selected_stone_type == 'a' ? stoneA() : stoneB();


   
    
    
}


function stoneA(i=Game.selected_stone[0],j = Game.selected_stone[1]) {
   let cases = [i+1,j+1,i+1,j-1]
   for(let index=0;index<cases.length;index=index+2){
      checkSlotStatus(cases[index],cases[index+1]) == 'empty' ? makeItGreen(cases[index],cases[index+1]) : '';
   }

   
   stoneA_1(i,j);
   stoneA_2(i,j);
   stoneA_3(i,j);
   stoneA_4(i,j);
}

function stoneA_1(i,j,trash=[]){
   if (checkSlotStatus(i + 1, j + 1) == 'opponent' & checkSlotStatus(i + 2, j + 2) == 'empty') {
      trash.push(i+1,j+1);
      makeItGreen(i + 2, j + 2,trash  )  ;
      stoneA_(i+2,j+2,trash,1);
   }
}
function stoneA_2(i,j,trash=[]){
   if (checkSlotStatus(i + 1, j - 1) == 'opponent' & checkSlotStatus(i + 2, j - 2) == 'empty') {
      trash.push(i+1,j-1);
      makeItGreen(i + 2, j - 2, trash);
      stoneA_(i+2,j-2, trash,2);
   }
}

function stoneA_3(i,j,trash=[]){
   if (checkSlotStatus(i - 1, j + 1) == 'opponent' & checkSlotStatus(i - 2, j + 2) == 'empty') {
      trash.push(i-1,j+1);
      makeItGreen(i - 2, j + 2, trash);
      stoneA_(i-2,j+2, trash,3);
   }
}
function stoneA_4(i,j,trash=[]){
   if (checkSlotStatus(i - 1, j - 1) == 'opponent' & checkSlotStatus(i - 2, j - 2) == 'empty') {
      trash.push(i-1,j-1);
      makeItGreen(i - 2, j - 2,trash , 3);
      stoneA_(i-2,j-2,trash,4);
   }
}



function stoneA_ (i,j,trash,next) {

   if (next==1) {
      stoneA_1(i,j,trash);stoneA_2(i,j,trash);stoneA_3(i,j,trash); //pass 4
   }else if(next==2){
      stoneA_1(i,j,trash);stoneA_2(i,j,trash);stoneA_4(i,j,trash); // pass 3
   }else if(next==3){
      stoneA_1(i,j,trash);stoneA_3(i,j);stoneA_4(i,j,trash); // pass 2
   }else if(next==4){
      stoneA_2(i,j,trash);stoneA_3(i,j,trash);stoneA_4(i,j,trash); // pass 1
   }

}





function stoneB(i=Game.selected_stone[0],j=Game.selected_stone[1]){
   stoneB_1(i,j);
   stoneB_2(i,j);
   stoneB_3(i,j);
   stoneB_4(i,j);
   
}

function stoneB_1(i,j,trash=[],){
   let callAgain = false;
   while(j<8){
      i++;j++;
         if ( checkSlotStatus(i,j) == 'empty'   ) {
            if (callAgain){
               stoneB_(i,j,trash,1);
            }
            makeItGreen(i,j,trash);
         }
         else if (checkSlotStatus(i,j) =='opponent' & checkSlotStatus(i+1,j+1) == 'empty' ){
            
            trash.push(i,j);
            stoneB_(i+1,j+1,trash,1);
            callAgain = true;
            
            
         }else{

            break;
         }
      }
   
}

function stoneB_2(i,j,trash=[]){
   let callAgain = false;
   while(j>1){
      i++;j--;
         
         if ( checkSlotStatus(i,j) == 'empty'  ) {
            if (callAgain){
               stoneB_(i,j,trash,2);
            }
            makeItGreen(i,j,trash);
         }
         else if (checkSlotStatus(i,j) == 'opponent' & checkSlotStatus(i+1,j-1) == 'empty' ){
            trash.push(i,j);
            stoneB_(i+1,j-1,trash,2);
            callAgain = true;
         }else{
            break;
         }
         
       
   }
}

function stoneB_3(i,j,trash=[],){
   let callAgain = false;
   while(j<8){
      i--;j++;

         if ( checkSlotStatus(i,j) == 'empty'  ) {
            makeItGreen(i,j,trash);
            if(callAgain ){
               stoneB_(i,j,trash,3);
            }
         }
         else if (checkSlotStatus(i,j) =='opponent' & checkSlotStatus(i-1,j+1) == 'empty' ){
            trash.push(i,j);
            stoneB_(i-1,j+1,trash,3);
            callAgain = true;
         }else{
            break;
         }
      
   }
}
function stoneB_4(i,j,trash=[]){
   let callAgain = false;
   while(j>1){
      i--;j--;
         if ( checkSlotStatus(i,j) == 'empty'  ) {
            if (callAgain){
               stoneB_(i,j,trash,4);
            }
            makeItGreen(i,j,trash);
         }
         else if (checkSlotStatus(i,j) =='opponent' & checkSlotStatus(i-1,j-1) == 'empty' ){
            callAgain = true;
            trash.push(i,j);
            stoneB_(i-1,j-1,trash,4);
         }else{
            break;
         }
      
   }
}

function stoneB_(i,j,trash,skip){

   if (skip==1){
      stoneB__2(i,j,trash);stoneB__3(i,j,trash,);
   }else if (skip==2){
      stoneB__1(i,j,trash,);stoneB__4(i,j,trash,);
   }else if (skip==3){
      stoneB__1(i,j,trash,);stoneB__4(i,j,trash,);
   }else if (skip==4){
      stoneB__2(i,j,trash,);stoneB__3(i,j,trash,);
   }
}


function stoneB__1(i,j,trash){
   let allowed = false;
   while(j<8){
      i++;j++;
      if (checkSlotStatus(i,j) =='empty' & allowed == true ){
         makeItGreen(i,j,trash);
         stoneB_(i,j,trash);
      }
      if (checkSlotStatus(i,j) =='opponent' & checkSlotStatus(i+1,j+1) == 'empty' ){
            trash.push(i,j);
            stoneB_(i+1,j+1,trash,1);
            allowed = true;
      
      }
   }

   
}

function stoneB__2(i,j,trash){
   let allowed = false;
   while(j>1){
      i++;j--;
      console.log(allowed);
      if (checkSlotStatus(i,j) == 'empty' & allowed === true ){
         console.log('gel');
         makeItGreen(i,j,trash);
         stoneB_(i,j,trash);
      }


      if (checkSlotStatus(i,j) =='opponent' & checkSlotStatus(i+1,j-1) == 'empty' ){
         trash.push(i,j);
         makeItGreen(i+1,j-1,trash);
         allowed = true;
         
      }
   }
   
   
}

function stoneB__3(i,j,trash){
   let allowed = false;
   while(j<8){
      i--;j++;

      if (checkSlotStatus(i,j) =='empty' & allowed == true ){
         makeItGreen(i,j,trash);
         stoneB_(i,j,trash);
      }


      if (checkSlotStatus(i,j) =='opponent' & checkSlotStatus(i-1,j+1) == 'empty' ){
            trash.push(i,j);
            allowed = true;
            stoneB_(i-1,j+1,trash,3);
         
            break;
      }
   }
   
}

function stoneB__4(i,j,trash){
   let allowed = false;
   while(j>1){
      i--;j--;

      if (checkSlotStatus(i,j) =='empty' & allowed == true ){
         makeItGreen(i,j,trash);
         stoneB_(i,j,trash);
      }


      if (checkSlotStatus(i,j) =='opponent' & checkSlotStatus(i-1,j-1) == 'empty' ){
            trash.push(i,j);
            allowed = true;
            stoneB_(i-1,j-1,trash,3);
         
            break;
      }
   }
   
}




function checkSlotStatus(i,j){
   let item = document.querySelector(`.for-${Game.turn}-${i}-${j}`) || false ;
   if (item === false){
       return false;
   }
   
   if (item.childElementCount == 0){
       return 'empty';
   }else if (item.children[0].dataset.player == Game.turn) {
       return 'same';
   }
   else{
       return 'opponent';
   }
   
   
}

function makeItGreen(x,y,trash = []){
    let g =document.querySelector(`.for-${Game.turn}-${x}-${y}`) 
    Game.possible_move.push(`.for-${Game.turn}-${x}-${y}`);
    g.classList.add('green');
    g.setAttribute('onclick',`moveStone(${x},${y},[` + trash.join(',') + `])` );
}

function moveStone(x,y,trash = []) {
   let i = Game.selected_stone[0]; let j = Game.selected_stone[1];
    document.querySelector(`.for-${Game.turn}-${i}-${j}`).children[0].remove();
    let type = (Game.selected_stone_type =='b' || x==8  ) ? 'b' :'a';
    document.querySelector(`.for-${Game.turn}-${x}-${y}`).append(Game.createStone(Game.turn,type));
    Game.possible_move.forEach((item)=>{ document.querySelector(item).classList.remove('green');  document.querySelector(item).setAttribute("onclick","")  })

    if (trash.length>0) {
      for (let index = 0;index<trash.length;index+=2){ 
        let son =  document.querySelector(`.for-${Game.turn}-${trash[index]}-${trash[index+1]}`) || false;
        if (son !=false & typeof son !== undefined) {
           son.children[0].remove();
        }
      }
   }

    Game.turn == 1 ? Game.turn =2 : Game.turn = 1 ;
    Game.selected_stone_span.classList.remove('active');
    Game.selected_stone = [0,0];
    Game.selected_stone_type = 0;
    Game.selected_stone_span = null;

}


