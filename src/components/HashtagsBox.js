import { Link } from "react-router-dom";
import styled from "styled-components";

export default function HashtagBox({ hashtags }) {
  return (
    <StyledBox data-test="trending">
      <h2>trending</h2>
      {hashtags.map((name) => (
        <Link key={name} data-test="hashtag" to={`/hashtag/${name}`}>
          #{name}
        </Link>
      ))}
    </StyledBox>
  );
}

const StyledBox = styled.div`
  h2 {
    font-size: 27px;
    font-weight: bold;
    padding: 16px;
    border-bottom: 1px solid #484848;
    font-family: "Oswald", sans-serif;
  }
  a {
    font-size: 19px;
    font-weight: bold;
    margin-top: 12px;
    margin-left: 15px;
    display: block;
    color: #ffffff;
    font-family: "Lato", sans-serif;
  }
  & p:nth-of-type(1) {
    margin-top: 20px;
  }

  width: 301px;
  height: 406px;
  border-radius: 16px;
  background-color: #171717;
  color: #ffffff;
  a {
    text-decoration: none;
  }
`;
