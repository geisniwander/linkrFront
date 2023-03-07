import styled from "styled-components";

export default function PostComponent({ post }) {
  return (
    <PostContainer>
      <UsernameText>{post.username}</UsernameText>
      <PostText>{post.text}</PostText>
      <LikesText>{post.likes} likes</LikesText>
      <Avatar>
        <img src={post.user_picture} alt={`${post.username} avatar`}></img>
      </Avatar>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  border-radius: 16px;
  background-color: #171717;
  padding: 15px;
`;

const PostText = styled.div`
  color: #b7b7b7;
`;

const UsernameText = styled.div`
  color: #ffffff;
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    @media (max-width: 375px) {
      width: 44px;
      height: 44px;
    }
  }
`;

const LikesText = styled.div`
  color: #ffffff;
`;
