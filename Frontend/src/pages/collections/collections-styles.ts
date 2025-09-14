import styled from "styled-components";

const CollectionsContainer = styled.div`
  padding: 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #f2c593, #8a3282);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  max-width: 400px;
  color: #666;
  text-align: center;
  margin-bottom: 3rem;
  margin-inline: auto;
  font-weight: 500;
`;

const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const AddCard = styled.div`
  background: #f0f0f0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
  min-height: 300px;
  max-width: 320px;

  &:hover {
    background: #e0e0e0;
  }
`;

const AddIcon = styled.span`
  font-size: 4rem;
  color: #aaa;
  font-weight: 200;
`;

const AddText = styled.span`
  font-size: 1.25rem;
  color: #aaa;
  font-weight: 500;
  text-align: center;
`;

const NoteMsg = styled.div`
  text-align: center;
`;

export { CollectionsContainer, Title, Subtitle, CollectionsGrid, AddCard, AddIcon, AddText, NoteMsg };