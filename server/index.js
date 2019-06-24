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

app.get('/phoneNumber', (req, res) => {
  db.getPhonenumbers((err, result) => {
    if (err) {
      console.log('cannot get numbers', err)
      res.status(403).send(err)
    } else {
      console.log('got info from database', result)
      res.status(200).send(result)
    }
  })
})

app.post('/phoneNumber', (req, res) => {
  console.log('phoneNumber info', req.body)
  let info = req.body
  db.addPhonenumber(info, (err, result) => {
    if (err) {
      console.log('unable to add numberv to server', err)
      res.status(403).send('Unable to add to DB')
    } else {
      console.log('Wrote number to database', result)
      res.status(200).send('Added to DB')
    }
  })
})

app.post('/memes', (req, res) => {
  console.log('server req', req.body)
  let search = req.body.memeType
  let phoneNumber;
  let message = req.body.message
  var meme = {
    message: message,
    memeType: search,
    phoneNumber: phoneNumber
  }
  let imgUrl;

  db.findOne({ name: req.body.phoneNumber }, (err, result) => {
    if (err) {
      console.log('cannot get numbers', err)
    } else {
      console.log('got info from database', result.phoneNumber)
      meme.phoneNumber = result.phoneNumber
      phoneNumber = result.phoneNumber
    }
  })

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
          body: message,
          from: '+14157459363',
          mediaUrl: imgUrl,
          to: phoneNumber
        })
        .then(message => console.log('text sent', message.sid))
        .catch(err => console.log('cannot send message', err));
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// db.addMeme(meme, (err, result) => {
//   if (err) {
//     console.log('unable to add meme to server', err)
//   } else {
//     console.log('Wrote meme to database', result)
//   }
// })


app.listen(3000, function () {
  console.log('listening on port 3000!');
});

