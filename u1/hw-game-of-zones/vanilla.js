console.log('Vanilla Game');

const game = {
  title: 'Game of Zones Vanilla',
  score: 0,
  zones: ['zone-1', 'zone-2', 'zone-3', 'zone-4']
}

//Start of game should shuffle the array of the zones.
game.shuffleZones = function(){
  let array = game.zones;
  array.sort(function() { return 0.5 - Math.random() });
}

//Change color of zone when mouse enters
game.checkZones = function(){
  //Gathers all of the zones and creates and array
  let zones = document.querySelectorAll('.zone');
  //Adds an event listener to each zone
  for(let i=0; i<zones.length; i++){
    //The mouse over event listener will check to make sure the zone is not green and clicked
    zones[i].addEventListener('mouseover', function(e){
      //if true, it will add a color and add the click event handler
      if(e.target.className != 'zone green clicked'){
        game.addColor(e);
        game.addClick(e);
      }
    }, false);
    //The mouseout event listener will check to see if the class is not zone green and clicked
    zones[i].addEventListener('mouseout',function(e){
      if(e.target.className === 'zone red clicked'){
        game.removeColor(e);
      }
      //If true, the mouseout event will remove the color
      else if(e.target.className != 'zone green clicked'){
        game.removeColor(e);
      }
    }, false);
  }
}


game.addColor = function(e){
  let index = game.score;
  if(e.target.id === game.zones[index]){
    e.target.className = 'zone green';
  }else{
    //Check to see if a zone should change to red
    e.target.className = 'zone red';
  }
  // console.log(e.target.className);
}

//Only called on the mouse leave
game.removeColor = function(e){
  //Checks the color of the zone and removes the color
  if(e.target.className === 'zone red clicked'){
    //If clicked and red, wait a second then remove the class of red
    console.log('Cannot click this');
    setTimeout(function(){
      e.target.className = 'zone'
    }, 1000);
  }
  else if(e.target.className === 'zone green'){
    e.target.className = 'zone';
  }else if(e.target.className === 'zone red'){
    e.target.className = 'zone';
  }
}

game.addClick = function(e){
  e.target.addEventListener('click', function(){
    //If clicked, and green,
    if(e.target.className === 'zone green'){
      // add the class of clicked
      e.target.className = 'zone green clicked';
      //Add one to the game score
      game.score += 1;
      if(game.score === 4){
        game.win();
      }
    }
    //If target is red, add clicked class
    else if(e.target.className === 'zone red'){
      e.target.className = 'zone red clicked';
      game.removeColor(e);
    }
    else if( e.target.className === 'zone green clicked'){
      //And is clicked again, remove the clicked class
      e.target.className = 'zone green';
      //And subtract one from the score
      game.score -= 1;
    }
  })
}

//When all zones are green (score === 4), log a congratulations statement
game.win = function(){
  console.log('YOU WIN!');
}



document.addEventListener('DOMContentLoaded', () => {
  game.shuffleZones();
  game.checkZones();
});
