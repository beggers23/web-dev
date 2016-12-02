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
  if(movie.Response == true){
    //Sets up the title h1
    movieHaus.movieHeader(movie);

    //Sets up the details, actor, director and others
    movieHaus.movieDetails(movie);

    //Sets up the Details about Actors and Directors
    movieHaus.movieCastPlot(movie);

    //Creates poster img
    movieHaus.moviePoster(movie);
  }
  else {
    movieHaus.failedSearch();
  }
}

movieHaus.failedSearch = function(){
  
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

  let runtime = document.createElement('h4');
  runtime.className = 'runtime';
  runtime.appendChild(document.createTextNode('Runtime: '+movie.Runtime));

  detailsBox.appendChild(metaScore);
  detailsBox.appendChild(imdbRating);
  detailsBox.appendChild(runtime);

}

movieHaus.movieCastPlot = function(movie){
  let castPlot = document.createElement('div');
  castPlot.className = 'castPlot';

  let plotBox = document.createElement('div');
  plotBox.className = 'plotBox';


  let plot = document.createElement('p');
  plot.className = 'moviePlot';
  plot.appendChild(document.createTextNode(movie.Plot));
  plotBox.appendChild(plot);

  let awards = document.createElement('p');
  awards.className = 'movieAwards';
  awards.appendChild(document.createTextNode('Awards: '+movie.Awards));
  plotBox.appendChild(awards);


  let casting = document.createElement('div');
  casting.className = 'castBox';

  let director = document.createElement('p');
  director.appendChild(document.createTextNode('Director: '+movie.Director));
  casting.appendChild(director);

  let actors = document.createElement('p');
  actors.appendChild(document.createTextNode('Actors: '+movie.Actors));
  casting.appendChild(actors);

  let writers = document.createElement('p');
  writers.appendChild(document.createTextNode('Writer: '+movie.Writer));
  casting.appendChild(writers);


  castPlot.appendChild(plotBox);
  castPlot.appendChild(casting);
  document.querySelector('#textSpot').appendChild(castPlot);
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
