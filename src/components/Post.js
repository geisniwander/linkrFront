import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart, AiFillDelete } from "react-icons/ai";
import { TiPencil } from "react-icons/ti";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import AppContext from "../AppContext/Context";
import { Tooltip } from 'react-tooltip';
import { useRef } from "react";
import Modal from 'styled-react-modal';

export default function Post({ p, name, atualiza }) {

    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    const [likes, setLikes] = useState([])
    const [edit, setEdit] = useState(p.text)
    const liked = likes.filter(l => l.username === name)
    const [clicado, setClicado] = useState(false);
    const [desabilitado, setDesabilitado] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const nameRef = useRef();

    useEffect(() => {
        if (clicado) {
            nameRef.current.focus();
        }
        if (p.post_id) {
            const requisicaoLikes = axios.get(`${process.env.REACT_APP_API_URL}/likes/${p.post_id}`, { headers: { 'Authorization': `Bearer ${token}` } });
            requisicaoLikes.then((res) => { setLikes(res.data) });
            requisicaoLikes.catch((res) => { alert(res.response.data); });
        }else{
            setLikes([])
        }
    }, [token, setLikes, clicado, p]);

    function atualizaLikes() {
        const requisicaoLikes = axios.get(`${process.env.REACT_APP_API_URL}/likes/${p.post_id}`, { headers: { 'Authorization': `Bearer ${token}` } });
        requisicaoLikes.then((res) => { setLikes(res.data) });
        requisicaoLikes.catch((res) => { alert(res.response.data); });
    }

    function removelike(p) {
        const requisicao = axios.delete(`${process.env.REACT_APP_API_URL}/likes/${p.post_id}`, { headers: { 'Authorization': `Bearer ${token}` } });
        requisicao.then((res) => { atualizaLikes() });
        requisicao.catch((res) => { alert(res.response.data); });
    }
    function postlike(p) {
        const requisicao = axios.post(`${process.env.REACT_APP_API_URL}/likes`, { post_id: p.post_id }, { headers: { 'Authorization': `Bearer ${token}` } });
        requisicao.then((res) => { atualizaLikes() });
        requisicao.catch((res) => { alert(res.response.data); });
    }
    function names() {
        let message = ""
        if (liked.length !== 0) {
            message += "Você"
            const quant = likes.filter(l => l.username !== liked[0].username)
            if (quant.length === 1) {
                message += ` e ${quant[0].username}`
            } else if (quant.length > 1) {
                message += `, ${quant[0].username} e outras ${quant.length - 1}`
            }
        } else {
            if (likes.length === 1) {
                message += `${likes[0].username}`
            } else if (likes.length === 2) {
                message += `${likes[0].username} e ${likes[1].username}`
            } else if (likes.length > 2) {
                message += `${likes[0].username}, ${likes[1].username} e outras ${likes.length - 2}`
            }
        }

        return `<span data-test="tooltip">${message}</span>`

    }
    function onKeyPressed(e) {
        if (e.keyCode === 27) {
            setEdit(p.text)
            setClicado(false)
        }
        if (e.keyCode === 13) {
            setDesabilitado(true)
            const requisicao = axios.put(`${process.env.REACT_APP_API_URL}/publish`, { post_id: p.post_id, description: edit }, { headers: { 'Authorization': `Bearer ${token}` } });
            requisicao.then((res) => { setClicado(false); setDesabilitado(false); atualiza() });
            requisicao.catch((res) => { alert(res.response.data); setDesabilitado(false); });
        }
    }

    function toggleModal(e) {
        setIsOpen(!modalIsOpen)
    }
    function deletePublish() {
        setLoading(true)
        const requisicao = axios.delete(`${process.env.REACT_APP_API_URL}/publish/${p.post_id}`, { headers: { 'Authorization': `Bearer ${token}` } });
        requisicao.then((res) => { setLoading(false); setIsOpen(!modalIsOpen); atualiza() });
        requisicao.catch((res) => { alert(res.response.data); setIsOpen(!modalIsOpen); });
    }
    return (
        <PostContainer clicado={clicado} data-test="post">
            <AvatarLikeContainer>
                <ImageAvatar src={p.picture_url} alt={"avatar"} />
                {liked.length === 0 ? <AiOutlineHeart onClick={() => postlike(p)} data-test="like-btn" /> : <AiFillHeartStyled onClick={() => removelike(p)} data-test="like-btn" />}
                <p data-tooltip-id="my-tooltip" data-tooltip-html={likes.length === 0 ? `<span data-test="tooltip"> Ninguém curtiu </span>` : names()} data-test="counter">{likes.length} likes</p>
                <ReactTooltipStyled id="my-tooltip" data-test="tooltip" isOpen={true} />
            </AvatarLikeContainer>
            <div>
                <PostHeaderContainer myPost={p.username === name}>
                    <h4 data-test="username" onClick={e => { e.preventDefault(); navigate(`/user/${p.user_id}`) }}>{p.username}</h4>
                    <div>
                        <TiPencilStyled onClick={() => { setDesabilitado(false); setClicado(!clicado); setEdit(p.text) }} data-test="edit-btn" />
                        <AiFillDelete onClick={() => setIsOpen(!modalIsOpen)} data-test="delete-btn" />
                    </div>
                </PostHeaderContainer>
                <h5 data-test="description">
                    <ReactTagify
                        colors={"#ffffff"}
                        tagClicked={(tag) => { navigate(`/hashtag/${tag.replace("#", '')}`) }}
                    >
                        {p.text}
                    </ReactTagify>
                </h5>
                <Description disabled={desabilitado} ref={nameRef} clicado={clicado} type="text" value={edit} onChange={e => setEdit(e.target.value)} onKeyDown={onKeyPressed} data-test="edit-input" />
                <LinkContainer href={p.url} target="_blank" data-test="link" >
                    <div>
                        <h1>{p.title}</h1>
                        <h2>{p.description}</h2>
                        <h3>{p.url}</h3>
                    </div>
                    <ImageLink src={p.image} />
                </LinkContainer>
            </div>
            <StyledModal
                isOpen={modalIsOpen}
                onBackgroundClick={toggleModal}
                onEscapeKeydown={toggleModal}>
                <Loading loading={loading}>Loading...</Loading>
                <ModalContainer loading={loading}>
                    <TitleModal>Are you sure you want<br />to delete this post?</TitleModal>
                    <div>
                        <ButtonCancel onClick={toggleModal} data-test="cancel">No, go back</ButtonCancel>
                        <ButtonConfirm onClick={deletePublish} data-test="confirm">Yes, delete it</ButtonConfirm>
                    </div>
                </ModalContainer>

            </StyledModal>
        </PostContainer>
    )
}
const Loading = styled.div`
    display: ${props => props.loading ? "flex" : "none"};
    align-items: center;
    justify-content: center;
    width: 100%;
    color: #FFFFFF;
    font-size: 30px;
    text-align: center;
`;
const ModalContainer = styled.div`
    display: ${props => !props.loading ? "flex" : "none"};
    flex-direction: column;
    align-items: center;
`;
const ReactTooltipStyled = styled(Tooltip)`
    padding: 5px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 3px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    line-height: 13px;
    color: #505050;
`;

