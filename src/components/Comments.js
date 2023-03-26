import styled from "styled-components";
import AppContext from "../AppContext/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

export default function Comments(props) {
  const { post_id, refresh, setRefresh, atualiza } = props;
  const navigate = useNavigate();
  const { token, config } = useContext(AppContext);
  const [avatar, setAvatar] = useState();
  const [text, setText] = useState();
  const [comments, setComments] = useState();
  const [ref, setRef] = useState();

  useEffect(() => {
    if (token) {
      const requisicaoAvatar = axios.get(
        `${process.env.REACT_APP_API_URL}/avatar`,
        config
      );
      requisicaoAvatar.then((res) => {
        setAvatar(res.data.picture_url);
      });
      requisicaoAvatar.catch((res) => {
        alert(res.response.data);
      });

      const requisicaoComentarios = axios.get(
        `${process.env.REACT_APP_API_URL}/comments/${post_id}`,
        config
      );
      requisicaoComentarios.then((res) => {
        console.log(res.data);
        setComments(res.data);
      });
      requisicaoComentarios.catch((res) => {
        alert(res.response.data);
      });
    } else {
      navigate("/");
    }
    //setRefresh(true);
    //setRef(false);
  }, [token, navigate, refresh, ref]);

  function postComment(e) {
    e.preventDefault();

    if (token) {
      const comment = axios.post(
        `${process.env.REACT_APP_API_URL}/comments`,
        { post_id, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      comment.then((res) => {
        setText("");
        setRef(true);
        setRefresh(true);
        atualiza();
      });
      comment.catch((res) => {
        alert(res.response.data);
      });
      console.log(comments);
    } else {
      navigate("/");
    }
  }

  function following(post_author, user_id, username) {
    if (post_author === user_id) return <spam> • post's author</spam>;
  }

  return (
    <StyledBox data-test="comment-box">
      {comments?.map((comment) => (
        <Comment data-test="comment">
          <Avatar>
            <img src={comment.picture_url} alt="Avatar" data-test="" />
          </Avatar>
          <Texts>
            <h1>
              {comment.username}{" "}
              {following(
                comment.post_author,
                comment.user_id,
                comment.username
              )}
            </h1>
            <p>{comment.text}</p>
          </Texts>
        </Comment>
      ))}
      <UserContainer>
        <Avatar>
          <img src={avatar} alt="Avatar" data-test="avatar" />
        </Avatar>
        <InputContainer>
          <Input
            type="text"
            placeholder="write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            data-test="comment-input"
            required
          />
          <div data-test="comment-submit">
          <ion-icon
            name="paper-plane-outline"
            onClick={(e) => postComment(e)}
            ></ion-icon>
          </div>
        </InputContainer>
      </UserContainer>
    </StyledBox>
  );
}

const StyledBox = styled.div`
  margin-top: -30px;
  font-family: "Lato";
  font-style: normal;
  width: 100%;
  min-height: 50px;
  background: #1e1e1e;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  border-radius: 0 0 16px 16px;
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 17px;
  img {
    width: 45px;
    height: 45px;
    border-radius: 26.5px;
    margin-left: 16.5px;
    @media (max-width: 375px) {
      width: 40px;
      height: 40px;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  height: 80%;
  margin: 2%;
  border: none;
  font-family: "Lato";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  color: #707070;
  background: #333333;
  :focus {
    outline-offset: 0px !important;
    outline: none !important;
  }

  @media (max-width: 375px) {
    font-size: 17px;
    line-height: 20px;
    text-align: center;
    margin-top: 10px;
  }
`;

const InputContainer = styled.div`
  width: 80%;
  margin-right: 5%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333333;
  border-radius: 5px;
  ion-icon {
    font-size: 40px;
    margin-right: 10px;
  }
`;

const UserContainer = styled.div`
  width: 90%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  border-radius: 5px;
  ion-icon {
    font-size: 30px;
    margin-right: 10px;
    color: white;
  }
  background: #1e1e1e;
`;

const Comment = styled.div`
  width: 90%;
  height: 70px;
  display: flex;
  color: white;
  align-items: center;
  background: #1e1e1e;
  border-bottom: 1px solid #353535;
  ion-icon {
    font-size: 40px;
    margin-right: 10px;
  }
  spam {
    color: gray;
  }
  h1 {
    font-weight: 700;
    margin-bottom: 5px;
  }
`;

const Texts = styled.div``;
