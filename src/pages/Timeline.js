import Header from "../components/Header";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../AppContext/Context";
import { useNavigate } from "react-router-dom";

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
        <TimelineContainer>
            <Header avatar={avatar}/>
        </TimelineContainer>
    )
}

const TimelineContainer = styled.div`
    background-color: #333333;
    width: 100%;
    height: 100vh;
`;