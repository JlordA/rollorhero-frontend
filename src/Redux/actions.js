import { GET_DELIS, LOGIN_USER, REVIEW_FORM, SANDWICH_FILTER, DELI_FILTER, GET_REVIEWS, REVIEW_CLICK, RENDER_REVIEW, CURRENT_DELI, POST_REVIEW, REVIEW_EDIT_CLICK, PATCH_REVIEW, GET_DELI, GET_SANDWICHES, GET_SANDWICH, SANDWICH_CLICK, POST_LIKE, FIND_DELI, DELI_FORM, POST_DELI, RESET_DELI_LOCATION, RENDER_DELI_LIST, USER_LOGGED_IN, DELI_CLICK, SANDWICH_FORM, POST_SANDWICH, LOGOUT_USER, BOROUGH_FILTER, RESET_DELI, GET_REVIEW } from './actionTypes'

/// USER ACTIONS ///

export function loginUser(userObj) {
    return function (dispatch) {
        fetch('https://rollorhero.herokuapp.com/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accepts": "application.json"
            },
            body: JSON.stringify(userObj),
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    // console.log("found user", data['username'])
                    localStorage.setItem("USER_DATA", JSON.stringify(data))
                    dispatch({ type: LOGIN_USER, payload: data })
                } else {
                    // console.log("user not found")
                    window.alert("Wrong Username or Password Please Try Again")
                }
            })
            .catch(console.log)
    }
}

export function logOutUser() {
    localStorage.removeItem("USER_DATA")
    return { type: LOGOUT_USER }
}

export function userLoggedIn() {
    return { type: USER_LOGGED_IN }
}

/// FILTER ACTIONS ///

export function setSandwichFilter(sandFilter) {
    return { type: SANDWICH_FILTER, payload: sandFilter }
}

export function setDeliFilter(deliFilter) {
    return { type: DELI_FILTER, payload: deliFilter }
}

export function setBoroughFilter(boroughFilter) {
    console.log(boroughFilter)
    return { type: BOROUGH_FILTER, payload: boroughFilter }
}

export function setSearchLocation(deliLocation) {
    return { type: FIND_DELI, payload: deliLocation }
}

export function resetDeliLocation() {
    return { type: RESET_DELI_LOCATION }
}

export function renderDelisClick() {
    return { type: RENDER_DELI_LIST }
}


/// DELI ACTIONS ///

export function getDelis() {
    return function (dispatch) {
        fetch('https://rollorhero.herokuapp.com/api/delis')
            .then(r => r.json())
            .then(arrayOfDelis => {
                dispatch({ type: GET_DELIS, payload: arrayOfDelis })
            })
    }
}


export function getDeliOfReview(deli_id) {
    return function (dispatch) {
        fetch(`https://rollorhero.herokuapp.com/api/delis/${deli_id}`)
            .then(r => r.json())
            .then(deliFromReview => {
                dispatch({ type: GET_DELI, payload: deliFromReview })
            })
    }
}

export function currentDeli(deliObj) {
    return { type: CURRENT_DELI, payload: deliObj }
}

export function resetDeli() {
    return { type: RESET_DELI }
}


export function renderDeliForm() {
    return { type: DELI_FORM }
}

export function postDeli(deliObj) {
    return function (dispatch) {
        fetch('https://rollorhero.herokuapp.com/api/delis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deliObj),
        })
            .then(response => response.json())
            .then(newDeli => {
                dispatch({ type: POST_DELI, payload: newDeli })
                console.log('Success:', newDeli);
            })
    }
}

export function deliClick() {
    return { type: DELI_CLICK }
}

/// SANDWICH ACTIONS ///

export function getSandwiches() {
    return function (dispatch) {
        fetch('https://rollorhero.herokuapp.com/api/sandwiches')
            .then(r => r.json())
            .then(arrayOfSandwiches => {
                dispatch({ type: GET_SANDWICHES, payload: arrayOfSandwiches })
            })
    }
}

export function getSandwich(sandwichObj) {
    return function (dispatch) {
        fetch(`https://rollorhero.herokuapp.com/api/sandwiches/${sandwichObj.id}`)
            .then(r => r.json())
            .then(sandwich => {
                dispatch({ type: GET_SANDWICH, payload: sandwich })
                console.log("success", sandwich)
            })
    }
}

export function postSandwichAndDeliSandwich(sandwichObj, deliId) {
    return function (dispatch) {
        fetch('https://rollorhero.herokuapp.com/api/sandwiches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sandwichObj),
        })
            .then(response => response.json())
            .then(newSandwich => {
                dispatch({ type: POST_SANDWICH, payload: newSandwich })
                console.log('Success:', newSandwich);
                postDeliSandwich(newSandwich.id, deliId)
            })
    }
}


export function postDeliSandwich(sandwichObjId, deliId) {
    const newDeliSandwich = {
        sandwich_id: sandwichObjId,
        deli_id: deliId
    }
    fetch('https://rollorhero.herokuapp.com/api/deli_sandwiches', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDeliSandwich),
    })
        .then(response => response.json())
        .then(newDeliSandwich => {
            console.log('Success:', newDeliSandwich);
        })
}



export function sandwichBeenClicked() {
    return { type: SANDWICH_CLICK }
}

export function renderSandwichForm() {
    return { type: SANDWICH_FORM }
}

/// REVIEW ACTIONS ///

export function renderReviewForm() {
    return { type: REVIEW_FORM }
}

export function reviewClick() {
    return { type: REVIEW_CLICK }
}

export function renderReview(reviewObj) {
    return { type: RENDER_REVIEW, payload: reviewObj }
}

export function getReview(reviewObj) {
    return function (dispatch) {
        fetch(`https://rollorhero.herokuapp.com/api/reviews/${reviewObj.id}`)
            .then(r => r.json())
            .then(review => {
                dispatch({ type: GET_REVIEW, payload: review })
            })
    }
}

export function reviewEditClicked() {
    return { type: REVIEW_EDIT_CLICK }
}

export function getReviews() {
    return function (dispatch) {
        fetch('https://rollorhero.herokuapp.com/api/reviews')
            .then(r => r.json())
            .then(arrayOfReviews => {
                dispatch({ type: GET_REVIEWS, payload: arrayOfReviews })
            })
    }
}

export function postReview(reviewObj) {

    return function (dispatch) {
        fetch('https://rollorhero.herokuapp.com/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewObj),
        })
            .then(response => response.json())
            .then(newReview => {
                dispatch({ type: POST_REVIEW, payload: newReview })
                console.log('Success:', newReview);
            })
    }
}

export function patchReview(reviewObj) {
    // console.log(reviewObj.id)
    return function (dispatch) {
        fetch(`https://rollorhero.herokuapp.com/api/reviews/${reviewObj.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewObj),
        })
            .then(response => response.json())
            .then(updatedReview => {
                dispatch({ type: PATCH_REVIEW, payload: updatedReview })
                console.log('Success:', updatedReview);
            })
    }
}


/// LIKE ACTIONS ///
export function likeSandwich(newLike) {
    console.log(newLike)
    return function (dispatch) {
        fetch(`https://rollorhero.herokuapp.com/api/likes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLike),
        })
            .then(response => response.json())
            .then(newLike => {
                dispatch({ type: POST_LIKE, payload: newLike })
                console.log('Success:', newLike);
            }
            )
    }
}