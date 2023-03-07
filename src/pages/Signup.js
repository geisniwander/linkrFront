import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup(){
    const navigate = useNavigate();
    const [ status, setStatus ] = useState(false)

    const body = {
        email: "",
        password: "",
        username: "",
        picture_url: ""
    }

    function register(event){
        event.preventDefault();
        setStatus(true);

        if (!body.email || !body.password || !body.username || !body.picture_url) {
            alert("All fields must be filled")
        }
        
        const URL =`${process.env.REACT_APP_API_URL}/signup`
    
    
        axios
        .post((URL), body)
        .then(res => {
            console.log(res.data);
            
            navigate("/");
            

        })
        .catch(error => {
            console.log(error.message);
            alert("Invalid registration data")
            setStatus(false);
        })
       
        
    }

 
    
    




    return (
        <>
        <WrapperSignup>

            <ContainerLeft>
            <h1>linkr</h1>
            <p>save, share and discover</p>
            <p>the best links on the web</p>
            </ContainerLeft>
            <ContainerRight>
                <ContainerForm>

                    <form onSubmit={register}>
                        <input data-test="email" placeholder="e-mail" type="email" required disabled={status} onChange={e => body.email = e.target.value }></input>
                        <input data-test="password" placeholder="password" type="password" disabled={status} required onChange={e => body.password = e.target.value}></input>
                        <input data-test="username" placeholder="username" type="text" disabled={status} required onChange={e => body.username = e.target.value}></input>
                        <input data-test="picture-url" placeholder="picture url" type="text" disabled={status} required onChange={e => body.picture_url = e.target.value}></input>
                        <button data-test="sign-up-btn" type="submit" disabled={status}>Sign Up</button>
                    </form>

                </ContainerForm>
                <ContainerLink data-test="login-link">
                    <Link to="/" style={{textDecoration:'none'}}>
                        <p>Switch back to log in</p>
                    </Link> 
                </ContainerLink>
            </ContainerRight>

        </WrapperSignup>
        </>



    )
}

const WrapperSignup = styled.div`
height: 100vh;
display: flex;
align-items: center;
background-color: #333333;

@media (max-width: 1100px){
    display: flex;
    flex-direction: column;
}
`

const ContainerLeft = styled.div`
background-color: #151515;
height: 100%;
width: 70%;
display: flex;
flex-direction: column;
align-items: flex-start;
@media (max-width: 1100px) {
    width: 100%;
    height: 40%;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
}

h1{
    color: white;
    font-family: 'Passion One', cursive;
    font-weight: 700;
    font-size: 106px; 
    padding-left: 144px;
    padding-top: 300px;

    @media (max-width: 1100px){
        align-items: center;
        font-size: 76px;
        padding-left: 0px;
        padding-top: 30px;
    }
}

p{
    color: white;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 43px;
    padding-left: 144px;
    margin-bottom: 15px;

    @media (max-width: 1100px) {
        align-items: center;
        font-size: 23px;
        padding-left: 0px;
    }
}



`

const ContainerRight = styled.div`
height: 100%;
width: 30%;
display: flex;
flex-direction: column;
align-items: center;

@media (max-width: 1100px){
    margin-top: -200px;
}

`

const ContainerForm = styled.div`
form{
    padding-top: 274px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   
}
input{
    height: 65px;
    width: 300px;
    background-color: white;
    border: 2px solid white;
    border-radius: 6px;
    margin-bottom: 13px;
    padding-left: 51px;
    ::placeholder{
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    line-height: 40px;
    font-size: 27px;
    color: #9f9f9f;
    padding-left: 17px;
    
}
}
button{
    height: 65px;
    width: 356px;
    background-color: #1877F2;
    border-radius: 6px;
    margin-bottom: 13px;
    padding-left: 11px;
    border: 2px solid #1877F2;
    color: white;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    line-height: 40px;
    font-size: 27px;
}


`

const ContainerLink = styled.div`
p{
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 20px;
    border-bottom: 1px solid white;
    margin-top: 14px;
    color: white;

    @media (max-width: 1100px) {
        white-space: nowrap;
    }

}
`