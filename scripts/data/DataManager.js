let loggedInUser = {}
//LOGS OUT THE USER
export const logoutUser = () => {
  loggedInUser = {}
}
//SEARCHES FOR LOGGED IN USER OR NO
export const getLoggedInUser = () => {
  return loggedInUser;
}
//SESSION STORAGE HOLDS THIS USER AND SETS THE LOGGED IN USER
export const setLoggedInUser = (userObj) => {
  loggedInUser = userObj;
}
export const getUsers = () => {
  return fetch("http://localhost:8088/users")
    .then(response => response.json())
}
export const registerUser = (userObj) => {
  return fetch(`http://localhost:8088/users`, {
    method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userObj)
  })
  .then(response => response.json())
  .then(parsedUser => {
    setLoggedInUser(parsedUser);
    return getLoggedInUser();
  })
}
//GATHER INFO FOR THE LIKE BUTTON
export const postLike = likeObject => {
	return fetch(`http://localhost:8088/userLikes/?_expand=user`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(likeObject)
	})
		.then(response => response.json())
}
//GET ALL THE LIKES FOR EACH POST
export const getLikes = (postId) => {
  return fetch(`http://localhost:8088/userLikes?postId=${postId}`)
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
  const userId = getLoggedInUser().id
  return fetch(`http://localhost:8088/posts?_expand=user`)
    .then(response => response.json())
    .then(parsedResponse => {
      console.log("data with user", parsedResponse)
      postCollection = parsedResponse
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
export const loginUser = (userObj) => {
  return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
  .then(response => response.json())
  .then(parsedUser => {
    //is there a user?
    console.log("parsedUser", parsedUser) //data is returned as an array
    if (parsedUser.length > 0){
      setLoggedInUser(parsedUser[0]);
      return getLoggedInUser();
    }else {
      //no user
      return false;
    }
  })
}