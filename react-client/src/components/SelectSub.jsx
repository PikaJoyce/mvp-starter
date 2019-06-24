import React from 'react'

class SelectSub extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      memeType: '',
      phoneNumber: '+14159921199',
      message: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    let name = e.target.name
    let value = e.target.value
    // console.log('this search value', value)
    // console.log('this search name', name)
    this.setState({
      [name]: value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    let memes = this.state
    this.props.setSubreddit(memes)
  }

  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <label> Meme Type :
          &nbsp;
          <input type='text' name='memeType' onChange={e => this.onChange(e)} >
          </input>
        </label>
        &nbsp;
        <label>
          Send a message :
          &nbsp;
          <input type='text' name='message' onChange={e => this.onChange(e)}></input>
        </label>
        &nbsp;
        <label> Send meme to :
      &nbsp;
          <select name='phoneNumber' onChange={e => this.onChange(e)}>
            <option value='Joyce'>Joyce</option>
            <option value='Jimmy'>Jimmy</option>
            <option value='Winnie'>Winnie</option>
            <option value='Greg'>Greg</option>
            <option value='Maia'>Maia</option>
            <option value='Dickson'>Dickson</option>
            <option value='Vinh'>Vinh</option>
          </select>
        </label>
        &nbsp;
        <button type='submit'> MEME! </button>
      </form >
    )
  }
}

export default SelectSub;