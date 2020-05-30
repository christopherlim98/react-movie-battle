import React from 'react'
import PropTypes from 'prop-types'
import { addOMDBratings, getMoviesByGenre } from '../utils/api'
import queryString from 'query-string'
import 'bootstrap/dist/css/bootstrap.min.css'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Loading from './Loading'
import { FaStar } from 'react-icons/fa'


function GenreNav( {selected, onUpdateGenre}){
  const genres = [ 'All', 'Action', 'Comedy', 'Horror', 'Romance', 'Thriller' ]

  const moregenres = ['Adventure', 'Animation', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Music', 'Mystery', 'War', 'Science Fiction']
  return(
    <ul className = 'flex-center'>
      {genres.map((genre) => (
        <li key = {genre}>
          <button
            className = 'btn-clear nav-link'
            style = {genre === selected ? { color: 'rgb(187, 46, 31)' } : null}
            onClick = {() => onUpdateGenre(genre)}>
              {genre}
          </button>
        </li>
      ))}
      <DropdownButton
        alignRight
        className = 'btn-clear nav-link'
        title="More Genres"
        id="dropdown-menu-align-right"
        variant = "danger"
         >
          {moregenres.map((genre) =>(
            <Dropdown.Item
              key = {genre}
              eventKey= {genre}
              style = {genre === selected ? { color: 'rgb(187, 46, 31)' } : null}
              onClick = {() => onUpdateGenre(genre)} >
              {genre}
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />
       </DropdownButton>
    </ul>

  )
}

GenreNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateGenre: PropTypes.func.isRequired
}

function PageNav( {selected, onUpdatePage}){
  const pagenos = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ]

  return(
    <ul className = 'flex-center'>
      {pagenos.map((pageno) => (
        <li key = {pageno}>
          <button
            className = 'btn-clear nav-link'
            style = {pageno === selected ? { color: 'rgb(187, 46, 31)' } : null}
            onClick = {() => onUpdatePage(pageno)}>
              {pageno}
          </button>
        </li>
      ))}
    </ul>
  )
}

function getReview(omdb){
  if (!omdb){
    return undefined
  }
  return omdb.find((review) => review['Source'] == "Internet Movie Database")|| omdb.find((review) => review['Source'] == "Rotten Tomatoes")

}

function GenreGrid ({movies, children}){
  return (
    <ul className = 'grid space-around'>
      {movies.map((movie) => {
        const { id, title, poster_path, release_date, vote_average, vote_count, omdb, imdbID} = movie
        const review = getReview(omdb) ? getReview(omdb)['Value'].slice(0,3) : 'CMI'
        return(
            <li
              className = 'card'
              key = {id}>
              <a href =  {`https://www.themoviedb.org/movie/${id}`} target="_blank" >
                <img
                  className = 'poster'
                  src = {`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  alt = {`Movie poster for ${title}`}
                />
              </a>
              <ul className = 'card-list'>

                <div className = 'flex-center ratings'>
                  <li>
                    <a href =  {`https://www.themoviedb.org/movie/${id}`} target="_blank" >
                      <Button variant="dark" className = 'ratings'>
                        TMDB
                        <Badge variant="light" className = 'badge'> {`  ${vote_average}   `}
                        </Badge>
                      </Button>
                    </a>
                    <a href = {`https://imdb.com/title/${imdbID}`} target="_blank" >
                      <Button variant="success" className = 'ratings'>
                        IMDB
                        <Badge variant="light" className = 'badge'>

                          {`  ${review}   `}
                        </Badge>
                    </Button>
                    </a>
                  </li>
                </div>

              </ul>
            </li>
        )
      })}
      {children}
    </ul>
  )
}

GenreGrid.propTypes = {
  movies: PropTypes.array.isRequired
}


export default class Popular extends React.Component {
  state = {
    selectedGenre: 'All',
    movies : {},
    selectedPage: '1',
    error: null
  }
  componentDidMount () {
    this.updateGenre(this.state.selectedGenre)
  }


  updateGenre = (selectedGenre) => {
    this.setState({
      selectedGenre,
      selectedPage: '1',
      error: null
    })

    var query = `${selectedGenre}&1`
    if (!this.state.movies[query]){
      getMoviesByGenre(selectedGenre, this.state.selectedPage)
        .then ((data) => addOMDBratings(data))
        .then ((data) => {
          console.log('screams!', data)
          this.setState(({movies}) => ({
            movies: {
              ...movies,
              [query]: data
            }
          }))
        })
        .catch((error) => {
          this.setState({
            error: `There was an error fetching movies.`
          })
        })
    }
  }

  updatePage = (selectedPage) => {
    this.setState({
      selectedPage,
      error:null
    })

    var query = `${this.state.selectedGenre}&${selectedPage}`
    if (!this.state.movies[query]){
      getMoviesByGenre(this.state.selectedGenre, selectedPage)
        .then ((data) => addOMDBratings(data))
        .then ((data) => {
          this.setState(({movies}) => ({
            movies: {
              ...movies,
              [query]: data
            }
          }))
        })
        .catch((error) => {
          this.setState({
            error: `There was an error fetching movies.`
          })
        })
    }
  }

  isLoading = () => {
    const { selectedGenre, selectedPage, movies, error } = this.state
    var query = `${this.state.selectedGenre}&${selectedPage}`
    return !movies[query] && error === null

  }

  render(){
    window.scrollTo(0, 0)

    const {selectedGenre, selectedPage, movies, error} = this.state

    const query = `${selectedGenre}&${selectedPage}`
    return (
      <React.Fragment>
        <GenreNav
          selected = {selectedGenre}
          onUpdateGenre = {this.updateGenre}
        />

        {this.isLoading() && <Loading text = 'Fetching Movies'/>}

        {movies[query] &&
            <GenreGrid movies = {movies[query]}>
              <PageNav
              selected = {selectedPage}
               onUpdatePage = {this.updatePage}
              />
            </GenreGrid>
        }



      </React.Fragment>
    )
  }

}

