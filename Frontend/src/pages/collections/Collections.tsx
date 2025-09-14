import CollectionItem from "../../components/collectionItem/CollectionItem";
import AddCollection from "../../components/addCollection/AddCollection";
import { useState, useEffect, useContext } from "react";
import { CollsType } from "../../types";
import { AuthContext } from "../../context/authContextTypes";
import { getCollections } from "../../functions/apiCalls";
import {
  CollectionsContainer,
  Title,
  Subtitle,
  CollectionsGrid,
  AddCard,
  AddIcon,
  AddText,
  NoteMsg,
} from "./collections-styles";

const Collections = () => {
  const [isAddCollectionOpen, setIsAddCollectionOpen] = useState(false);
  const [data, setData] = useState<CollsType | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const { user } = useContext(AuthContext);

  const handleAddClose = () => {
    setIsAddCollectionOpen(false);
  };

  const refreshCollData = () => {
    getCollections().then((res) => {
      if (res?.status === 200) {
        setData(res?.data);
        setLoading(false);
      } else {
        setError("Failed to fetch collections");
      }
    });
  };

  useEffect(() => {
    refreshCollData();
  }, []);

  if (loading) {
    return <NoteMsg style={{ textAlign: "center" }}>Loading data...</NoteMsg>;
  }

  if (error) {
    return <NoteMsg style={{ color: "red" }}>{error}</NoteMsg>;
  }

  return (
    <CollectionsContainer>
      {isAddCollectionOpen && (
        <AddCollection onClose={handleAddClose} refreshData={refreshCollData} />
      )}
      <Title>Collections</Title>
      <Subtitle>
        Explore the world through collections of beautiful photos free to use
      </Subtitle>
      <CollectionsGrid>
        {data.map((coll, index) => (
          <CollectionItem
            key={index}
            coll={coll}
            refreshCollData={refreshCollData}
          />
        ))}

        {user && (
          <AddCard onClick={() => setIsAddCollectionOpen(true)}>
            <AddIcon>+</AddIcon>
            <AddText>Add New Collection</AddText>
          </AddCard>
        )}
        {!user && data.length === 0 && (
          <NoteMsg>No collections. Please log in to create new ones.</NoteMsg>
        )}
      </CollectionsGrid>
    </CollectionsContainer>
  );
};

export default Collections;
