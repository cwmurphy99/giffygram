// export const Post = (postObject) => {
//     return `
//       <section class="post">
//         <header>
//             <h2 class="post__title">${postObject.title}</h2>
//         </header>
//         <img class="post__image" src="${postObject.imageURL}" />
//       </section>
//     `
// }




export const Post = (postObject) => {
  return `
  <section class="post">
  <header>
  <h2 class="post__title">${postObject.title}</h2>
  </header>
  <img class="post__image" src="${postObject.imageURL}" />
  <h4 class="description">${postObject.description}</h4>
  <p timestamp>${Date(postObject.timestamp)}</p>
  <p class="userId">User Id: ${postObject.userId}</p>
  <div><button id="edit==${postObject.id}">Edit</button></div>
  <section>
  `
}