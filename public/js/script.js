
fetch('http://localhost:3000/posts')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

const newPost = {
  title: "Nuevo Post",
  content: "Contenido del nuevo post"
};

fetch('http://localhost:3000/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newPost),
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch((error) => {
  console.error('Error:', error);
});
