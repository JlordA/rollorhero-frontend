import { combineReducers } from 'redux'


const defaultState = {
    user: null,
    logged_in: false,
    deli: [],
    review: {},
    delis: [],
    sandwiches: [],
    sandwich: [],
    reviews: [],
    likes: [],
    reviewFormClicked: false,
    reviewBeenClicked: false,
    reviewEditClicked: false,
    sandwichBeenClicked: false,
    sandwichFormClicked: false,
    deliFormClicked: false,
    deliList: false,
    deliClicked: false,
    sandwichFilter: "",
    deliFilter: "",
    boroughFilter: "",
    deliLocation: null
}


/// USER ///

function userReducer(prevState = defaultState.user, action) {
    switch (action.type) {
        case "LOGIN_USER":
            return action.payload
        case "LOGOUT_USER":
            // console.log("from root reducer")
            return null
        default:
            return prevState
    }
}

function loginReducer(prevState = defaultState.logged_in, action) {
    switch (action.type) {
        case "USER_LOGGED_IN":
            return !prevState
        default:
            return prevState
    }
}

/// DELI ///

function delisReducer(prevState = defaultState.delis, action) {
    switch (action.type) {
        case "GET_DELIS":
            return action.payload
        case "POST_DELI":
            return [...prevState, action.payload]
        default:
            return prevState
    }
}

function deliReducer(prevState = defaultState.deli, action) {
    switch (action.type) {
        case "CURRENT_DELI":
            return action.payload
        case "GET_DELI":
            return action.payload
        case "RESET_DELI":
            return []
        default:
            return prevState
    }
}

function deliStyleReducer(prevState = defaultState.deliFilter, action) {
    switch (action.type) {
        case "DELI_FILTER":
            return action.payload
        default:
            return prevState
    }
}

function boroughStyleReducer(prevState = defaultState.boroughFilter, action) {
    switch (action.type) {
        case "BOROUGH_FILTER":
            return action.payload
        default:
            return prevState
    }
}

function deliSearchReducer(prevState = defaultState.deliLocation, action) {
    switch (action.type) {
        case "FIND_DELI":
            return action.payload
        case "RESET_DELI_LOCATION":
            return null
        default:
            return prevState
    }
}

function deliFormReducer(prevState = defaultState.deliFormClicked, action){
    switch (action.type) {
        case "DELI_FORM":
            return !prevState
        default:
            return prevState
    }
}

function deliListClickReducer(prevState = defaultState.deliList, action){
    switch (action.type) {
        case "RENDER_DELI_LIST":
            return !prevState
        default:
            return prevState
    }
}

function deliClickReducer(prevState = defaultState.deliClicked, action){
    switch (action.type) {
        case "DELI_CLICK":
           return !prevState
        default:
            return prevState
    }
}

/// SANDWICH ///

function sandwichStateReducer(prevState = defaultState.sandwichFilter, action) {
    switch (action.type) {
        case "SANDWICH_FILTER":
            return action.payload
        default:
            return prevState
    }
}

function sandwichesReducer(prevState = defaultState.sandwiches, action){
    switch (action.type) {
        case "GET_SANDWICHES":
            return action.payload
        case "POST_SANDWICH":
            return [...prevState, action.payload]
        default:
            return prevState
    }
}

function sandwichReducer(prevState = defaultState.sandwich, action){
    switch (action.type) {
        case "GET_SANDWICH":
            return action.payload
        default:
            return prevState
    }
}

function sandwichClickReducer(prevState = defaultState.sandwichBeenClicked, action){
    switch (action.type) {
        case "SANDWICH_CLICK":
            return !prevState
        default:
            return prevState
    }
}

function sandwichFormClickReducer(prevState = defaultState.sandwichFormClicked, action){
    switch (action.type) {
        case "SANDWICH_FORM":
            return !prevState
        default:
            return prevState
    }
}


/// REVIEW ///

function reviewClickReducer(prevState = defaultState.reviewFormClicked, action) {
    switch (action.type) {
        case "REVIEW_FORM":
            return !prevState
        default:
            return prevState
    }
}

function reviewsReducer(prevState = defaultState.reviews, action) {
    switch (action.type) {
        case "GET_REVIEWS":
            return action.payload
        case "POST_REVIEW":
            return [action.payload, ...prevState]
        case "PATCH_REVIEW":
            let updatedArray = [...prevState]
            let reviewIndex = updatedArray.findIndex(review => review.id === action.payload.id)
            updatedArray[reviewIndex] = action.payload
            return updatedArray
        default:
            return prevState
    }
}

function reviewBeenClickReducer(prevState = defaultState.reviewBeenClicked, action) {
    switch (action.type) {
        case "REVIEW_CLICK":
            return !prevState
        default:
            return prevState
    }
}

function reviewReducer(prevState = defaultState.review, action) {
    switch (action.type) {
        case "RENDER_REVIEW":
            return action.payload
        case "GET_REVIEW":
            return action.payload
        default:
            return prevState
    }
}

function reviewEditClickedReducer(prevState = defaultState.reviewEditClicked, action){
    switch (action.type) {
        case "REVIEW_EDIT_CLICK":
            // console.log("in edit click reducer: ", prevState)
            return !prevState
        default:
            return prevState
    }
}

/// LIKE ///

function likeReducer(prevState = defaultState.likes, action){
    switch (action.type) {
        case "POST_LIKE":
            return [...prevState, action.payload]
        default:
            return prevState
    }
}



const rootReducer = combineReducers({
    user: userReducer,
    logged_in: loginReducer,
    delis: delisReducer,
    deli: deliReducer,
    deliFilter: deliStyleReducer,
    deliLocation: deliSearchReducer,
    deliFormClicked: deliFormReducer,
    boroughFilter: boroughStyleReducer,
    sandwichFilter: sandwichStateReducer,
    sandwiches: sandwichesReducer,
    sandwich: sandwichReducer,
    sandwichBeenClicked: sandwichClickReducer,
    likes: likeReducer,
    reviewFormClicked: reviewClickReducer,
    reviews: reviewsReducer,
    reviewBeenClicked: reviewBeenClickReducer,
    reviewEditClicked: reviewEditClickedReducer,
    review: reviewReducer,
    deliList: deliListClickReducer,
    deliClicked: deliClickReducer,
    sandwichFormClicked: sandwichFormClickReducer
})

export default rootReducer