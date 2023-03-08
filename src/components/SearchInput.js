import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../AppContext/Context";

export default function SearchInput({ avatar }) {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AppContext);

  useEffect(() => {
    if (username.length >= 3) {
      const usernameToSearch = username;
      console.log(usernameToSearch);
      const requisicao = axios.get(
        `${process.env.REACT_APP_API_URL}/user/piecename/${usernameToSearch}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      requisicao.then((res) => setUsers(res.data));
      requisicao.catch((res) => setUsers([]));
    } else {
      setUsers([]);
    }
  }, [token, username]);

  return (
    <Container>
      <InputContainer>
        <Input
          type="text"
          placeholder="Search for people"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          data-test="registry-name-input"
          required
        />
        <SearchIcon>
          {" "}
          <ion-icon name="search-outline"></ion-icon>
        </SearchIcon>
      </InputContainer>
      {users.length > 0 && (
        <SearchContainer>
          {users.map((user) => (
            <UserContainer>
              <img src={user.picture_url} />
              <h1>{user.username}</h1>
            </UserContainer>
          ))}
        </SearchContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 35%;
  min-height: 45px;
  align-items: center;
  background: #ffffff;
  border-radius: 5px;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 5px;
`;

const SearchContainer = styled.div`
  width: 35%;
  max-height: 310px;
  position: fixed;
  top: 50px;
  align-items: center;
  background: #ffffff;
  border-radius: 5px;
  overflow-y: scroll;
`;

const UserContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 5px;
  color: black;
  box-sizing: border-box;
  padding: 2%;
  margin-top: 10px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #707070;
  img {
    border-radius: 50%;
    object-fit: cover;
    width: 60px;
    height: 60px;
    margin-right: 15px;
  }
`;

const SearchIcon = styled.span`
  width: 10%;
  ion-icon {
    font-size: 1.5em;
    color: gray;
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
