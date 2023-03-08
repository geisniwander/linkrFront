import styled from "styled-components";
import { useContext, useState } from "react";
import AppContext from "../AppContext/Context";

export default function SearchInput({ avatar }) {
  const [username, setUsername] = useState("");
  const { loading, setLoading } = useContext(AppContext);

  return (
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
  );
}

const InputContainer = styled.div`
  width: 35%;
  height: 45px;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 5px;
`;

const SearchIcon = styled.span`
  width: 10%;
  ion-icon {
    font-size:1.5em;
    color: gray;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 80%;
  margin: 2%;
  border:none;
  font-family: "Lato";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  color: #707070;

:focus{
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

