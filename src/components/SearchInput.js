import styled from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import AppContext from "../AppContext/Context";
import { useNavigate } from "react-router-dom";

export default function SearchInput({ avatar }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AppContext);
  const searchContainerRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setUsers([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [token, username]);

  useEffect(() => {
    if (clicked && selectedUser !== null) {
      setUsername("");
      navigate(`/user/${selectedUser}`);
      setClicked(false);
      setSelectedUser(null);
      setUsername("");
    }
  }, [clicked, selectedUser, navigate]);

  return (
    <Container>
      <InputContainer>
        <Input
          type="text"
          placeholder="Search for people"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          data-test="search"
          required
        />
        <SearchIcon>
          {" "}
          <ion-icon name="search-outline"></ion-icon>
        </SearchIcon>
      </InputContainer>
      {users.length > 0 && (
        <SearchContainer
          id="search-container"
        >
          {users.map((user) => (
            <UserContainer data-test="user-search" href={`/user/${user.id}`}>
              <img src={user.picture_url} />
              <h1>
                {user.username}
              </h1>
            </UserContainer>
          ))}
        </SearchContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 95%;
  min-height: 45px;
  align-items: center;
  background: #ffffff;
  border-radius: 5px;
  display:flex;
  flex-direction:column;
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
  width: 38%;
  max-height: 310px;
  align-items: center;
  background: #ffffff;
  border-radius: 5px;
  overflow-y: scroll;
  position:fixed;
  top:45px;
  h1 {
    cursor: pointer;
  }
  @media (max-width: 650px) {
    top:130px;
    width:86%;
}
`;

const UserContainer = styled.a`
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
  text-decoration: none;
  
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
