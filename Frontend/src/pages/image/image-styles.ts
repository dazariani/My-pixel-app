import styled from "styled-components";


const PageContainer = styled.div`
  background-color: #f8f8f8;
  padding: 2rem;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ImageColumn = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
  }
`;

const DetailsColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ActionButton = styled.button`
  background-color: #eee;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #ddd;
  }
`;

const CollectionsSection = styled.div`
  h3 {
    margin-bottom: 1rem;
  }
`;

const CollectionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RemoveButton = styled.button<{ $isAuthor: boolean | undefined }>`
  background: none;
  border: none;
  color: #999;
  cursor: ${(props) => (props.$isAuthor ? "pointer" : "not-allowed")};
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s;
`;

const CollectionItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;

    ${RemoveButton} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const CollectionThumbnail = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  object-fit: cover;
`;

const CollectionInfo = styled.div`
  flex-grow: 1;

  p {
    font-weight: bold;
    margin: 0;
  }

  span {
    color: #666;
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 1rem;
`;

export {
  PageContainer,
  ContentWrapper,
  ImageColumn,
  DetailsColumn,
  ActionButtons,
  ActionButton,
  CollectionsSection,
  CollectionList,
  RemoveButton,
  CollectionItem,
  CollectionThumbnail,
  CollectionInfo,
  ErrorMessage,
};
