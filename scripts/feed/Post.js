import { getLikes } from "./../data/DataManager.js";
import { postLike } from "./../data/DataManager.js";




const getNumberOfLikes = (postId) => {
  getLikes(postId)
    .then(response => {
      const userPost = JSON.parse(sessionStorage.getItem("user"));
      document.querySelector(`#myLikes__${postId}`).innerHTML = `👍 ${response.length}`;
      const getTheDamnResults = response.find(({ userId }) => userId === userPost.id)
      //debugger
      if (getTheDamnResults === undefined) {
        document.getElementById(`likeButton__${postId}`).innerHTML = `<button id="like__${postId}">Like</button>`
      }
    })
}


export const Post = (postObject) => {
  return `
  <section class="post" id="post__Section">
  <header>
  <h2 class="post__title" id="post__title">${postObject.title}</h2>
  </header>
  <img class="post__image" id="post__image" src="${postObject.imageURL}" />
  <h4 class="description" id="post__description">${postObject.description}</h4>
  <p id="post__timestamp" timestamp>${new Date(postObject.timestamp).toLocaleString()}</p>
  <p class="userId" id="post__userId">User Id: ${postObject.userId}</p>
  <p id="myLikes__${postObject.id}">👍 ${getNumberOfLikes(postObject.id)}</p>
  <div id="post__editAndDelete">
  <div id="post__edit"><button id="edit__${postObject.id}">Edit</button></div>
  <div id="post__delete"><button id="delete__${postObject.id}">Delete</button>
  <div id="likeButton__${postObject.id}"></div>
  </div>
  </section>
  `
}
//REPLACE LINE 33 AND 34 WITH THE FOLLOWING
//DO SOME MAGIC CALLS TO COMPARE LOGGED IN USER WITH USERID FROM THE POST
//${canUserEdit(postObject.userId)}
//${canUserDelete(postObject.userId)}