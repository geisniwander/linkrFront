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
  const [avatarProfile, setAvatarProfile] = useState();
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [posts, setPosts] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [ follow, setFollow ] = useState(false);
  const [ disabled, setDisabled ] = useState(false);
  const [button, setButton] = useState(false);
  const { data } = useContext(AppContext);
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
        setUserName(res.data.username)
      });
      requisicaoAvatar.catch((res) => {
        alert(res.response.data);
      });

      const requisicaoProfile = axios.get(
        `${process.env.REACT_APP_API_URL}/user/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      requisicaoProfile.then((res) => {
        console.log(res.data);
        setAvatarProfile(res.data.user.picture_url)
        setName(res.data.user.username);
        setPosts(res.data.user.user_posts);
        setLoading(false);
       
      });
      requisicaoProfile.catch((res) => {
        alert(res.response.data);
      });

      const requisicaoFollow = axios.get(
        `${process.env.REACT_APP_API_URL}/user/${id}/status`,
        {headers:{ Authorization: `Bearer ${token}`}}
      );
      requisicaoFollow.then((res) => {
        console.log("retorno " + res.data)
        setFollow(res.data);
        setLoading(false);
        console.log(follow);
      })
      requisicaoFollow.catch((error) =>{
        console.log(error.message)
        alert("Something went wrong, please refresh the page.");
        setLoading(false);
      })

      const requisicaoButton = axios.get(
        `${process.env.REACT_APP_API_URL}/user/${id}/showbutton`,
        {headers:{ Authorization: `Bearer ${token}`}}
        );
        requisicaoButton.then((res) => {
          setButton(res.data);
          
        })
        requisicaoButton.catch((err) => {
          console.log(err.message);
          alert("Error loading button")
        })

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
  }, [token, navigate, config, id, button, follow]);

  function atualiza() {
    //setLoading(true);
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
 





  function following(){
    setLoading(true);
    const requisicao = axios.get(
      `${process.env.REACT_APP_API_URL}/user/${id}/follow`,
      { headers: { Authorization: `Bearer ${token}`}}
    );
    requisicao.then((res) => {
      setFollow(!follow);
      setLoading(false);
    });
    requisicao.catch((error) => {
      alert("Something went wrong, please try again!");
      setLoading(false);
    })
  } 

  



  return (
    <HomeContainer>
      <Header avatar={avatar} />
      <BodyContainer>
        <TimelineContainer>
          <TitleWrapper>
          <Title> <img src={avatarProfile} alt=""/> {name}'s posts</Title>
          {button ? <FollowButton data-test="follow-btn" follow={follow} loading={loading} onClick={following}>{follow ? "Follow" : "Unfollow"}</FollowButton> : null}
          
          
          
          
          </TitleWrapper>
          

          {loading ? (
            <Loading>Loading...</Loading>
          ) : (
            <Feed posts={posts} name={userName} atualiza={atualiza}/>
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
  @media (max-width: 913px) {
    width: 100%;
  }
`;
const TimelineContainer = styled.div`
  max-width: 611px;
  @media (max-width: 913px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
  margin: 78px 0px 43px 0px;
  display: flex;
  align-items:center;
  @media (max-width: 375px) {
    font-size: 33px;
    line-height: 49px;
    margin: 19px 0px 19px 17px;
  }
  img{
    width: 10%;
    border-radius:50%;
    margin-left:20px;
    margin-right:20px;
    @media (max-width: 650px) {
      width: 20%;
    }
  }
`;

const FollowButton = styled.button`
width: 110px;
height: 30px;
margin-top: 50px;
background-color: ${props => props.follow ? "#1877F2" : "FFF" };
color: ${props => props.follow ? "white" : "#1877F2" };
margin-left: 190px;
border: 1px solid;
border-color: ${props => props.follow ? "#1877F2" : "FFF" };
border-radius: 5px;
@media (max-width: 913px) {
  width: 200px;
  margin-left: 50px;
}


`

const TitleWrapper = styled.div`
width: 950px;
height: 90px;
display: flex;
align-items: center;
@media (max-width: 913px){
  width: 100%;
}

`