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

  //Sets up the title h1
  movieHaus.movieHeader(movie);

  //Sets up the details, actor, director and others
  movieHaus.movieDetails(movie);

  //Sets up the Plot description
  movieHaus.moviePlot(movie);

  //Sets up the Details about Actors and Directors
  movieHaus.movieCast(movie);

  //Creates poster img
  movieHaus.moviePoster(movie);
}

movieHaus.movieHeader = function( movie ){
  let titleBox = document.createElement('div');
  titleBox.className = 'titleBox';
  document.querySelector('#textSpot').appendChild(titleBox);

  let title = document.createElement('h1');
  title.appendChild(document.createTextNode(movie.Title));
  title.className = 'title';

  let year = document.createElement('span');
  year.className = 'year';
  year.appendChild(document.createTextNode(' ('+movie.Year+') ['+movie.Rated+']'));
  title.appendChild(year);

  titleBox.appendChild(title);
}

movieHaus.movieDetails = function(movie){
  let detailsBox = document.createElement('div');
  detailsBox.className = 'detailsBox';
  document.querySelector('#textSpot').appendChild(detailsBox);

  let metaScore = document.createElement('h4');
  metaScore.className = 'metaScore';
  metaScore.appendChild(document.createTextNode('Metascore: '+movie.Metascore));

  let imdbRating = document.createElement('h4');
  imdbRating.className = 'imdbRating';
  imdbRating.innerHTML = '<a class="ratingLink" href="http://www.imdb.com/title/'+movie.imdbID+'">IMDB Rating: '+movie.imdbRating+'</a>';

  detailsBox.appendChild(metaScore);
  detailsBox.appendChild(imdbRating);

}


movieHaus.moviePlot = function(movie){
  let plot = document.createElement('p');
  plot.className = 'moviePlot';
  plot.appendChild(document.createTextNode(movie.Plot));

  document.querySelector('#textSpot').appendChild(plot);
}

movieHaus.movieCast = function(movie){

}


movieHaus.moviePoster = function(movie){
  let poster = document.createElement('img');
  poster.className = 'moviePoster';
  poster.src = movie.Poster;
  poster.title = movie.Title +' ('+movie.Year+')';
  poster.alt = 'Poster Image for '+movie.Title;

  //Appends assignments to appropriate locations
  document.querySelector('#posterSpot').appendChild(poster);
}

document.addEventListener('DOMContentLoaded', ()=>{
  movieHaus.search();
});
