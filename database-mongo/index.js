var mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/memes';
mongoose.connect(mongoURI, { useMongoClient: true });

var db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

// var itemSchema = mongoose.Schema({
//   quantity: Number,
//   description: String
// });

// var Item = mongoose.model('Item', itemSchema);

// var selectAll = function (callback) {
//   BobaShop.find({}, function (err, menuItems) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, menuItems);
//     }
//   });
// };

var memeSchema = mongoose.Schema({
  memeType: String,
  phoneNumber: String,
  imgUrl: String,
  message: String
});

var Meme = mongoose.model('Meme', memeSchema);

module.exports.addMeme = (data, cb) => {
  console.log("about to save meme to db", data)
  let meme = new Meme(data);

  meme.save(meme, (err, result) => {
    if (err) {
      console.log("An error as occured posting to db");
      cb(err, null)
    } else {
      console.log("Successfully posted to db: ", result);
      cb(null, result)
    }
  })
}

