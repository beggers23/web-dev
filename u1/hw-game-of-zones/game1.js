console.log('Linked');

//any iteration, use let
//any hold variable use const
const game = {
  title: 'Game of Zones',
};


//Game One Psedo Code


$(document).ready(function(){
  // $('body').mousemove(function(e){
  //   console.log('moving mouse');
  // })//Get some verification that mouse move works.

  /////////////////////////////////////////////
  //Change mouse move to mouse enter/mouse leave on the boxes
  // $('.zone').mouseenter(function(e){
  //   console.log(e.target.id);
  // });
  // $('.zone').mouseleave(function(e){
  //   console.log(e.target.id);
  // });

  /////////////////////////////////////////////
  //Get the background of the boxes to change to green when the mouse enters
  $('.zone').mouseenter(function(e){
    const target = $('#'+e.target.id);
    if(target.attr('class') != 'zone green'){
      target.addClass('green');
      target.removeClass('white');
    }
  });

  /////////////////////////////////////////////
  //Then get the boxes to change back to white when the mouse leaves the box.

  $('.zone').mouseleave(function(e){
    //Only allow the background to change if the zone does not have the class of green
    const target = $('#'+e.target.id);
    if(target.attr('class') != 'zone green clicked'){
      target.addClass('white');
      target.removeClass('green');
    }
  });

  /////////////////////////////////////////////
  //When the box is clicked, add the green class to the box
  $('.zone').click(function(e){
    const target = $('#'+e.target.id);
    target.toggleClass('clicked');
    game.checkStatus();
  });

  /////////////////////////////////////////////
  //When all zones are checked green, create a congratulations message to be sent to the console

  game.checkStatus = function(){
    game.score = $('.zone.green').length;
    if(game.score === 4){
      console.log('YOU WIN!');
      game.makePretty();
    }
  }

  /////////////////////////////////////////////
  game.makePretty = function(){
    const zones = $('.zone');
    for(let i=0; i<zones.length; i++){
      setTimeout(function(){
        $(zones[i]).removeClass('green').addClass('yellow');
      }, 1000);

      setTimeout(function(){
        $(zones[i]).removeClass('yellow').addClass('red');
      }, 2000);

      setTimeout(function(){
        $(zones[i]).removeClass('red clicked').addClass('white');
      }, 3000);
    }
  }


  /////////////////////////////////////////////
  //Allows game to be reset back to blank zones
  $('#reset').click(function(e){
    let zones = $('.zone');
    for(let i=0; i<zones.length;i++){
      if($(zones[i]).attr('class') === 'zone green clicked'){
        $(zones[i]).removeClass('green clicked');
      }
    }
  });

});
