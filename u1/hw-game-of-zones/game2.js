console.log('game2.js linked');

let game = {
  title: 'Game of Zones',
  zones: ['zone-1', 'zone-2','zone-3','zone-4'],
  score: 0,
};

///////////////////////////////////////
//Shuffles the order of the zones.

game.shuffle = function(){
  const array = game.zones;
  for(let i=array.length-1; i>0; i--){
    let j = Math.floor(Math.random() * (i+1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}



game.checkZone = function(){
  // With the order shuffled, if the zone that is hovered is
  $('.zone').mouseenter(function(e){
    const goal = e.target.id;
    const target = $('#'+e.target.id);
    //the first place in the ordered array,
    if(target.attr('class') != 'zone green clicked'){
      if(goal === game.zones[game.score]){
        // then it should turn green
        target.addClass('green');
        target.removeClass('white');
        //And be allowed to be clicked
        game.allowClick(target);
      }
      else{
        //If not, it should turn red
        target.addClass('red');
        target.removeClass('white');
      }
    }
  });
  //When the mouse leaves, change the color back to white
  $('.zone').mouseleave(function(e){
    const goal = e.target.id;
    const target = $('#'+e.target.id);
    if(target.attr('class') != 'zone green clicked'){
      target.addClass('white');
      target.removeClass('green');
      target.removeClass('red');
    }
  })
}
//Allows the click function to the target zone
game.allowClick = function(target){
  target.click(function(e){
    //When Clicked it adds the class of click and updates the score of the game
    target.toggleClass('clicked');
    game.score = $('.zone.green.clicked').length;
    if(game.score === 4){
      //Game is complete when the score equals 4 and starts to turn the zones back to white
      console.log('YOU WIN!');
      game.resetZones(0);
    }
  });
}
//Will change green zones to red, red zones to white
game.resetZones = function(i){
  let greenTarget = $('#'+game.zones[i]);
  let redTarget = $('#'+game.zones[i-1]);

  //It needs to run every one second

  //When resetZones is called, I pass through 0 as i so it will start with the first zone in the array of shuffled zones. Then every second it will call itself after changing the first green box to red. Then it will change the next green box to red, and the first red box to green and so on.
  game.interval = setTimeout(function(){
    if(greenTarget.attr('class') === 'zone green clicked'){
      greenTarget.removeClass('green clicked');
      greenTarget.addClass('red');
      game.resetZones(i+1);
    }
    if(redTarget.attr('class') === 'zone red'){
      redTarget.removeClass('red');
    }
  }, 1000);

  if(i==3){
    //if i reaches the length of the zones array call reset after 1 second so the last redZone can be changed to white
    setTimeout(function(){
      game.reset();
    },1000);
  }
}


//Clears the interval from reset
game.reset = function(){
  game.interval = 0;
  //reshuffles the zones
  game.shuffle();

  //sets the score back to 0
  game.score = 0;
}


//shuffles the zones and starts the game
$(document).ready(function(){
  game.shuffle();
  game.checkZone();
})
