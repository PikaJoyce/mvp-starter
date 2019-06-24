import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SelectSub from './components/SelectSub.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.setSubreddit = this.setSubreddit.bind(this);
  }


  setSubreddit(memeInfo) {
    //console.log(memeInfo)
    axios.post('/memes', memeInfo)
      .then(res => {
        console.log('response in client', res.data)
        let meme = res.data
        this.setState({
          meme
        })
      })
      .catch(err => console.log('an error has occured in the client', err))
  }

  render() {
    if (!this.state.meme) {
      return (
        <div>
          <h1>Welcome, we generate really bad memes here</h1>
          <SelectSub setSubreddit={this.setSubreddit} />
        </div>
      )
    }

    else {
      return (
        <div>
          <h1>Congrats, here's a bad meme for you</h1>
          <img src={this.state.meme}></img>
          <h2>Want to go again?</h2>
          <SelectSub setSubreddit={this.setSubreddit} />
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));