const AiFillHeartStyled = styled(AiFillHeart)`
    color: #AC0000;
`;
const AvatarLikeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 30px;
    margin-right: 18px;
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
const TiPencilStyled = styled(TiPencil)`
    margin-right: 10px;
`;
const PostHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div{
        display: ${props => props.myPost ? "flex" : "none"};
    }
`;

const PostContainer = styled.div`
    background-color: #171717;
    border-radius: 16px;
    margin-bottom: 16px;
    color: #FFFFFF;
    display: flex;
    padding: 19px;
    h4{
        display: flex;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        margin-bottom: 7px;
        flex-wrap: wrap;
        cursor: pointer;
        @media (max-width: 375px) {
            font-size: 17px;
            line-height: 20px;
        }
    }
    h5{
        display: ${props => !props.clicado ? "flex" : "none"};
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
        flex-wrap: wrap;
        margin-bottom: 20px;
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

const Description = styled.input`
    display: ${props => props.clicado ? "flex" : "none"};
    width: 490px;
    background: #FFFFFF;
    border-radius: 7px;
    border: none;
    padding: 10px 0px 10px 10px;
    margin: 15px 0px;
`;

const LinkContainer = styled.a`
    width: 503px;
    min-height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display: flex;
    justify-content: space-between;
    text-decoration: none;
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
    height: 100fr;
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
    margin-bottom: 18px;
    @media (max-width: 375px) {
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
`

const TitleModal = styled.span`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #FFFFFF;
    margin-bottom: 40px;
`;

const ButtonCancel = styled.button`
    width: 134px;
    height: 37px;
    background-color: #FFFFFF;
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #1877F2;
    margin-right: 15px;
    border: none;
`;

const ButtonConfirm = styled.button`
    width: 134px;
    height: 37px;
    background-color: #1877F2;
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
    border: none;
    margin-left: 15px;
`;
