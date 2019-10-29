const express = require('express');

const app = express();

const { getPosts } = require('./routes/post');

app.get('/', getPosts);

const port = 8080;
app.listen(port, () => {
  console.log(`A Node JS Api is listening on port: ${port}`);
});
