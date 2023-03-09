import styled from "styled-components";
import Post from './Post.js'

export default function Feed({ posts, name, atualiza }) {
    return (
        <FeedContainer>
            {(posts.length === 0) ? <Mensage data-test="message">There are no posts yet</Mensage> : posts.map(p => <Post key={p.post_id} p={p} name={name} atualiza={atualiza}/>)}
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