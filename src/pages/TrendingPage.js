import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import AppContext from "../AppContext/Context";
import Header from "../components/Header";
import HashtagBox from "../components/HashtagsBox";
import PostComponent from "../components/PostComponent";

const testHashTags = [
  "javascript",
  "react",
  "react-native",
  "material",
  "web-dev",
  "mobile",
  "css",
  "html",
  "node",
  "sql",
];

export default function TrendingPage() {
  const navigate = useNavigate();
  const { config } = useContext(AppContext);
  const [avatar, setAvatar] = useState();
  const { hashtag } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      if (config) {
        const requisicao = axios.get(
          `${process.env.REACT_APP_API_URL}/hashtags/${hashtag}/posts`,
          config
        );
        requisicao.then((res) => {
          setPosts(res.data);
        });
        requisicao.catch((res) => {
          alert(res.response.data);
        });
      } else {
        navigate("/");
      }
    }
    fetchPosts();
  }, [hashtag]);

  useEffect(() => {
    if (config) {
      const requisicao = axios.get(
        `${process.env.REACT_APP_API_URL}/timeline`,
        config
      );
      requisicao.then((res) => {
        setAvatar(res.data.picture_url);
      });
      requisicao.catch((res) => {
        alert(res.response.data);
      });
    } else {
      navigate("/");
    }
  }, [config, navigate]);

  return (
    <HashtagsContent>
      <Header avatar={avatar} />
      <h1 data-test="hashtag-title"># {hashtag}</h1>
      <HashtagBoxContainer>
        <HashtagBox hashtags={testHashTags} />
      </HashtagBoxContainer>
      <PostsContainer>
        {posts.map((post) => (
          <PostComponent post={post} key={post.id} />
        ))}
      </PostsContainer>
    </HashtagsContent>
  );
}

const HashtagsContent = styled.div`
  h1 {
    padding-top: 127px;
    padding-left: 241px;
    height: 64px;
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    color: #ffffff;
    @media (max-width: 611px) {
      padding-left: 15px;
    }
  }
  background-color: #333333;
  height: 100vh;
`;

const PostsContainer = styled.div`
  margin-left: 241px;
  margin-top: 43px;
  width: 611px;
  @media (max-width: 1200px) {
    margin-left: calc(100% - 932px);
  }
  @media (max-width: 933px) {
    margin-left: 5px;
  }
  @media (max-width: 611px) {
    width: 100%;
    margin-left: auto;
  }
`;

const HashtagBoxContainer = styled.div`
  position: fixed;
  left: 862px;
  top: 232px;
  @media (max-width: 1200px) {
    left: calc(100% - 315px);
  }
  @media (max-width: 933px) {
    display: flex;
    justify-content: center;
    position: relative;
    left: auto;
    top: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
  }
`;
