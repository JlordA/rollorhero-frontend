import React from 'react'
import { Button } from 'semantic-ui-react'

class CreateUserForm extends React.Component{

    render(){
        return(
            <form>
                <input type="text" placeholder="username"/>
                <input type="text" placeholder="password"/>
                <input type="text" placeholder="neighborhood"/>
                <input type="text" placeholder="borough"/>
                <Button>Create Profile</Button>
            </form>
        )
    }

}

export default CreateUserForm