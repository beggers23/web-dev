const movieHaus = {
  title: 'MovieHaus',
}

movieHaus.search = function(){
  document.querySelector('#movieForm').addEventListener('submit',function(e){
    e.preventDefault();
    let searchTerm = document.querySelector('#movieTitle').value;
    movieHaus.getMovie(searchTerm);
    document.querySelector('#posterSpot').innerHTML = '';
    document.querySelector('#textSpot').innerHTML = '';
  });
}

movieHaus.getMovie = function(search){
  fetch('http://www.omdbapi.com/?t='+search)
    .then(r => r.json())
    .then(response => movieHaus.displayMovie(response));
}

movieHaus.displayMovie = function(movie){
  console.log(movie);
  //Sets up the title
  let title = document.createElement('h1');
  title.appendChild(document.createTextNode(movie.Title));
  //Creates poster img
  let poster = document.createElement('img');
  poster.src = movie.Poster;
  poster.title = movie.Title +' ('+movie.Year+')';
  poster.alt = 'Poster Image for '+movie.Title

  document.querySelector('#posterSpot').appendChild(poster);
  document.querySelector('#textSpot').appendChild(title);
}

document.addEventListener('DOMContentLoaded', ()=>{
  movieHaus.search();
});
