import styled from "styled-components";
import { SlArrowDown, SlArrowUp } from "react-icons/sl"
import { useState } from "react"

export default function Header ({ avatar }) {
    const [clicado, setClicado] = useState(true)
    return (
        <>
            <HeaderContainer>
                <Logo>
                    linkr
                </Logo>
                <Avatar onClick={() => setClicado(!clicado)}>
                    <IconDown clicado={clicado}>
                        <SlArrowDown/> 
                    </IconDown>
                    <IconUp clicado={clicado}>
                        <SlArrowUp/> 
                    </IconUp>
                    <img src={avatar} alt="Avatar"/>
                </Avatar>
            </HeaderContainer>
            <Logout clicado={clicado}>
                Logout
            </Logout>
        </>
        
    )
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
    color: #FFFFFF;
    border-bottom-left-radius: 20px;
    align-items: center;
    justify-content: center;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    @media (max-width: 375px) {
        width: 130px;
        font-size: 15px;
        line-height: 18px;
    }
`;