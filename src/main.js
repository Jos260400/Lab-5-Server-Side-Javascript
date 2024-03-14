import express from 'express';

const app = express();
const PORT = 18071;

app.use(express.json());

let posts = [
 
  { id: 1, title: 'Primer post', content: 'El primer post' },
 
];


app.get('/posts', (req, res) => {
  res.status(200).json({
    message: "Bienvenido! Intenta usar cada funcion.",
    posts
  });
});

app.get('/posts/:postId', (req, res) => {
  const { postId } = req.params;
  const post = posts.find(p => p.id === parseInt(postId));
  if (post) {
    res.status(200).json({
      message: `Detail of post ID ${postId}:`,
      post
    });
  } else {
    res.status(404).send({ message: 'Post no encontrado.' });
  }
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.status(200).json({
    message: "Se hizo un nuevo post",
    newPost
  });
});

app.put('/posts/:postId', (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  const index = posts.findIndex(p => p.id === parseInt(postId));
  if (index !== -1) {
    posts[index] = { ...posts[index], title, content };
    res.status(200).json({
      message: `Post ID ${postId} se realizo bien.`,
      post: posts[index]
    });
  } else {
    res.status(404).send({ message: 'Post no se encuentra.' });
  }
});


app.delete('/posts/:postId', (req, res) => {
  const { postId } = req.params;
  const index = posts.findIndex(p => p.id === parseInt(postId));
  if (index !== -1) {
    posts.splice(index, 1);
    res.status(204).send({ message: `Post ID ${postId} se ha eliminado bien.` });
  } else {
    res.status(404).send({ message: 'Post a eliminar no se encuentra.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${18071}`);
});
