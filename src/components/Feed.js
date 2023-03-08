import styled from "styled-components";

export default function Feed ({posts}) {
    return (
        <FeedContainer>
            {(posts.length === 0) ? <Mensage>There are no posts yet</Mensage> : posts.map(p => {
                return(
                    <Post key={p.id}>
                        <ImageAvatar src={p.picture_url} alt={"avatar"}/>
                        <div>
                            <h4>{p.username}</h4>
                            <h5>{p.text}</h5>
                            <LinkContainer onClick={()=> window.open(p.url)}>
                                <div>
                                    <h1>{p.title}</h1>
                                    <h2>{p.description}</h2>
                                    <h3>{p.url}</h3>
                                </div>
                                <ImageLink src={p.image}/>
                            </LinkContainer>
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

    @media (max-width: 375px) {
        
    }
`;
const Mensage = styled.h3`
    color: #FFFFFF;
    font-size: 30px;
    text-align: center;
    margin-top: 60px;
`;
const Post = styled.div`
    min-height: 276px;
    background-color: #171717;
    border-radius: 16px;
    margin-bottom: 16px;
    color: #FFFFFF;
    display: flex;
    div{
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
            margin-right: 22px;
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
            margin-right: 22px;
        }
    }
`;

const LinkContainer = styled.div`
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display: flex;
    justify-content: space-between;
    div{
        margin: 19px;
    }
    h1{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400; 
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
        margin-bottom: 5px;
    }
    h2{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
        margin-bottom: 13px;
    }
    h3{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
    }
`;

const ImageLink = styled.img`
    margin: 0;
    min-width: 153.44px;
    width: 153.44px;
    height: 155px;
    border-radius: 0px 12px 13px 0px;
`;

const ImageAvatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin: 17px 18px;
`;