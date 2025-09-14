import { useEffect, useState } from "react";
import { PhotosType } from "../../types";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getCollectionById } from "../../functions/apiCalls";
import {
  SearchResultsContainer,
  Title,
  ResultsGrid,
  ResultItem,
} from "./collection-styles";

interface CollectionData {
  images: PhotosType;
  name: string;
}

const Collection = () => {
  const location = useLocation();
  const data: CollectionData = location.state;

  const params = useParams();
  const id = params.id;

  const [imgData, setImgData] = useState<PhotosType>([]);
  const [title, setTitle] = useState<string>("");
  const [imgLoading, setImgLoading] = useState(true);

  const getCollectionData = async () => {
    getCollectionById(id).then((res) => {
      if (res?.status === 200) {
        setImgData(res?.data.photos);
        setTitle(res?.data.title);
      } else {
        alert("Failed to fetch collection data");
      }
    });
  };

  useEffect(() => {
    if (data && data.images) {
      setImgData(data.images);
      setTitle(data.name);
    } else {
      getCollectionData();
    }
  }, [data]);

  return (
    <SearchResultsContainer>
      <Title>{title}</Title>
      <span>{imgData.length} images</span>
      <ResultsGrid>
        {imgData.map((photo, ind) => (
          <ResultItem $index={ind} key={photo.id}>
            <div
              style={{
                display: imgLoading ? "block" : "none",
                height: "200px",
              }}
            >
              Loading image
            </div>
            <Link to={`/l${photo.id}`} state={{ imageLocal: photo }}>
              <img
                style={{ display: imgLoading ? "none" : "block" }}
                onLoad={() => setImgLoading(false)}
                src={photo.link_original}
                alt={photo.alt}
              />
            </Link>
          </ResultItem>
        ))}
      </ResultsGrid>
    </SearchResultsContainer>
  );
};

export default Collection;
