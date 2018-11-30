const url = "http://localhost:3001"


const headers = { 'Authorization': 'tokenDaniel' }

//Get all of the posts. Useful for the main page when no category is selected.
export const getAllPosts = () =>
  fetch(`${url}/posts`, { headers })
    .then(res => res.json())
    .then(data => console.log('posts:', data))

//Get the details of a single post.
export const getPost = (postId) =>
  fetch(`${url}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => console.log('post:', data))

// Get all the comments for a single post.
export const getPostComments = (postId) =>
  fetch(`${url}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => console.log('post comments:', data))

// Get comment details
export const getComment = (commentId) =>
  fetch(`${url}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => console.log('comment detail:', data))

//Get all of the categories available for the app. List is found in `categories.js`.
export const getCategories = () =>
  fetch(`${url}/categories`, { headers })
    .then(res => res.json())
    .then(data => console.log('categories:', data))

// Gets posts from a chosen category
export const getCategoryPosts = (category) =>
  fetch(`${url}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => console.log('category posts:', data))
