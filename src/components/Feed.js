import styled from "styled-components";
import Post from './Post.js'





export default function Feed({ posts, name, atualiza, showFollows }) {
    

    console.log(showFollows)
    

    return (
        <FeedContainer>
            {(!showFollows)? <Mensage data-test="message">You don't follow anyone yet. Search for new friends!</Mensage> :(posts.length === 0) ? <Mensage data-test="message">No posts found from your friends</Mensage> : posts.map(p => <Post p={p} name={name} atualiza={atualiza}/>)} 
             
            
            
            
        </FeedContainer>

    )
}

const FeedContainer = styled.div`
    width: 100%;
    margin-top: 70px;
`;

const Mensage = styled.h3`
    color: #FFFFFF;
    font-size: 30px;
    text-align: center;
    margin-top: 60px;
`;

