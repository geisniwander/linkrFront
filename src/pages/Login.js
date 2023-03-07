import styled from "styled-components";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../AppContext/Context";


export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setToken, setData} = useContext(AppContext);
    const navigate = useNavigate();
    const [ status, setStatus ] = useState(false) 

    function signin(event){
        event.preventDefault();
        setStatus(true);

        const body = {
            email: email,
            password: password
            
        }
    
        if (!body.email || !body.password) {
            alert("All fields must be filled")
        }
        

        const URL =`${process.env.REACT_APP_API_URL}/signin`


    axios
    .post((URL), body)
    .then(res => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token)
        setToken(res.data.token)

        const data = JSON.stringify(res.data)
        localStorage.setItem("data", data)
        setData(res.data)
     
        navigate("/timeline");
    })
    .catch(error => {
        console.log(error.message);
        alert("Incorrect username or password")
        setStatus(false);
    })

    }



    return(
        <>
        <WrapperSignup>

            <ContainerLeft>
            <h1>linkr</h1>
            <p>save, share and discover</p>
            <p>the best links on the web</p>
            </ContainerLeft>
            <ContainerRight>
                <ContainerForm>

                    <form onSubmit={signin}>
                        <input data-test="email" disabled={status} placeholder="e-mail" type="email" required value={email} onChange={e => setEmail(e.target.value)}></input>
                        <input data-test="password" disabled={status}  placeholder="password" type="password" required value={password} onChange={e => setPassword(e.target.value)}></input>
                        <button data-test="login-btn" disabled={status} type="submit">Log In</button>
                    </form>

                </ContainerForm>
                <ContainerLink data-test="sign-up-link">
                    <Link to="/sign-up" style={{textDecoration:'none'}}>
                        <p>First time? Create an account!</p>
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