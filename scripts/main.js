// Can you explain what is being imported here?
import { getPosts, getUsers } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";

const showPostList = () => {
    //Get a reference to the location on the DOM where the list will display
    const postElement = document.querySelector(".postList");
    getPosts().then((allPosts) => {
        postElement.innerHTML = PostList(allPosts);
    })
}

const startGiffyGram = () => {
    showNavBar();
    showPostList();
    showFooter();
}

const applicationElement = document.querySelector(".giffygram");

//EVENT LISTENER FOR 'ON CLICK'
applicationElement.addEventListener("click", event => {
    console.log("what was clicked: ", event.target)
    //USER CLICKS THE LOGOUT BUTTON
    if (event.target.id === "logout") {
        confirm("Are you sure you want to log out?")
    } else if (event.target.id === "directMessageIcon") {
        //USER CLICKS THE PEN ICON
        prompt("What is your favorite color?")
    } else if (event.target.id === "pb-home") {
        //USER CLICKS THE PB ICON
        window.location.reload();
    }
})

//NAV BAR INFO
const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
    navElement.innerHTML = NavBar();
}

//FOOTER INFO
applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
        const yearAsANumber = parseInt(event.target.value)
        console.log(`user wants to see posts since ${yearAsANumber}`)
    }
})
const showFooter = () => {
    const navElement = document.querySelector("footer");
    navElement.innerHTML = Footer();
}



startGiffyGram();