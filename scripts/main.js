// Can you explain what is being imported here?
import {
    getPosts, getUsers, usePostCollection,
    createPost, deletePost, getSinglePost,
    updatePost, getLoggedInUser, logoutUser,
    setLoggedInUser, loginUser, registerUser,
    postLike, getLikes
} from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";
import { PostEdit } from "./feed/PostEdit.js";
import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";

const showUserList = () => {
    //Get a reference to the location on the DOM where the list can display
    const postElement = document.querySelector(".userList");
    getUsers().then((allUsers) => {
        //console.log("user info: ", allUsers);
    })
}
const showPostList = () => {
    //Get a reference to the location on the DOM where the list will display
    const postElement = document.querySelector(".postList");
    getPosts().then((allPosts) => {
        console.log("show post list: ", PostList);
        postElement.innerHTML = PostList(allPosts.reverse());
    })
}
const showPostEntry = () => {
    //Get a reference to the location on the DOM where the nav will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry();
}
//SHOW THE EDITED POSTS
const showEdit = (postObj) => {
    const entryElement = document.querySelector(".entryForm");
    //console.log("postObj", postObj, "entryElement", entryElement);
    entryElement.innerHTML = PostEdit(postObj);
}
//NAV BAR INFO
const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
    navElement.innerHTML = NavBar();
}
//CHECK FOR LOGGED IN USER
const checkForUser = () => {
    if (sessionStorage.getItem("user")) {
        setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
        startGiffyGram();
    } else {
        //SHOW LOGIN/REGISTER
        showLoginRegister();
    }
}
//SHOW THE REGISTER OPTION FOR THE USER
const showLoginRegister = () => {
    showNavBar();
    const entryElement = document.querySelector(".entryForm");
    //template strings can be used here too
    entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
    //make sure the post list is cleared out too
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = "";
}

const startGiffyGram = () => {
    showNavBar();
    showPostEntry();
    showPostList();
    showUserList();
    showFooter();
}

const applicationElement = document.querySelector(".giffygram");
//EVENT LISTENER FOR 'ON CLICK'
applicationElement.addEventListener("click", event => {
    if (event.target.id === "login__submit") {
        //collect all the details into an object
        const userObject = {
            name: document.querySelector("input[name='name']").value,
            email: document.querySelector("input[name='email']").value
        }
        loginUser(userObject)
            .then(dbUserObj => {
                if (dbUserObj) {
                    sessionStorage.setItem("user", JSON.stringify(dbUserObj));
                    startGiffyGram();
                }
                else {
                    //got a false value - no user
                    const entryElement = document.querySelector(".entryForm");
                    entryElement.innerHTML = `<p class="center">That user does not exist. Please try again 
            or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
                }
            })
    }
    else if (event.target.id === "register__submit") {
        //collect all the details into an object
        const userObject = {
            name: document.querySelector("input[name='registerName']").value,
            email: document.querySelector("input[name='registerEmail']").value
        }
        registerUser(userObject)
            .then(dbUserObj => {
                sessionStorage.setItem("user", JSON.stringify(dbUserObj));
                startGiffyGram();
            })
    }
    else if (event.target.id === "logout") {
        logoutUser();
        console.log(getLoggedInUser());
        sessionStorage.clear();
        checkForUser();
    }
    else if (event.target.id === "directMessageIcon") {
        //USER CLICKS THE PEN ICON => ASKS FAVORITE COLOR
        prompt("What is your favorite color?")
    }
    else if (event.target.id === "pb-home") {
        //USER CLICKS THE PB ICON => PAGE RELOADS
        window.location.reload();
    }
    else if (event.target.id.startsWith("edit")) {
        //USER CLICKS THE EDIT BUTTON FOR A POST
        alert("getPosts == getLoggedIn");
        if (event.target.id.startsWith("edit")) {
            const postId = event.target.id.split("__")[1];
            getSinglePost(postId)
                .then(response => {
                    showEdit(response);
                })
        }

    }
    else if (event.target.id === "newPost__cancel") {
        //clear the input fields
        showPostList();
        showPostEntry()
    }
    else if (event.target.id === "newPost__submit") {
        //collect the input values into an object to post to the DB
        const title = document.querySelector("input[name='postTitle']").value
        const url = document.querySelector("input[name='postURL']").value
        const description = document.querySelector("textarea[name='postDescription']").value
        //we have not created a user yet - for now, we will hard code `1`.
        //we can add the current time as well
        // console.log("sessionStorage", sessionStorage);
        const postObject = {
            title: title,
            imageURL: url,
            description: description,
            userId: getLoggedInUser().id,
            timestamp: Date.now()
        }
        if (title && url) {
            // be sure to import from the DataManager
            createPost(postObject)
                .then(dbResponse => {
                    showPostList()
                });
        }
        else {
            alert("You forgot some info...");
        }
    }
    else if (event.target.id.startsWith("updatePost")) {
        const postId = event.target.id.split("__")[1];
        //collect all the details into an object
        const title = document.querySelector("input[name='postTitle']").value
        const url = document.querySelector("input[name='postURL']").value
        const description = document.querySelector("textarea[name='postDescription']").value
        const timestamp = document.querySelector("input[name='postTime']").value
        const postObject = {
            title: title,
            imageURL: url,
            description: description,
            userId: getLoggedInUser().id,
            timestamp: parseInt(timestamp),
            id: parseInt(postId)
        }
        updatePost(postObject)
            .then(response => {
                showPostList();
                showPostEntry()
            })
    }
    //USER CLICKS THE DELETE BUTTON FOR THE POST
    else if (event.target.id.startsWith("delete")) {
        const postId = event.target.id.split("__")[1];
        deletePost(postId)
            .then(response => {
                showPostList();
                showPostEntry()
            })
    }
    //USER CLICKS THE LIKE BUTTON FOR THE POST
    else if (event.target.id.startsWith("like")) {
        const likeObject = {
            postId: parseInt(event.target.id.split("__")[1]),
            userId: getLoggedInUser().id
        }
        alert("Thanks peasant");
        postLike(likeObject)
            .then(response => {
                showPostList();
            })
    }
    //window.scrollTo({ top: 0, behavior: "smooth" })
})


//FOOTER INFO
applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
        const yearAsNumber = parseInt(event.target.value)
        console.log(`User wants to see posts since ${yearAsNumber}`)
        //invoke a filter function passing the year as an argument
        showFilteredPosts(yearAsNumber);
    }
})
const showFilteredPosts = (year) => {
    //get a copy of the post collection
    const epoch = Date.parse(`01/01/${year}`);
    console.log("epoch: ", epoch);
    //filter the data
    const filteredData = usePostCollection().filter(singlePost => {
        if (singlePost.timestamp >= epoch) {
            console.log("single post: ", singlePost);
            return singlePost
        }
    })
    const postElement = document.querySelector(".postList");

    postElement.innerHTML = PostList(filteredData);
}
const showFooter = () => {
    const navElement = document.querySelector("footer");
    navElement.innerHTML = Footer();
}



//startGiffyGram();
checkForUser();