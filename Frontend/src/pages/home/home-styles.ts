import styled from "styled-components";
import heroLeft from "../../assets/hero-left.png";
import heroRight from "../../assets/hero-right.png";


const BackgroundImage = styled.div`
  background-image: url(${heroLeft}), url(${heroRight});
  background-position: -2% 70%, 102% 70%;
  background-repeat: no-repeat;
  background-size: 25rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 11rem;
`;

const SearchResultBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export { BackgroundImage, HomeContainer, SearchResultBox };