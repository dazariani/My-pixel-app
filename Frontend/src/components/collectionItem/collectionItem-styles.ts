import styled from "styled-components";


export const CollectionCard = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageGrid = styled.div<{ $length?: number }>`
  position: relative;
  display: ${(props) => (props.$length && props.$length > 2 ? "grid" : "flex")};
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.5rem;
  height: 300px;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${(props) => props.theme.light_grey};
  flex-direction: row;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  img:nth-child(1) {
    grid-row: 1 / 3;
  }
`;

export const CollectionInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.black};
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const CollectionName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const PhotoCount = styled.span`
  font-size: 1rem;
  color: #888;
`;

export const NoImage = styled.span`
  font-size: 1rem;
  font-weight: 400;
  padding-top: 1rem;
  padding-left: 1rem;
`;

export const DeleteBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 4rem;
  height: 2rem;
  border-radius: 8%;
  border: none;
  background-color: #8a3282;
  color: ${(props) => props.theme.white};
  cursor: pointer;
  z-index: 10;

  &:hover {
    transform: scale(1.1);
    transition: 0.2s ease-in-out;
  }
`;