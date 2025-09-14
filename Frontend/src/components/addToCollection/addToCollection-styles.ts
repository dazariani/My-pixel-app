import styled from "styled-components";


export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  gap: 1.5rem;
  height: 40vh;
  overflow-y: scroll;
`;

export const CollectionItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-inline: 0.75rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const CollectionThumbnail = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  object-fit: cover;
`;

export const CollectionInfo = styled.div`
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