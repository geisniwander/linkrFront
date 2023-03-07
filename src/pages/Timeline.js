import Header from "../components/Header";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../AppContext/Context";
import { useNavigate } from "react-router-dom";
import Publish from "../components/Publish";

export default function Timeline () {

    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        if (token) {
            const requisicao = axios.get(`${process.env.REACT_APP_API_URL}/timeline`, { headers: { 'Authorization': `Bearer ${token}` } });
            requisicao.then((res) => {setAvatar(res.data.picture_url)});
            requisicao.catch((res) => { alert(res.response.data); });
        }else{
            navigate("/");
        }
    }, [ token, navigate ]);

    return (
        <HomeContainer>
            <Header avatar={avatar}/>
            <TimelineContainer>
                <h1>timeline</h1>
                <Publish  avatar={avatar}/>
            </TimelineContainer>
        </HomeContainer>
    )
}

const HomeContainer = styled.div`
    background-color: #333333;
    width: 100%;
    height: 100vh;
    padding-top: 72px;
`;

const TimelineContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: 611px;
    h1{
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
        margin: 78px 0px 43px 0px;
        @media (max-width: 375px) {
            font-size: 33px;
            line-height: 49px;
            margin: 19px 0px 19px 17px;
        }
    }
`;