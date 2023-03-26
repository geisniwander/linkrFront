import Header from "../components/Header";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../AppContext/Context";
import { useNavigate } from "react-router-dom";
import Publish from "../components/Publish";
import Feed from "../components/Feed";
import HashtagBox from "../components/HashtagsBox";
import useInterval from "use-interval"
import {GrUpdate} from "react-icons/gr"
import InfiniteScroll from "react-infinite-scroller";

export default function Timeline () {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const { token, config } = useContext(AppContext);
    const [avatar, setAvatar] = useState();
    const [name, setName] = useState();
    const [posts, setPosts] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [newPosts, setNewPosts] = useState([]);
    const [showFollows, setShowFollows] = useState(false);

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
            const requisicaoLikes = axios.get(`${process.env.REACT_APP_API_URL}/user/showfollows`, { headers: { 'Authorization': `Bearer ${token}` } });
            requisicaoLikes.then((res) => { 
                console.log(res.data)
                setShowFollows(res.data) 
            });
            requisicaoLikes.catch((res) => { alert(res.response.data); });

    }, [ token, navigate, config ]);

    async function atualiza(){
        // setLoading(true)
        try {
            const request = await axios.get(`${process.env.REACT_APP_API_URL}/timeline`, { headers: { 'Authorization': `Bearer ${token}` } });
            setPosts(request.data);
            setLoading(false);
        } catch (error) {
            alert("An error occured while trying to fetch the posts, please refresh the page");
        }
    }

    function addPost(post){
        setPosts([post, ...posts])
    }

    function updateNewPosts(){
        const postsToAdd = newPosts.filter(p => (!posts.find(post=>post.post_id === p.post_id && p.repost_id === post.repost_id)))
        console.log(postsToAdd)
        setPosts([...postsToAdd, ...posts]);
        setNewPosts([])
    }

    const [hasMorePosts, setHasMorePosts] = useState(true);
    async function fetchOlderPosts(){
        const firstCurrentPost = posts.map(p=>Number(p.post_id)).reduce((p, c) => Math.min(p,c), 2 ** 31 - 1);
        const firstCurrentRepost = posts.map(p=>Number(p.repost_id)).reduce((p, c) => isNaN(c) ? 2 ** 31 - 1 : Math.min(p,c), 2 ** 31 - 1);
        try {
            const request = await axios.get(`${process.env.REACT_APP_API_URL}/timeline?postIdBefore=${firstCurrentPost}&repostIdBefore=${firstCurrentRepost}`, config);
            setPosts([...posts, ...request.data])
            if(request.data.length === 0) setHasMorePosts(false)
        } catch (error) {
            console.log(JSON.stringify(error))
        }
    }

    useInterval(async()=>{
        const lastCurrentPost = posts.map(p=>Number(p.post_id)).reduce((p, c) => Math.max(p,c), 0);
        const lastCurrentReposts = posts.map(p=>Number(p.repost_id)).reduce((p, c) => isNaN(c) ? 0 : Math.max(p,c), 0);
        try {
            const request = await axios.get(`${process.env.REACT_APP_API_URL}/timeline?postIdAfter=${lastCurrentPost}&repostIdAfter=${lastCurrentReposts}`, config);
            setNewPosts(request.data)
        } catch (error) {
            console.log(JSON.stringify(error))
        }

    },15000)

    useEffect(()=>{
        if (posts.length > 0)
            setShowFollows(true);
    }, [posts])

    return (
        <HomeContainer>
            <Header avatar={avatar}/>
            <BodyContainer>
                <TimelineContainer>
                    <Title>timeline</Title>
                    <Publish  avatar={avatar} atualiza={atualiza} addPost={addPost}/>
                    {newPosts?.length > 0 && <MorePostsButton data-test="load-btn" onClick={updateNewPosts}>
                        {newPosts.length} new posts, load more! <GrUpdate />
                    </MorePostsButton>}
                    { loading ? <Loading>Loading...</Loading>  :
                     <InfiniteScroll
                        pageStart={0}
                        loadMore={fetchOlderPosts}
                        hasMore={hasMorePosts}
                        loader={<LoadingMorePosts key="loader">Loading more posts...</LoadingMorePosts>}
                     >                  
                      <Feed showFollows={showFollows} posts={posts} name={name} atualiza={atualiza}/>
                   </InfiniteScroll>
                    } 
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

const MorePostsButton = styled.button`
    margin-top: 40px;
    width: 100%;
    border-radius: 16px;
    border-style: none;
    height: 61px;

    font-family: "Lato", sans-serif;
    font-size: 16px;
    color: white;
    background-color: #1877F2;
    svg path {
        stroke: #fff;
    }
`

const LoadingMorePosts = styled.div`
    font-size: 22px;
    font-family: "Lato", sans-serif;
    color: #6D6D6D;
    width: 100%;
    text-align: center;
`