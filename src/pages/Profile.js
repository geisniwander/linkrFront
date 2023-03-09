import Header from "../components/Header";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../AppContext/Context";
import { useNavigate, useParams } from "react-router-dom";
import Feed from "../components/Feed";
import HashtagBox from "../components/HashtagsBox";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token, config } = useContext(AppContext);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState();
  const [posts, setPosts] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (token) {
      console.log(id);
      const requisicaoAvatar = axios.get(
        `${process.env.REACT_APP_API_URL}/avatar`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      requisicaoAvatar.then((res) => {
        setAvatar(res.data.picture_url);
      });
      requisicaoAvatar.catch((res) => {
        alert(res.response.data);
      });

      const requisicaoProfile = axios.get(
        `${process.env.REACT_APP_API_URL}/user/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      requisicaoProfile.then((res) => {
        setName(res.data.user.username);
        setPosts(res.data.user.user_posts);
        setLoading(false);
      });
      requisicaoProfile.catch((res) => {
        alert(res.response.data);
      });

      axios
        .get(`${process.env.REACT_APP_API_URL}/hashtags`, config)
        .then((res) => {
          setHashtags(res.data.map((a) => a.name.replace("#", "")));
        })
        .catch((res) => {
          alert(res.response.data);
        });
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  function atualiza() {
    //setLoading(true);
    const requisicaoAvatar = axios.get(
      `${process.env.REACT_APP_API_URL}/avatar`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    requisicaoAvatar.then((res) => {
      setAvatar(res.data.user.picture_url);
    });
    requisicaoAvatar.catch((res) => {
      alert(res.response.data);
    });

    const requisicaoProfile = axios.get(
      `${process.env.REACT_APP_API_URL}/user/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    requisicaoProfile.then((res) => {
      setName(res.data.user.username);
      setPosts(res.data.user.user_posts);
      setLoading(false);
    });
    requisicaoProfile.catch((res) => {
      alert(res.response.data);
    });
  }

  return (
    <HomeContainer>
      <Header avatar={avatar} />
      <BodyContainer>
        <TimelineContainer>
          <Title>{name}</Title>

          {loading ? (
            <Loading>Loading...</Loading>
          ) : (
            <Feed posts={posts} name={name} />
          )}
        </TimelineContainer>
        <HashtagBoxContainer>
          <HashtagBox hashtags={hashtags} />
        </HashtagBoxContainer>
      </BodyContainer>
    </HomeContainer>
  );
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
  color: #ffffff;
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
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
  margin: 78px 0px 43px 0px;
  @media (max-width: 375px) {
    font-size: 33px;
    line-height: 49px;
    margin: 19px 0px 19px 17px;
  }
`;
