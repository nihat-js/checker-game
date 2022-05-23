// switch(result_1){
//     case 'empty' :
//          makeItGreen(1,i,j,i+1,j+1,[])
//          break;
//      case 'same' :

//          break;
//      case 'opponent' :
//          captureOpponent(1,i,j,i+1,j+1)
//          break ;
     
//      default : 
//          break;
// // }

function showPositions(event){
    let i,j ;
    let player = event.target.dataset.player;
    if (   Game.turn  == player & Game.selected_stone == 0 ){
        Game.selected_stone = event.target;
        Game.selected_stone.parentElement.classList.add('active');
    
        j =  parseInt( event.target.parentElement.id.slice(3) );
        i =  parseInt (event.target.parentElement.id.slice(1,2) );
        console.log(i,j);
    
        if (player ==1 & j != 1 & j !=8 ){  foo_(i+1,j-1);  foo_(i+1,j+1); }
        else if  (player ==1 & j==1 ){
            foo_(i+1,j+1);
        }else if (player ==1 & j==8){
            foo_(i+1,j-1);
        }
    
        if (player ==2 & j != 1 & j !=8 ){
    
            foo_(i-1,j-1);
            foo_(i-1,j+1);
        }else if  (player ==2 & j==1 ){
            foo_(i-1,j+1);
        }else if (player ==2 & j==8){
            foo_(i+1,j-1);       
        }
    
    }else if ( Game.turn == player & Game.selected_stone != 0){
        clear_();
        showPositions();
    }

   
    

}


function foo_ (x,y) {
    let g =  document.getElementById('_'+(x)+"-"+(y)) ;
    if ( g.childElementCount == 0 ){
        g.classList.add('possible');
        Game.possible_move.push(g);
        g.addEventListener("click",move_);
        return true;
    }
    else {
        return false;
    }
    
}

function  move_ (event){
    event.target.innerHTML = Game.createStone(Game.turn) ;
    Game.selected_stone.remove();
    clear_();
    Game.turn == 1 ? Game.turn = 2 : Game.turn = 1;

    
}

function clear_ (){
    document.querySelector('.active').classList.remove('active');
    Game.possible_move.forEach((item)=>{ item.classList.remove('possible'); item.removeEventListener('click',move_); })
    Game.selected_stone = 0;
    Game.possible_move = [];
}


function playerOneMoves(){
    let start
}