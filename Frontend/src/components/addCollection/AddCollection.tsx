import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContextTypes";
import { createCollection } from "../../functions/apiCalls";
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  FormGroup,
  ModalTitle,
  ButtonBox,
  Form,
  Input,
  Button,
} from "./addCollection-styles";

interface AddCollectionProps {
  onClose: () => void;
  refreshData: () => void;
}

const AddCollection = (props: AddCollectionProps) => {
  const [collectionName, setCollectionName] = useState("");
  const { authTokens } = useContext(AuthContext);
  const { onClose, refreshData } = props;

  const addCollection = async () => {
    createCollection(collectionName, authTokens).then((res) => {
      if (res?.status === 201) {
        refreshData();
      } else {
        alert("Failed to create collection");
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCollection();
    onClose();
  };

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Add Collection</ModalTitle>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              id="collectionName"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              placeholder="Enter collection name"
              required
            />
          </FormGroup>
          <ButtonBox>
            <Button type="submit">Save</Button>
            <Button onClick={onClose} type="button">
              Cancel
            </Button>
          </ButtonBox>
        </Form>
      </ModalContainer>
    </Overlay>
  );
};

export default AddCollection;
