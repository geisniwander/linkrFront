import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import AppContext from "../AppContext/Context";
import Header from "../components/Header";
import HashtagBox from "../components/HashtagsBox";

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
      <HashtagBox hashtags={testHashTags} />
    </HashtagsContent>
  );
}

const HashtagsContent = styled.div`
  h1 {
    padding-top: 127px;
    padding-left: 64px;
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    color: #ffffff;
  }
  background-color: #333333;
  height: 100vh;
`;
