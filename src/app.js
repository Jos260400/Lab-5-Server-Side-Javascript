const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

let posts = []; 

app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

app.get('/posts/:postId', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.postId));
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

app.post('/posts', (req, res) => {
  const post = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  posts.push(post);
  res.status(200).json(post);
});

app.put('/posts/:postId', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.postId));
  if (index >= 0) {
    posts[index] = { ...posts[index], ...req.body };
    res.status(200).json(posts[index]);
  } else {
    res.status(404).send('Post not found');
  }
});


app.delete('/posts/:postId', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.postId));
  if (index >= 0) {
    posts.splice(index, 1);
    res.status(204).send(); 
  } else {
    res.status(404).send('Post not found');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
