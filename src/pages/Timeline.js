import Header from "../components/Header";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../AppContext/Context";
import { useNavigate } from "react-router-dom";
import Publish from "../components/Publish";
import Feed from "../components/Feed";
import HashtagBox from "../components/HashtagsBox";

export default function Timeline () {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const { token, config } = useContext(AppContext);
    const [avatar, setAvatar] = useState();
    const [name, setName] = useState();
    const [posts, setPosts] = useState([]);
    const [hashtags, setHashtags] = useState([]);

    useEffect(() => {
        if (token) {

            const requisicaoAvatar = axios.get(`${process.env.REACT_APP_API_URL}/avatar`, config);
            requisicaoAvatar.then((res) => {setAvatar(res.data.picture_url); setName(res.data.username)});
            requisicaoAvatar.catch((res) => { alert(res.response.data); });

            const requisicaoPosts = axios.get(`${process.env.REACT_APP_API_URL}/timeline`, config);
            requisicaoPosts.then((res) => {setPosts(res.data);setLoading(false)});
            requisicaoPosts.catch((res) => { alert("An error occured while trying to fetch the posts, please refresh the page"); });
            
            axios.get(`${process.env.REACT_APP_API_URL}/hashtags`, config)
            .then((res) => {
                setHashtags(res.data.map((a) => a.name.replace("#", "")));
            })
            .catch((res) => {
                alert(res.response.data);
            });
        }else{
            navigate("/");
        }
    }, [ token, navigate, config ]);

    function atualiza(){
        // setLoading(true)
        const requisicao = axios.get(`${process.env.REACT_APP_API_URL}/timeline`, { headers: { 'Authorization': `Bearer ${token}` } });
        requisicao.then((res) => {setPosts(res.data);setLoading(false)});
        requisicao.catch((res) => { alert("An error occured while trying to fetch the posts, please refresh the page"); });
    }

    function addPost(post){
        setPosts([post, ...posts])
    }

    return (
        <HomeContainer>
            <Header avatar={avatar}/>
            <BodyContainer>
                <TimelineContainer>
                    <Title>timeline</Title>
                    <Publish  avatar={avatar} atualiza={atualiza} addPost={addPost}/>
                    { loading ? <Loading>Loading...</Loading>  : <Feed posts={posts} name={name} atualiza={atualiza}/>} 
                </TimelineContainer>
                <HashtagBoxContainer>
                    <HashtagBox hashtags={hashtags} />
                </HashtagBoxContainer>
            </BodyContainer>  
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
    
`;
const HashtagBoxContainer = styled.div`
    margin-top: 160px;
    margin-left: 25px;
    @media (max-width: 913px) {
        display: none;
    }

`;
const BodyContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const TimelineContainer = styled.div`
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