import React from 'react'
import PropTypes from 'prop-types'
import {getMovie} from '../utils/api'
import Results from './Results'

class MovieInput extends React.Component{
  state = {
    movie: ''
  }

  handleSubmit = () => {
    event.preventDefault()

    this.props.onSubmit(this.state.movie)
  }

  handleChange = (event) =>{
    this.setState({
       movie: event.target.value
    })
  }

  render(){
    return(
      <form className = 'column movie' onSubmit = {this.handleSubmit}>
        <label htmlFor = 'movie-title' className = 'movie-label'>
          {this.props.label}
        </label>
        <div className='row movie-input'>
          <input
            type = 'text'
            id = 'movie'
            className = 'input-light'
            autoComplete = 'off'
            value = {this.state.movie}
            onChange = {this.handleChange}
          />
          <button
            disabled = {!this.state.movie}
            className = {`btn dark-btn`}
            type = 'submit'>
              Submit
          </button>
        </div>
      </form>
    )
  }
}

MovieInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default class Battle extends React.Component {
  state = {
    movieOne: ''
  }

  handleSubmit = (id, movie) => {
    this.setState({
      [id]: movie
    })
  }

  render(){
    const { movieOne } = this.state

    return(
      <React.Fragment>
        <MovieInput
          label = 'Movie One'
          onSubmit = {(movie) => this.handleSubmit('movieOne', movie)}
        />
        {movieOne && (
          <Results movieOne = {movieOne}/>
        )}
      </React.Fragment>
    )
  }

}
