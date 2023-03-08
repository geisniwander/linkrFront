import Header from "../components/Header";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../AppContext/Context";
import { useNavigate } from "react-router-dom";
import Publish from "../components/Publish";
import Feed from "../components/Feed";

export default function Timeline () {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    const [avatar, setAvatar] = useState();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (token) {

            const requisicaoAvatar = axios.get(`${process.env.REACT_APP_API_URL}/avatar`, { headers: { 'Authorization': `Bearer ${token}` } });
            requisicaoAvatar.then((res) => {setAvatar(res.data.picture_url)});
            requisicaoAvatar.catch((res) => { alert(res.response.data); });

            const requisicaoPosts = axios.get(`${process.env.REACT_APP_API_URL}/timeline`, { headers: { 'Authorization': `Bearer ${token}` } });
            requisicaoPosts.then((res) => {setPosts(res.data);setLoading(false)});
            requisicaoPosts.catch((res) => { alert("An error occured while trying to fetch the posts, please refresh the page"); });
            
        }else{
            navigate("/");
        }
    }, [ token, navigate ]);

    function atualiza(){
        setLoading(true)
        const requisicao = axios.get(`${process.env.REACT_APP_API_URL}/timeline`, { headers: { 'Authorization': `Bearer ${token}` } });
        requisicao.then((res) => {setPosts(res.data);setLoading(false)});
        requisicao.catch((res) => { alert("An error occured while trying to fetch the posts, please refresh the page"); });
    }

    return (
        <HomeContainer>
            <Header avatar={avatar}/>
            <TimelineContainer>
                <Title>timeline</Title>
                <Publish  avatar={avatar} atualiza={atualiza}/>
                { loading ? <Loading>Loading...</Loading>  : <Feed posts={posts}/>} 
            </TimelineContainer>
        </HomeContainer>
    )
}

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
    padding-top: 72px;
`;
const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: #FFFFFF;
    font-size: 30px;
    text-align: center;
    margin-top: 60px;
    
`
const TimelineContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: 611px;
`;

const Title = styled.h1`
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
`;