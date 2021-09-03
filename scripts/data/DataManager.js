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



export const getPosts = () => {
    return fetch("http://localhost:8088/posts")
        .then(response => response.json())
}