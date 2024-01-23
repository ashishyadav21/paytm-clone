const app = require('./app')
const port = 4000

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ashishplus4me:SqxO1bPDZ1XNW3a4@cluster0.edoddx8.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})