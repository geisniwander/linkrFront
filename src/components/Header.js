import styled from "styled-components";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useContext, useState } from "react";
import AppContext from "../AppContext/Context";
import SearchInput from "./SearchInput";

export default function Header({ avatar }) {
    const [clicado, setClicado] = useState(true);
    const { setData } = useContext(AppContext);

    function logout() {
        localStorage.removeItem("token");
        setData(undefined);
        window.location.reload();
    }

    return (
        <>
            <HeaderContainer>
                <Logo>
                    linkr
                </Logo>
                <InputDesktop>
                    <SearchInput />
                </InputDesktop>
                <Avatar onClick={() => setClicado(!clicado)}>
                    <IconDown clicado={clicado}>
                        <SlArrowDown />
                    </IconDown>
                    <IconUp clicado={clicado}>
                        <SlArrowUp />
                    </IconUp>
                    <img src={avatar} alt="Avatar" data-test="avatar" />
                </Avatar>
            </HeaderContainer>
            <Logout clicado={clicado} data-test="menu">
                <button onClick={logout} data-test="logout">Logout</button>
            </Logout>
            <InputMobile>
                <SearchInput />
            </InputMobile>
        </>
    );
}

const HeaderContainer = styled.div`
    width: 100%;
    height: 72px;
    background-color: #151515;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    color: #FFFFFF;
    @media (max-width: 650px) {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
`;

const Logo = styled.div`
    font-family: 'Passion One';
    font-style: normal;
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
    letter-spacing: 0.05em;
    margin: 10px 28px;
    @media (max-width: 375px) {
        font-size: 45px;
        margin: 10px 17px;
        line-height: 50px;
    }
`;

const Avatar = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 17px;
    img{
        width: 53px;
        height: 53px;
        border-radius: 26.5px;
        margin-left: 16.5px;
        @media (max-width: 375px) {
            width: 44px;
            height: 44px;
        }
    }

`;

const IconUp = styled.div`
    display: ${props => props.clicado ? "none" : "flex"};
   
`;

const IconDown = styled.div`
    display: ${props => props.clicado ? "flex" : "none"};
`;

const Logout = styled.div`
    position: fixed;
    top: 72px;
    right: 0;
    display: ${props => props.clicado ? "none" : "flex"};
    background-color: #171717;
    width: 133px;
    height: 47px;
    border-bottom-left-radius: 20px;
    align-items: center;
    justify-content: center;   
    button{
        background-color: rgba(0,0,0,0);
        color: #FFFFFF;
        border: none;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
    }
    @media (max-width: 375px) {
        width: 130px;
        font-size: 15px;
        line-height: 18px;
    }
`;

const InputDesktop = styled.div`
width:40%;
display: flex;
justify-content:center;
@media (max-width: 650px) {
    display:none;
}
`;

const InputMobile = styled.div`
width:100%;
display: flex;
justify-content:center;
margin-top: 20px;
@media (min-width: 650px) {
    display:none;
}
`;