import React from 'react'
import {connect} from 'react-redux'
import {userLoggedIn, logOutUser} from '../Redux/actions'
import styled from 'styled-components'



function Banner(props){

    return(
            <BannerPic src="../../public/img/rollbanner.png"/>   
    )
}

function mdp(dispatch){
    return{
        userLoggedIn: () => dispatch(userLoggedIn()),
        logOutUser: () => dispatch(logOutUser())
    }
}

export default connect(null, mdp)(Banner)

const BannerPic = styled.img`
   height: 100%;
   width: 100%;
`
