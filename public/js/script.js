document.addEventListener('DOMContentLoaded', fetchPosts);

function fetchPosts() {
  fetch('/posts')
    .then(response => response.json())
    .then(data => {
      const postsContainer = document.getElementById('posts');
      postsContainer.innerHTML = ''; 
      data.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
        `;
        postsContainer.appendChild(postElement);
      });
    })
    .catch(error => console.error('Error fetching posts:', error));
}

