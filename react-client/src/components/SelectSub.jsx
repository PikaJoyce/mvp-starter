import React from 'react'

class SelectSub extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      memeType: '',
      phoneNumber: '+14159921199'
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.sendTo = this.sendTo.bind(this);
  }

  onChange(e) {
    console.log('this search value', e.target.value)
    let memeType = e.target.value
    this.setState({
      memeType
    })
  }

  sendTo(e) {
    let phoneNumber = e.target.value
    this.setState({ phoneNumber })
  }

  onSubmit(e) {
    e.preventDefault();
    let memes = this.state
    this.props.setSubreddit(memes)
  }

  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <label> Meme Type:
          <input type='text' onChange={e => this.onChange(e)} >
          </input>
        </label>
        &nbsp;
        <label> Send meme to :
          &nbsp;
          <select onChange={e => this.sendTo(e)}>
            <option value='+14159921199'>Joyce</option>
          </select>
        </label>
        &nbsp;
        <button type='submit'> MEME! </button>
      </form >
    )
  }
}

export default SelectSub;