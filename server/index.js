const app = require('./app')
const port = 4000
require('dotenv').config()


const mongoose = require('mongoose');

mongoose.connect(process.env.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
