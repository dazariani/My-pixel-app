import { useState } from "react";
import { CollsType } from "../../types";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContextTypes";
import { useContext } from "react";
import { deleteCollection } from "../../functions/apiCalls";
import {
  CollectionCard,
  ImageGrid,
  CollectionInfo,
  CollectionName,
  PhotoCount,
  NoImage,
  DeleteBtn,
} from "./collectionItem-styles";

type Props = {
  coll: CollsType[0];
  refreshCollData: () => void;
};

const CollectionItem = ({ coll, refreshCollData }: Props) => {
  const [imgLoading, setImgLoading] = useState(true);

  const { user, authTokens } = useContext(AuthContext);

  const handleDelete = async () => {
    deleteCollection(coll.id, authTokens).then((res) => {
      if (res?.status === 204) {
        alert("Collection deleted");
        refreshCollData();
      }
    });
  };

  return (
    <CollectionCard>
      {coll.photos.length > 0 ? (
        <ImageGrid $length={coll.photos.length}>
          {user?.user_id.toString() === coll.author.toString() && (
            <DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>
          )}
          {coll.photos.slice(0, 3).map((image, index) => (
            <div
              style={{
                gridRow: index == 0 ? "1 / 3" : "auto",
                flex: coll.photos.length === 1 ? 1 : "auto",
              }}
              key={index}
            >
              <div
                style={{
                  display: imgLoading ? "block" : "none",
                  height: "200px",
                }}
              >
                Loading images
              </div>
              <img
                onLoad={() => setImgLoading(false)}
                src={image.link_large}
                alt="collection thumbnail"
              />
            </div>
          ))}
        </ImageGrid>
      ) : (
        <ImageGrid>
          {user?.user_id.toString() === coll.author.toString() && (
            <DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>
          )}
          <NoImage>No images in collection</NoImage>
        </ImageGrid>
      )}
      <CollectionInfo>
        <CollectionName>{coll.title}</CollectionName>
        <PhotoCount>{coll.photos.length} photos</PhotoCount>
        <Link
          state={{
            images: coll.photos,
            name: coll.title,
          }}
          to={`/collections/${coll.id}`}
        >
          Go to collection
        </Link>
      </CollectionInfo>
    </CollectionCard>
  );
};

export default CollectionItem;
