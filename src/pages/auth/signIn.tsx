import React, { useState } from 'react';
import { ButtonComponent, ButtonTransparentComponent } from '../../components/buttonComponent';
import { InputTextComponent } from '../../components/inputTextComponent';

import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';

function SignIn() {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container className="container-grid">
            <div
                className="container-img" 
                >
                <img style={{width: 'auto', maxHeight: 300}}
                    src="https://image.freepik.com/free-photo/abstract-space-wallpaper-background-dark-smoke-design_53876-128278.jpg"
                    alt="SignIn"  /> 
            </div>
            
            <div className="display-grid justify-content-center align-items-center"
            >
                <form className="formInputs">
                    <InputTextComponent 
                        id={"username"} 
                        label={"Username"} 
                        action={(username: any) => setUser(username.target.value)}
                    />

                    <InputTextComponent 
                        id="password" 
                        label="Password"
                        type="password"
                        action={(password: any) => setPassword(password.target.value)}
                    />
                </form>
            </div>
           
            <Stack className="display-flex justify-content-center align-items-center"
                style={{width: '100%'}}
            >
                <ButtonComponent 
                    text="Sign In" 
                    onClick={() => console.log("Sign In Successful: ", user, password)}
                    id="SignInButton"
                />

                <ButtonTransparentComponent 
                    text="don't have an account? Register here."
                    onClick={() => console.log("Register now")}
                    id="GoToSignUp"
                />

            </Stack>
        </Container>
    )
};

export default SignIn;
