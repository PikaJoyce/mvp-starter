var express = require('express');
var bodyParser = require('body-parser');
var memes = require('../database-mongo');
const getMemeUrls = require('get-meme-urls');
const apiKey = require('../meme_api.js')
const db = require('../database-mongo/index.js')
var twilio = require('twilio');
const auth = require('../twilio_api.js')
const client = new twilio(auth.accountSid, auth.authToken);


var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.json());

var randomIdx = () => (Math.floor(Math.random() * (13 - 1) + 1))

app.post('/memes', (req, res) => {
  console.log('server req', req.body)
  let search = req.body.memeType
  let phoneNumber = req.body.phoneNumber
  var meme = {
    memeType: search,
    phoneNumber: phoneNumber
  }
  let imgUrl;
  getMemeUrls(search, apiKey, randomIdx(), randomIdx())
    .then(result => {
      imgUrl = result[randomIdx()]
      res.status(200).send(imgUrl)
    })
    .then(() => {
      meme.imgUrl = imgUrl
      console.log('send this to db: ', meme)
      client.messages
        .create({
          body: 'A meme a day keeps the doctor awei',
          from: '+14157459363',
          mediaUrl: imgUrl,
          to: phoneNumber
        })
        .then(message => console.log('text sent', message.sid))
        .catch(err => console.log('cannot send message', err));

      db.addMeme(meme, (err, result) => {
        if (err) {
          console.log('unable to add meme to server', err)
        } else {
          console.log('Wrote meme to database', result)
        }
      })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

app.listen(3000, function () {
  console.log('listening on port 3000!');
});

