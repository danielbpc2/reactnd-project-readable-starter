const url = "http://localhost:3001"

const headers = { 'Authorization': "Fixed_Problem" }

//Get all of the posts. Useful for the main page when no category is selected.
export const getAllPosts = () => (
  fetch(`${url}/posts`, { headers })
  .then(res => res.json())
  .then(data => {
    const res = {}
    data.map((post) => res[post.id] = post)
    return res
  })
)

//Get the details of a single post.
export const getPost = (postId) => (
  fetch(`${url}/posts/${postId}`, { headers })
    .then(res => res.json())
)

//save a new post.
export const savePost = (post) => (
  fetch(`${url}/posts`,
  {
    headers: {...headers, 'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(post)
  }).then(res => res.json())
)

// edit info on a post
export const editPost = (postId, change) => (
  fetch(`${url}/posts/${postId}`,
  {
    headers: {...headers, 'Content-Type': 'application/json'},
    method: 'PUT',
    body: JSON.stringify(change)
  }).then(res => res.json())
)

// delete flag on a post
export const deletePost = (postId) => (
  fetch(`${url}/posts/${postId}`,
  {
    headers: {...headers},
    method: 'DELETE',
  }).then(res => res.json())
)

// upVote or downVote a post
export const votePost = (id, option) => (
  fetch(`${url}/posts/${id}`,
  {
    headers: {...headers, 'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({option: `${option}`})
  }).then(res => res.json())
)

// Get all the comments for a single post.
export const getPostComments = (postId) => (
  fetch(`${url}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
)

export const getAllPostComments = (postId) => (
    getAllPosts()
    .then(data => {
      const res = []
      Object.keys(data).map( postid => getPostComments(postid).then(data => data.map((comment) => res.push(comment) )  ) )
      return res
    }
  )
)

// Get comment details
export const getComment = (commentId) => (
  fetch(`${url}/comments/${commentId}`, { headers })
    .then(res => res.json())
)

//save a new comment.
export const saveComment = (comment) => (
  fetch(`${url}/comments`,
  {
    headers: {...headers, 'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(comment)
  }).then(res => res.json())
  .then(data => data)
)

// upVote or downVote a comment
export const voteComment = (id, option) => (
  fetch(`${url}/comments/${id}`,
  {
    headers: {...headers, 'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({option: `${option}`})
  }).then(res => res.json())
)

// edit info on a comment
export const editComment = (commentId, change) => (
  fetch(`${url}/comments/${commentId}`,
  {
    headers: {...headers, 'Content-Type': 'application/json'},
    method: 'PUT',
    body: JSON.stringify(change)
  }).then(res => res.json())
)

// Delete flag on a comment
export const deleteComment = (commentId) => (
  fetch(`${url}/comments/${commentId}`,
  {
    headers: {...headers},
    method: 'DELETE',
  }).then(res => res.json())
)

//Get all of the categories available for the app. List is found in `categories.js`.
export const getCategories = () => (
  fetch(`${url}/categories`, { headers })
    .then(res => res.json())
)

// Gets posts from a chosen category
export const getCategoryPosts = (category) => (
  fetch(`${url}/${category}/posts`, { headers })
    .then(res => res.json())
)

getAllPostComments()
