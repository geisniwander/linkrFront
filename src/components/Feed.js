import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import AppContext from "../AppContext/Context";

export default function Feed({ posts }) {

    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    const [likes, setLikes] = useState([])

    useEffect(() => {

        const requisicaoLikes = axios.get(`${process.env.REACT_APP_API_URL}/likes`, { headers: { 'Authorization': `Bearer ${token}` } });
        requisicaoLikes.then((res) => {setLikes(res.data)});
        requisicaoLikes.catch((res) => { alert(res.response.data); });
        
    }, [ token, setLikes ]);

    function atualizaLikes(){
        const requisicaoLikes = axios.get(`${process.env.REACT_APP_API_URL}/likes`, { headers: { 'Authorization': `Bearer ${token}` } });
        requisicaoLikes.then((res) => {setLikes(res.data)});
        requisicaoLikes.catch((res) => { alert(res.response.data); });
    }

    function removelike(p){
        const requisicao = axios.delete(`${process.env.REACT_APP_API_URL}/likes/${p.id}`, { headers: { 'Authorization': `Bearer ${token}` } });
        requisicao.then((res) => {atualizaLikes()});
        requisicao.catch((res) => { alert(res.response.data); });
    }
    function postlike(p){
        const requisicao = axios.post(`${process.env.REACT_APP_API_URL}/likes`, {post_id: p.id}, { headers: { 'Authorization': `Bearer ${token}` } });
        requisicao.then((res) => {atualizaLikes()});
        requisicao.catch((res) => { alert(res.response.data); });
    }
    return (
        <FeedContainer>
            {(posts.length === 0) ? <Mensage data-test="message">There are no posts yet</Mensage> : posts.map(p => {
                const quantLikes = likes.filter(l => l.post_id === p.id)
                const liked = quantLikes.filter(l => l.username === p.username)
                return (
                    <Post key={p.id} data-test="post">
                        <AvatarLikeContainer>
                            <ImageAvatar src={p.picture_url} alt={"avatar"} />
                            {liked.length === 0 ? <AiOutlineHeart onClick={() => postlike(p)} data-test="like-btn"/> : <span onClick={() => removelike(p)} data-test="like-btn"><AiFillHeart/></span>}
                            <p data-test="counter">{quantLikes.length} likes</p>
                        </AvatarLikeContainer>
                        <ConteudoContainer>
                            <h4 data-test="username">{p.username}</h4>
                            <h5 data-test="description">
                                <ReactTagify
                                    colors={"#ffffff"}
                                    tagClicked={(tag) => { navigate(`/hashtag/${tag.replace("#", '')}`) }}
                                >
                                    {p.text}
                                </ReactTagify>
                            </h5>
                            <LinkContainer onClick={() => window.open(p.url)} data-test="link" >
                                <div>
                                    <h1>{p.title}</h1>
                                    <h2>{p.description}</h2>
                                    <h3>{p.url}</h3>
                                </div>
                                <ImageLink src={p.image} />
                            </LinkContainer>
                        </ConteudoContainer>
                    </Post>
                )
            })}
        </FeedContainer>

    )
}

const FeedContainer = styled.div`
    width: 100%;
    margin-top: 29px;
`;

const Mensage = styled.h3`
    color: #FFFFFF;
    font-size: 30px;
    text-align: center;
    margin-top: 60px;
`;

const AvatarLikeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 30px;
    span{
        color: #AC0000;
    }
    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        text-align: center;
        color: #FFFFFF;
        margin-top: 4px;
        @media (max-width: 375px) {
            font-size: 9px;
            line-height: 11px;
        }
    }

`;

const ConteudoContainer = styled.div`
    margin: 19px 0px;
`;

const Post = styled.div`
    min-height: 276px;
    background-color: #171717;
    border-radius: 16px;
    margin-bottom: 16px;
    color: #FFFFFF;
    display: flex;
    padding-top: 19px;
    padding-bottom: 19px;
    h4{
        display: flex;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        margin-bottom: 7px;
        flex-wrap: wrap;
        margin-right: 22px;
        @media (max-width: 375px) {
            font-size: 17px;
            line-height: 20px;
        }
    }
    h5{
        display: flex;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
        flex-wrap: wrap;
        margin-bottom: 7px;
        margin-right: 22px;
        @media (max-width: 375px) {
            font-size: 15px;
            line-height: 18px;
        }
    }
    @media (max-width: 375px) {
        border-radius: 0px;
        min-height: 232px;
    }
`;

const LinkContainer = styled.div`
    width: 503px;
    min-height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 375px) {
        width: 278px;
        min-height: 115px;
    }
    div{
        margin: 19px;
        @media (max-width: 375px) {
            margin: 8px;
        }
    }
    h1{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400; 
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
        margin-bottom: 5px;
        @media (max-width: 375px) {
            font-size: 11px;
            line-height: 13px;
            margin-bottom: 4px;
        }
    }
    h2{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
        margin-bottom: 13px;
        @media (max-width: 375px) {
            font-size: 9px;
            line-height: 11px;
            margin-bottom: 4px;
        }
    }
    h3{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
        @media (max-width: 375px) {
            font-size: 9px;
            line-height: 11px;
        }
    }
`;

const ImageLink = styled.img`
    margin: 0;
    min-width: 153.44px;
    width: 153.44px;
    min-height: 155px;
    height: 155px;
    border-radius: 0px 12px 13px 0px;
    @media (max-width: 375px) {
        width: 95px;
        height: 115px;
    }
    
`;

const ImageAvatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin: 17px 18px;
    @media (max-width: 375px) {
        width: 40px;
        height: 40px;
    }
`;