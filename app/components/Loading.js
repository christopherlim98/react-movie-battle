import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
}

export default class Loading extends React.Component{
  state = { content: this.props.text }
  componentDidMount(){
    window.scrollTo(0, 0)
    const { speed, text } = this.props

    this.interval = window.setInterval(()=> {
      this.state.content === text + '...'
      ? this.setState({content: text})
      : this.setState(({content})=> ({content: content + '.'}))
    }, speed)
  }
  componentWillUnmount(){
    window.clearInterval(this.interval)
  }
  render(){
    return(
      <p style = {styles.content}>
        {this.state.content}
      </p>
    )
  }
}

Loading.propTypes = {
  speed: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
}

Loading.defaultProps = {
  speed: 100,
  text: 'Loading'
}
