const loggedInUser = {
  id: 1,
  name: "Chris",
  dateJoined: 1630513631166,
  email: "theworldisyours@gmail.com",
  stateId: 35
}
export const getLoggedInUser = () => {
  return loggedInUser;
}
export const getUsers = () => {
  return fetch("http://localhost:8088/users")
    .then(response => response.json())
}

let postCollection = [];

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];
}
export const getPosts = () => {
  //console.log("Go Get Posts");
  return fetch("http://localhost:8088/posts")
    .then(response => response.json())
    .then(parsedResponse => {
      postCollection = parsedResponse;
      return parsedResponse;
    })
}
//GET A SINGLE POST IN ORDER TO EDIT
export const getSinglePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`)
    .then(response => response.json())
}
//CREATE A SINGLE POST ENTRY
export const createPost = postObj => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postObj)

  })
    .then(response => response.json())
}
//EDIT A SINGLE POST ENTRY
export const updatePost = postObj => {
  return fetch(`http://localhost:8088/posts/${postObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postObj)

  })
    .then(response => response.json())

}
//DELETE A SINGLE POST ENTRY
export const deletePost = postId => {
  //console.log("Delete A Post");
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
}


//

