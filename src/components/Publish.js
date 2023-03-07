import styled from "styled-components";
import { useContext, useState } from "react"
import AppContext from "../AppContext/Context";
import axios from "axios";

export default function Publish ({avatar, atualiza}) {
    const [clicado, setClicado] = useState(false);
    const [publish, setPublish] = useState({ link: "", description: "" });
    const { token } = useContext(AppContext);
    
    function salvar(event) {
        event.preventDefault();
        setClicado(true);
        const requisicao = axios.post(`${process.env.REACT_APP_API_URL}/publish`, publish, { headers: { 'Authorization': `Bearer ${token}` } });
        requisicao.then(() => {setPublish({ link: "", description: "" });setClicado(false);atualiza();});
        requisicao.catch((res) => { alert("There was an error publishing your link"); setClicado(false); });
    }
    return (
        <PublishContainer>
            <img src={avatar} alt="avatar"/>
            <Formulario onSubmit={salvar} clicado={clicado}>
                <h2>What are you going to share today?</h2>
                <Link disabled={clicado} required type="url" placeholder="http://..." value={publish.link} onChange={e => setPublish({ ...publish, link: e.target.value })}/>
                <Description disabled={clicado} type="text" placeholder="Awesome article about #javascript" value={publish.description} onChange={e => setPublish({ ...publish, description: e.target.value })}/>
                <button disabled={clicado} type="submit">{ clicado ? "Publishing...": "Publish"}</button>
            </Formulario>
        </PublishContainer>
        
    )
}

const PublishContainer = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    width: 100%;
    height: 209px;
    display: flex;
    img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
        margin: 16px 18px;
        @media (max-width: 375px) {
            display: none;
        }
    }
    @media (max-width: 375px) {
        height: 164px;
        border-radius: 0px;
    }
`;

const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 22px;
    @media (max-width: 375px) {
        margin: 0px 15px;
    }
    h2{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
        margin-top: 21px;
        margin-bottom: 5px;
        @media (max-width: 375px) {
            font-size: 17px;
            line-height: 20px;
            text-align: center;
            margin-top: 10px;
        }
    }
    input{
        margin-top: 5px;
        background-color: #EFEFEF;
        border-radius: 5px;
        border: none;
        padding-left: 13px;
    }
    button{
        width: 112px;
        height: 31px;
        background-color: #1877F2;
        border-radius: 5px;
        border: none;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
        margin-top: 5px;
        align-self: flex-end;
        opacity: ${props => props.clicado ? "0.7" : "1"};
        @media (max-width: 375px) {
            height: 22px;
            margin-top: 6px;
            font-size: 13px;
            line-height: 16px;
        }
    }
`;

const Description = styled.input`
    height: 66px;
    @media (max-width: 375px) {
        height: 47px;
    }
`;

const Link = styled.input`
    height: 30px;
`;