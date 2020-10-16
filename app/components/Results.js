import React from 'react'
import {getMovie, getMoviesByGenre } from '../utils/api'


export default class Results extends React.Component{
  state = {
    movie: null,
    error: null
  }

  componentDidMount () {
    const { movieOne } = this.props

    getMoviesByGenre('romance')
      .then((movies) => console.log(movies))
      .catch((error) => {
        console.warn('error fetching movies by Genre', error)
      })

    getMovie(movieOne)
      .then((movie) => this.setState({
        movie,
        error: null
      }))
      .catch((error) => {
        console.warn('Error fetching movie: ', error)

        this.setState({
          error: `There was an error fetching movie.`
        })
      })
  }
  render(){
    const {movie, error} = this.state
    return(
      <React.Fragment>
        {error && <p>{error}</p>}
        {movie && <pre>{JSON.stringify(movie, null, 2)}</pre>}
      </React.Fragment>
    )
  }
}

