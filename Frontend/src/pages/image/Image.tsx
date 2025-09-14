import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { Photo, CollsType, PhotosType } from "../../types";
import { useLocation } from "react-router-dom";
import AddToCollection from "../../components/addToCollection/AddToCollection";
import { AuthContext } from "../../context/authContextTypes";
import {
  editCollection,
  getCollections,
  getPhotoById,
} from "../../functions/apiCalls";
import {
  ActionButton,
  ActionButtons,
  CollectionInfo,
  CollectionItem,
  CollectionList,
  CollectionsSection,
  CollectionThumbnail,
  ContentWrapper,
  DetailsColumn,
  ErrorMessage,
  ImageColumn,
  PageContainer,
  RemoveButton,
} from "./image-styles";

const Image = () => {
  const location = useLocation();
  const stateImg: Photo[0] = location.state?.image;
  const stateImgLocal: PhotosType[0] = location.state?.imageLocal;

  const { authTokens, user } = useContext(AuthContext);

  const { id } = useParams();
  const [image, setImage] = useState<Photo[0]>(stateImg);
  const [imageLocal, setImageLocal] = useState<PhotosType[0]>(stateImgLocal);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collData, setCollData] = useState<CollsType | []>([]);
  const [addOn, setAddOn] = useState(false);

  const fetchData = useFetchData();

  const filterPhotos = (collection: CollsType[0]) => {
    const filtered = collection.photos
      .filter((photo) =>
        stateImg
          ? photo.img_id.toString() !== id?.slice(1)
          : stateImgLocal
          ? photo.id.toString() !== id?.slice(1)
          : id?.startsWith("l")
          ? photo.id.toString() !== id?.slice(1)
          : id?.startsWith("g")
          ? photo.img_id.toString() !== id?.slice(1)
          : false
      )
      .map((photo) => photo.id);
    return filtered;
  };

  const removePhotoFromCollection = async (collection: CollsType[0]) => {
    if (user?.user_id == collection.author) {
      const filtered = filterPhotos(collection);
      editCollection(collection.id, filtered, authTokens).then((res) => {
        if (res?.status === 200) {
          alert("Photo removed from collection");
          getCollsData();
        } else {
          alert("Something went wrong during photo removal");
        }
      });
    }
  };

  const getCollsData = async () => {
    getCollections().then((res) => {
      if (res?.status === 200) {
        const filteredColls = res.data.filter((coll: CollsType[0]) => {
          return coll.photos.some((photo: PhotosType[0]) =>
            stateImg
              ? photo.img_id.toString() === id?.slice(1)
              : stateImgLocal
              ? photo.id.toString() === id?.slice(1)
              : id?.startsWith("l")
              ? photo.id.toString() === id?.slice(1)
              : id?.startsWith("g")
              ? photo.img_id.toString() === id?.slice(1)
              : false
          );
        });
        setCollData(filteredColls);
      }
    });
  };

  const getLocalImage = async () => {
    getPhotoById(id?.slice(1) as string).then((res) => {
      if (res?.status === 200) {
        setImageLocal(res.data);
      }
    });
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download image.");
    }
  };

  useEffect(() => {
    if (!stateImgLocal) {
      if (stateImg) {
        setImage(stateImg);
        setLoading(false);
      } else if (id && id.startsWith("g")) {
        fetchData(`https://api.pexels.com/v1/photos/${id.slice(1)}}`)
          .then((response) => {
            if (response) {
              console.log(response);
              setImage(response);
            }
          })
          .catch((err) => {
            setError(err.message);
            console.error("Error fetching image:", err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      setLoading(false);
    }
    if (!stateImg && !stateImgLocal && id && id.startsWith("l")) {
      getLocalImage();
      setLoading(false);
    }

    getCollsData();
  }, [id]);

  if (loading) {
    return <p>Loading image...</p>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <ImageColumn>
          <img
            src={image ? image.src.original : imageLocal?.link_original}
            alt={image ? image.alt : imageLocal?.alt}
          />
        </ImageColumn>
        <DetailsColumn>
          <ActionButtons>
            <ActionButton onClick={() => setAddOn(true)}>
              + Add to Collection
            </ActionButton>
            <ActionButton
              onClick={() =>
                handleDownload(
                  image ? image.src.original : imageLocal?.link_original,
                  image ? image.alt : imageLocal?.alt
                )
              }
            >
              Download
            </ActionButton>
          </ActionButtons>
          <CollectionsSection>
            <h3>Collections</h3>
            <CollectionList>
              {collData.map((collection) => (
                <CollectionItem key={collection.id}>
                  <CollectionThumbnail src={collection.photos[0].link_small} />
                  <CollectionInfo>
                    <p>{collection.title}</p>
                    <span>{collection.photos.length} photos</span>
                  </CollectionInfo>
                  <RemoveButton
                    $isAuthor={user?.user_id == collection.author}
                    onClick={() => removePhotoFromCollection(collection)}
                  >
                    Remove
                  </RemoveButton>
                </CollectionItem>
              ))}
            </CollectionList>
          </CollectionsSection>
        </DetailsColumn>
      </ContentWrapper>
      {addOn && (
        <AddToCollection
          setAddOn={setAddOn}
          refreshColls={getCollsData}
          id={image ? image.id : Number(imageLocal.img_id)}
          image={image ? image : imageLocal}
        />
      )}
    </PageContainer>
  );
};

export default Image;
