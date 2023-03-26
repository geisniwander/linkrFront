import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillDelete,
  AiOutlineComment,
} from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { TiPencil } from "react-icons/ti";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import AppContext from "../AppContext/Context";
import { Tooltip } from "react-tooltip";
import { useRef } from "react";
import Modal from "styled-react-modal";
import Comments from "./Comments";

export default function Post({ p, name, atualiza }) {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [likes, setLikes] = useState([]);
  const [reposts, setReposts] = useState([]);
  const [edit, setEdit] = useState(p.text);
  const liked = likes.filter((l) => l.username === name);
  const reposted = reposts.filter((l) => l.username === name);
  const [clicado, setClicado] = useState(false);
  const [desabilitado, setDesabilitado] = useState(false);
  const [modalDeleteIsOpen, setDeleteIsOpen] = useState(false);
  const [modalRepostIsOpen, setRepostIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const nameRef = useRef();

  useEffect(() => {
    if (clicado) {
      nameRef.current.focus();
    }
    if (p.post_id) {
      const requisicaoLikes = axios.get(
        `${process.env.REACT_APP_API_URL}/likes/${p.post_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      requisicaoLikes.then((res) => {
        setLikes(res.data);
      });
      requisicaoLikes.catch((res) => {
        alert(res.response.data);
      });

      const requisicaoComentarios = axios.get(
        `${process.env.REACT_APP_API_URL}/comments/${p.post_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      requisicaoComentarios.then((res) => {
        setComments(res.data.length);
        setRefresh(false);
      });
      requisicaoComentarios.catch((res) => {
        alert(res.response.data);
      });

      const requisicaoReposts = axios.get(
        `${process.env.REACT_APP_API_URL}/reposts/${p.post_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      requisicaoReposts.then((res) => {
        setReposts(res.data);
      });
      requisicaoReposts.catch((res) => {
        alert(res.response.data);
      });
    } else {
      setLikes([]);
    }
  }, [token, setLikes, clicado, p, refresh]);

  function atualizaLikes() {
    const requisicaoLikes = axios.get(
      `${process.env.REACT_APP_API_URL}/likes/${p.post_id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    requisicaoLikes.then((res) => {
      setLikes(res.data);
      atualiza();
    });
    requisicaoLikes.catch((res) => {
      alert(res.response.data);
    });
  }

  function removelike(p) {
    const requisicao = axios.delete(
      `${process.env.REACT_APP_API_URL}/likes/${p.post_id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    requisicao.then((res) => {
      atualizaLikes();
    });
    requisicao.catch((res) => {
      alert(res.response.data);
    });
  }
  function postlike(p) {
    const requisicao = axios.post(
      `${process.env.REACT_APP_API_URL}/likes`,
      { post_id: p.post_id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    requisicao.then((res) => {
      atualizaLikes();
    });
    requisicao.catch((res) => {
      alert(res.response.data);
    });
  }
  function names(array, done) {
    let message = "";
    const uniqueObjects = [...new Set(array.map((item) => item.username))];
    if (done.length !== 0) {
      message += "Você";
      const quant = uniqueObjects.filter((l) => l !== done[0].username);
      if (quant.length === 1) {
        message += ` e ${quant[0]}`;
      } else if (quant.length > 1) {
        message += `, ${quant[0]} e outras ${quant.length - 1}`;
      }
    } else {
      if (uniqueObjects.length === 1) {
        message += `${uniqueObjects[0]}`;
      } else if (uniqueObjects.length === 2) {
        message += `${uniqueObjects[0]} e ${uniqueObjects[1]}`;
      } else if (uniqueObjects.length > 2) {
        message += `${uniqueObjects[0]}, ${uniqueObjects[1]} e outras ${
          uniqueObjects.length - 2
        }`;
      }
    }
    return `<span data-test="tooltip">${message}</span>`;
  }
  function onKeyPressed(e) {
    if (e.keyCode === 27) {
      setEdit(p.text);
      setClicado(false);
    }
    if (e.keyCode === 13) {
      setDesabilitado(true);
      const requisicao = axios.put(
        `${process.env.REACT_APP_API_URL}/publish`,
        { post_id: p.post_id, description: edit },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      requisicao.then((res) => {
        setClicado(false);
        setDesabilitado(false);
        atualiza();
      });
      requisicao.catch((res) => {
        alert(res.response.data);
        setDesabilitado(false);
      });
    }
  }
  function toggleModalDelete(e) {
    setDeleteIsOpen(!modalDeleteIsOpen);
  }
  function toggleModalRepost(e) {
    setRepostIsOpen(!modalRepostIsOpen);
  }
  function deletePublish() {
    setLoading(true);
    const requisicao = axios.delete(
      `${process.env.REACT_APP_API_URL}/publish/${p.post_id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    requisicao.then((res) => {
      setLoading(false);
      setDeleteIsOpen(!modalDeleteIsOpen);
      atualiza();
    });
    requisicao.catch((res) => {
      alert(res.response.data);
      setDeleteIsOpen(!modalDeleteIsOpen);
    });
  }

  function comment() { }

  function repostPublish() {
    setLoading(true);
    const requisicao = axios.post(
      `${process.env.REACT_APP_API_URL}/reposts`,
      { post_id: p.post_id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    requisicao.then((res) => {
      setLoading(false);
      setRepostIsOpen(!modalRepostIsOpen);
      atualiza();
    });
    requisicao.catch((res) => {
      alert(res.response.data);
      setRepostIsOpen(!modalRepostIsOpen);
    });
  }
  return (
    <>
      <Repost reposted_by={p.reposted_by}>
        <BiRepostStyled />
        <span>
          Re-posted by{" "}
          <strong>{p.reposted_by === name ? "you" : p.reposted_by}</strong>
        </span>
      </Repost>

      <PostContainer
        clicado={clicado}
        reposted_by={p.reposted_by}
        data-test="post"
      >
        <AvatarLikeContainer>
          <ImageAvatar src={p.picture_url} alt={"avatar"} />
          {liked.length === 0 ? (
           <div data-test="like-btn">
              <AiOutlineHeart onClick={() => postlike(p)}  />
           </div> 
          ) : (
            <AiFillHeartStyled
              onClick={() => removelike(p)}
              data-test="like-btn"
            />
          )}
          <p
            data-tooltip-id="my-tooltip"
            data-tooltip-html={
              likes.length === 0
                ? `<span data-test="tooltip"> Ninguém curtiu </span>`
                : names(likes, liked)
            }
            data-test="counter"
          >
            {likes.length} likes
          </p>
          <ReactTooltipStyled
            id="my-tooltip"
            data-test="tooltip"
            isOpen={true}
          />
          <div data-test="comment-btn">
            <AiOutlineComment
              onClick={() =>
                openComments === false
                  ? setOpenComments(true)
                  : setOpenComments(false)
              }
              data-test="comment-btn"
            />
          </div>
          <p data-test="comment-counter">{comments} comments</p>
          <div data-test="repost-btn">
            <BiRepost
              onClick={() => setRepostIsOpen(!modalRepostIsOpen)}
              data-test="repost-btn"
              />
          </div>
          <p
            data-tooltip-id="my-tooltip"
            data-tooltip-html={reposts.length === 0 ? `<span data-test="tooltip"> Ninguém repostou </span>` : names(reposts, reposted)}
            data-test="repost-counter"
          >
            {reposts.length} re-posts
          </p>
          <ReactTooltipStyled
            id="my-tooltip"
            data-test="tooltip"
            isOpen={true}
          />
        </AvatarLikeContainer>
        <div>
          <PostHeaderContainer myPost={p.username === name}>
            <h4
              data-test="username"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/user/${p.user_id}`);
              }}
            >
              {p.username}
            </h4>
            <div>
              <TiPencilStyled
                onClick={() => {
                  setDesabilitado(false);
                  setClicado(!clicado);
                  setEdit(p.text);
                }}
                data-test="edit-btn"
              />
              <AiFillDelete
                onClick={() => setDeleteIsOpen(!modalDeleteIsOpen)}
                data-test="delete-btn"
              />
            </div>
          </PostHeaderContainer>
          <h5 data-test="description">
            <ReactTagify
              colors={"#ffffff"}
              tagClicked={(tag) => {
                navigate(`/hashtag/${tag.replace("#", "")}`);
              }}
            >
              {p.text}
            </ReactTagify>
          </h5>
          <Description
            disabled={desabilitado}
            ref={nameRef}
            clicado={clicado}
            type="text"
            value={edit}
            onChange={(e) => setEdit(e.target.value)}
            onKeyDown={onKeyPressed}
            data-test="edit-input"
          />
          <LinkContainer href={p.url} target="_blank" data-test="link">
            <div>
              <h1>{p.title}</h1>
              <h2>{p.description}</h2>
              <h3>{p.url}</h3>
            </div>
            <ImageLink src={p.image} />
          </LinkContainer>
        </div>
        <StyledModal
          isOpen={modalDeleteIsOpen}
          onBackgroundClick={toggleModalDelete}
          onEscapeKeydown={toggleModalDelete}
        >
          <Loading loading={loading}>Loading...</Loading>
          <ModalContainer loading={loading}>
            <TitleModal>
              Are you sure you want
              <br />
              to delete this post?
            </TitleModal>
            <div>
              <ButtonCancel onClick={toggleModalDelete} data-test="cancel">
                No, go back
              </ButtonCancel>
              <ButtonConfirm onClick={deletePublish} data-test="confirm">
                Yes, delete it
              </ButtonConfirm>
            </div>
          </ModalContainer>
        </StyledModal>
        <StyledModal
          isOpen={modalRepostIsOpen}
          onBackgroundClick={toggleModalRepost}
          onEscapeKeydown={toggleModalRepost}
        >
          <Loading loading={loading}>Loading...</Loading>
          <ModalContainer loading={loading}>
            <TitleModal>
              Do you want to re-post
              <br />
              this link?
            </TitleModal>
            <div>
              <ButtonCancel onClick={toggleModalRepost} data-test="cancel">
                No, cancel
              </ButtonCancel>
              <ButtonConfirm onClick={repostPublish} data-test="confirm">
                Yes, share!
              </ButtonConfirm>
            </div>
          </ModalContainer>
        </StyledModal>
      </PostContainer>
      {openComments && (
        <Comments
          atualiza={atualiza}
          post_id={p.post_id}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
}
const Loading = styled.div`
  display: ${(props) => (props.loading ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #ffffff;
  font-size: 30px;
  text-align: center;
`;
const ModalContainer = styled.div`
  display: ${(props) => (!props.loading ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
`;
const ReactTooltipStyled = styled(Tooltip)`
  padding: 5px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
  color: #505050;
`;

const AiFillHeartStyled = styled(AiFillHeart)`
  color: #ff0000;
`;
const AvatarLikeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 26px;
  margin-right: 15px;
  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    text-align: center;
    color: #ffffff;
    margin-top: 4px;
    margin-bottom: 6px;
    @media (max-width: 650px) {
      font-size: 9px;
      line-height: 11px;
    }
  }
`;
const TiPencilStyled = styled(TiPencil)`
  margin-right: 10px;
`;
const PostHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: ${(props) => (props.myPost ? "flex" : "none")};
  }
  @media (max-width: 650px) {
    width: 95%;
  }
`;

const PostContainer = styled.div`
  background-color: #171717;
  border-radius: 16px;
  color: #ffffff;
  display: flex;
  padding: 19px;
  word-break: break-all;
  margin-bottom: 16px;
  margin-top: ${(props) => (props.reposted_by ? "-25px" : "0")};
  @media (max-width: 650px) {
    border-radius: 0px;
    min-height: 232px;
  }
  h4 {
    display: flex;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    margin-bottom: 7px;
    flex-wrap: wrap;
    cursor: pointer;
    @media (max-width: 650px) {
      font-size: 17px;
      line-height: 20px;
    }
  }
  h5 {
    display: ${(props) => (!props.clicado ? "flex" : "none")};
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
    flex-wrap: wrap;
    margin-bottom: 20px;
    @media (max-width: 650px) {
      font-size: 15px;
      line-height: 18px;
    }
  }
`;

const Description = styled.input`
  display: ${(props) => (props.clicado ? "flex" : "none")};
  width: 490px;
  background: #ffffff;
  border-radius: 7px;
  border: none;
  padding: 10px 0px 10px 10px;
  margin: 15px 0px;
`;

const LinkContainer = styled.a`
  width: 490px;
  min-height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  div {
    margin: 19px;
    @media (max-width: 650px) {
      margin: 8px;
    }
  }
  h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
    margin-bottom: 5px;
    @media (max-width: 650px) {
      font-size: 11px;
      line-height: 13px;
      margin-bottom: 4px;
    }
  }
  h2 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
    margin-bottom: 13px;
    @media (max-width: 650px) {
      font-size: 9px;
      line-height: 11px;
      margin-bottom: 4px;
    }
  }
  h3 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
    @media (max-width: 650px) {
      font-size: 9px;
      line-height: 11px;
    }
  }
  @media (max-width: 650px) {
    width: 100%;
    min-height: 115px;
  }
`;

const ImageLink = styled.img`
  margin: 0;
  min-width: 153.44px;
  width: 153.44px;
  min-height: 155px;
  height: 100fr;
  border-radius: 0px 12px 13px 0px;
  @media (max-width: 650px) {
    width: 95px;
    height: 115px;
    display: flex;
  }
`;

const ImageAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  margin-bottom: 18px;
  @media (max-width: 650px) {
    width: 40px;
    height: 40px;
  }
`;

const StyledModal = Modal.styled`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 597px;
    height: 262px;
    background-color: #333333;
    border-radius: 50px;
`;

const TitleModal = styled.span`
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 41px;
  text-align: center;
  color: #ffffff;
  margin-bottom: 40px;
`;

const ButtonCancel = styled.button`
  width: 134px;
  height: 37px;
  background-color: #ffffff;
  border-radius: 5px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #1877f2;
  margin-right: 15px;
  border: none;
`;

const ButtonConfirm = styled.button`
  width: 134px;
  height: 37px;
  background-color: #1877f2;
  border-radius: 5px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
  border: none;
  margin-left: 15px;
`;

const Repost = styled.div`
  display: ${(props) => (props.reposted_by ? "flex" : "none")};
  background-color: #1e1e1e;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #ffffff;
  height: 40px;
  padding: 10px 15px;
  span {
    margin-left: 10px;
    margin-top: 2px;
  }
  strong {
    font-weight: bold;
  }
`;

const BiRepostStyled = styled(BiRepost)`
  font-size: 18px;
`;
