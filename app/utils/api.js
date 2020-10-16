const imdb_key = "k_gJ2dA127"
const omdb_key = "2c08432a"
const tmdb_key = "32c3e11482c274e139254ddaa1dcadd8"

function getGenres (){
  return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdb_key}&language=en-US`)
    .then((res) => res.json())
    .then((result) => {
      return result.genres
    })
}

function getGenre (genreName){
  return getGenres()
    .then((genres) => genres.filter(
      function(genre){
        if (genre.name == genreName){
          return genre
        }
      }))
}

export async function getMoviesByGenre (genreName, pageNo){
  let genreID
  const toreturn = {}

  if (genreName == 'All'){
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${tmdb_key}&&language=en-US&sort_by=popularity.desc&page=${pageNo}`)
        .then((res) => res.json())
        .then((movies) => {
          return movies.results
        })
  }else{
  await getGenre(genreName)
    .then((genre) => genre[0].id)
    .then((genreid) => {
      genreID = genreid
    })

  return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${tmdb_key}&&language=en-US&sort_by=popularity.desc&page=${pageNo}&with_genres=${genreID}`)
    .then((res) => res.json())
    .then((movies) => {

      return movies.results
    })
  }

}

export function getMovie (title) {
  return fetch(`https://imdb-api.com/en/API/SearchMovie/${imdb_key}/${title}`)
    .then((res) => res.json())
    .then((movie) => {
      if (movie.errorMessage.length > 0) {
        throw new Error(movie.errorMessage)
      }

      return movie
    })
}

export function addOMDBratings(movies){

  return Promise.all(
    movies.map(async (movie) => {
      return await getOMDBMovie(movie.title)
        .then((data) => {
          movie['omdb'] = data.Ratings
          movie['imdbID'] = data.imdbID
          return movie
        })
    })
  )
}


function getOMDBMovie(title) {
  return fetch(`https://omdbapi.com/?apikey=${omdb_key}&t=${title}`)
    .then((res) => res.json())
    .then((movie) => {
      return movie
    })
}

export function getIMDBMovie (title, releaseDate) {
  return fetch(`https://imdb-api.com/en/API/SearchMovie/${imdb_key}/${title}`)
    .then((res) => res.json())
    .then((movies) => {
      if (movies.errorMessage.length > 0) {
        throw new Error(movie.errorMessage)
      }

      const movieResults = movies.results
      const year = `(${releaseDate.slice(0, 4)})`

      movieResults.filter((movie) => {

        if (movie.description.slice(0,6) == releaseDate ){
          return movie
        }
      })

      throw new Error('no matching movie found on IMDB')
    })
}
