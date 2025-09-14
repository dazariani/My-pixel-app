import styled from "styled-components";


const SearchResultsContainer = styled.div`
  padding: 3rem;
  max-width: 1500px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #f2c593, #8a3282);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ResultItem = styled.div<{ $index: number }>`
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  max-height: 100%;
  grid-row-end: ${(props) => (props.$index % 2 === 0 ? "span 2" : "span 1")};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    padding: 1rem;
    font-size: 1rem;
    color: #555;
    margin: 0;
  }
`;

export { SearchResultsContainer, Title, ResultsGrid, ResultItem };