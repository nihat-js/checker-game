

var Game = {
    turn  : 2,
    selected_stone :  [0,0],
    selected_stone_span : 0  ,
    possible_move : [],

    createStone  : function  (player){
        let crt_img = document.createElement('img');
        crt_img.dataset.player=player;
        crt_img.setAttribute("onclick","firstStep(event)");
        crt_img.src = 'images/checker-'+player+'.png';
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
    let player = event.target.dataset.player;
    if (Game.turn != player)
        return false;
    if (Game.selected_stone[0] != 0 ){
            Game.selected_stone_span.classList.remove('active');
            Game.possible_move.forEach((item)=>{ document.querySelector(item).classList.remove('green');  document.querySelector(item).setAttribute("onclick","")  })
            Game.possible_move =[];
    }

    Game.selected_stone = [parseInt(event.target.parentElement.classList[player].slice(6,7)) , parseInt(event.target.parentElement.classList[player].slice(8)) ];
    console.log(Game.selected_stone);
    Game.selected_stone_span=document.querySelector(`.game .for-${Game.turn}-${Game.selected_stone[0]}-${Game.selected_stone[1]}`);
    Game.selected_stone_span.classList.add('active');

    secondStep();
    

}

function secondStep(i=Game.selected_stone[0],j=Game.selected_stone[1],trash=[],counter=10){

    trash_1 = trash;
    trash_2 = trash ;
    trash_3 = trash ;
    trash_4 = trash;

    if (trash.length==0){
        if ( checkSlotStatus(i+1,j+1) == 'empty' ) {
            makeItGreen(i+1,j+1,trash);
        }
        if ( checkSlotStatus(i+1,j-1) =='empty') {
            makeItGreen(i+1,j-1,trash);
        } 
    }

    if ( checkSlotStatus(i+1,j+1) =='opponent' & checkSlotStatus(i+2,j+2) == 'empty' ){
        trash_1.push(i+1, j+1);
        makeItGreen(i+2,j+2,trash_1);
        secondStep(i+2,j+2);
    }
    if ( checkSlotStatus(i+1,j-1) =='opponent' & checkSlotStatus(i+2,j-2) == 'empty' ){
        trash_2.push(i+1,j-1);
        makeItGreen(i+2,j-2,trash_1);
        secondStep(i+2,j-2);
    }
    if ( checkSlotStatus(i-1,j+1) =='opponent' & checkSlotStatus(i-2,j+2) == 'empty' ){
        trash_3.push(i-1,j+1);
        makeItGreen(i-2,j+2,trash_1);
        secondStep(i-2,j+2);
        
    }
    if ( checkSlotStatus(i-1,j-1) =='opponent' & checkSlotStatus(i-2,j-2) == 'empty' ){
        trash_4.push(i-1,j-1);
        makeItGreen(i-2,j-2,trash_4);
        secondStep(i-2,j-2);
    }

  

}



function makeItGreen(x,y,trash = []){
    let g =document.querySelector(`.for-${Game.turn}-${x}-${y}`) 
    Game.possible_move.push(`.for-${Game.turn}-${x}-${y}`);
    g.classList.add('green');
    g.setAttribute("onclick",`moveStone(${x},${y})`);


}


function moveStone(x,y,trash=0){
    let i = Game.selected_stone[0] ; 
    let j = Game.selected_stone[1];
 

    document.querySelector(`.for-${Game.turn}-${i}-${j}`).children[0].remove();
    document.querySelector(`.for-${Game.turn}-${x}-${y}`).append(Game.createStone(Game.turn));
    Game.possible_move.forEach((item)=>{ document.querySelector(item).classList.remove('green');  document.querySelector(item).removeEventListener('click',moveStone)  })
    Game.possible_move =[];
    Game.turn == 1 ? Game.turn =2 : Game.turn = 1 ;
    Game.selected_stone_span.classList.remove('active');
    Game.selected_stone = [0,0];
    Game.selected_stone_span = null;
    if (trash.length>0){
    for(let i =0;i<trash.length;i+2){
        document.querySelector(`.for-${Game.turn}-${trash[i]}-${trash[i+1]}`).children[0].remove();
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






