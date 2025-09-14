import { useState, useContext, useEffect } from "react";
import { CollsType, PhotosType, Photo } from "../../types";
import { useRef } from "react";
import noImg from "../../assets/No_Image.jpg";
import { AuthContext } from "../../context/authContextTypes";
import { jwtDecode } from "jwt-decode";
import { User } from "../../context/authContextTypes";
import {
  addPhoto,
  editCollection,
  getCollections,
} from "../../functions/apiCalls";
import {
  Overlay,
  ModalContainer,
  CollectionItem,
  CollectionThumbnail,
  CollectionInfo,
} from "./addToCollection-styles";

interface Props {
  id: number;
  image: Photo[0] | PhotosType[0];
  setAddOn: (value: boolean) => void;
  refreshColls: () => void;
}

const AddToCollection = ({ id, image, setAddOn, refreshColls }: Props) => {
  const [collections, setCollections] = useState<CollsType | []>([]);
  const [loading, setLoading] = useState(true);
  const divRef = useRef<HTMLDivElement | null>(null);
  const { authTokens, user } = useContext(AuthContext);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (divRef.current !== null && !divRef.current.contains(e.target as Node)) {
      setAddOn(false);
    }
  };

  const addNewPhoto = async () => {
    const photoLinks =
      "src" in image
        ? {
            link_small: image.src.small,
            link_medium: image.src.medium,
            link_large: image.src.large,
            link_original: image.src.original,
          }
        : {
            link_small: image.link_small,
            link_medium: image.link_medium,
            link_large: image.link_large,
            link_original: image.link_original,
          };
    return addPhoto(id, image.alt, photoLinks, authTokens).then((res) => {
      if (res?.status === 201 || res?.status === 200) {
        return res.data.id;
      } else {
        alert("Failed to add photo");
      }
    });
  };

  const handleCollectionClick = async (collId: number) => {
    const currentColl = collections.find((coll) => coll.id === collId);
    const currentPhotos = currentColl?.photos.map((photo) => photo.id);
    const photoId = await addNewPhoto();
    if (photoId) {
      currentPhotos?.push(photoId);
    }

    if (currentPhotos) {
      editCollection(collId, currentPhotos, authTokens).then((res) => {
        if (res?.status === 200) {
          setAddOn(false);
          alert("Photo added to collection");
          refreshColls();
        } else {
          alert("Something went wrong");
        }
      });
    }
  };

  const getCollsData = async () => {
    getCollections().then((response) => {
      if (response?.status === 200) {
        const filteredColls = response?.data.filter((coll: CollsType[0]) => {
          if (authTokens) {
            const user: User = jwtDecode(authTokens.access);
            if (coll.author.toString() === user.user_id.toString())
              return coll.photos.every(
                (photo: PhotosType[0]) =>
                  photo.id.toString() !== id.toString() &&
                  photo.img_id.toString() !== id.toString()
              );
          }
        });
        setCollections(filteredColls);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getCollsData();
  }, []);

  let Msg;
  if (collections.length == 0 && user) {
    Msg = <div style={{ alignSelf: "center" }}>Create a collection first.</div>;
  } else if (!user) {
    Msg = <div style={{ alignSelf: "center" }}>You need to log in first.</div>;
  }

  return (
    !loading && (
      <Overlay onClick={(e) => handleOutsideClick(e)}>
        <ModalContainer ref={divRef}>
          {Msg}
          {collections.map((collection) => (
            <CollectionItem
              key={collection.id}
              onClick={() => handleCollectionClick(collection.id)}
            >
              <CollectionThumbnail
                src={
                  collection.photos.length > 0
                    ? collection.photos[0].link_small
                    : noImg
                }
              />

              <CollectionInfo>
                <p>{collection.title}</p>
                <span>{collection.photos.length} photos</span>
              </CollectionInfo>
            </CollectionItem>
          ))}
        </ModalContainer>
      </Overlay>
    )
  );
};

export default AddToCollection;
