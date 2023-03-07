import styled from "styled-components";

export default function Feed ({posts}) {
    return (
        <FeedContainer>
            {(posts.length === 0) ? <h3>There are no posts yet</h3> : posts.map(p => {
                return(
                    <Post key={p.id}>
                        <img src={p.picture_url} alt={"avatar"}/>
                        <div>
                            <h4>{p.username}</h4>
                            <h5>{p.text}</h5>
                            <h6 onClick={()=> window.open(p.url)}>Link</h6>
                        </div>
                    </Post>
                )
            })}
        </FeedContainer>
        
    )
}

const FeedContainer = styled.div`
    width: 100%;
    margin-top: 29px;
    h3{
        color: #FFFFFF;
        font-size: 30px;
        text-align: center;
        margin-top: 60px;
    }
    @media (max-width: 375px) {
        
    }
`;

const Post = styled.div`
    min-height: 276px;
    background-color: #171717;
    border-radius: 16px;
    margin-bottom: 16px;
    color: #FFFFFF;
    display: flex;
    img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
        margin: 17px 18px;
    }
    div{
        margin-right: 22px;
        margin-top: 19px;
        margin-bottom: 19px;
        h4{
            display: flex;
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 19px;
            line-height: 23px;
            margin-bottom: 7px;
            flex-wrap: wrap;
        }
        h5{
            display: flex;
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 17px;
            line-height: 20px;
            color: #B7B7B7;
            flex-wrap: wrap;
            margin-bottom: 7px;
        }
    }
    
`;