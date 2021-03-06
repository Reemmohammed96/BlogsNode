const express = require('express');
const mongoose=require('mongoose');
const {getAll}=require('./controllers/blog')
const cors=require('cors')
mongoose.connect('mongodb://localhost:27017/blogs', { useUnifiedTopology: true });
const routes = require('./routes');
const app = express();
app.use(cors())
app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use('/userImg', express.static('userImg'))

app.use('/',routes)


app.get('/getAll', async (req, res, next) => {
  try {
    const user = await getAll(); 
    res.json(user);
  } catch (e) {
    next(e);
  }
});

app.use('*', (req, res, next) => {
    res.status(404).json({ err: 'NOT_FOUND' });
  });
  app.use((err, req, res, next) => {
    console.error(err);
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(422).json(err.errors);
    }
    if (err.code === 11000) {
      res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
    }
    if(err.message==='UN_AUTHENTICATED'){
      res.status(401).json({statusCode:'UN_AUTHENTICATED'})
    }
  });

const { PORT = 8080 } = process.env;

app.listen(PORT, () => {
  console.log('App is up and ready on:', PORT);
});
