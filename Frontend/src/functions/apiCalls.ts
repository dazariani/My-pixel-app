import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Collection APIs
export const getCollections = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/collections/`);
    if (response.status === 200) {  
      return {status: response.status, data: response.data} 
    }
  } catch (err) {
    alert("Failed to fetch collections data");
  }
};

export const getCollectionById = async (id: string | undefined) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/collections/${id}`);
    if (response.status === 200) {
      return {status: response.status, data: response.data}
    }
  } catch (err) {
    alert(`Failed to fetch collection with ID: ${id}`);
  }
};

export const createCollection = async (title: string, authTokens: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/collections/`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      return { status: response.status, data: response.data };
    }
  } catch (err) {
    alert("Failed to create collection");
  }
};


export const editCollection = async (
  id: number,
  photos: number[],
  authTokens: any
) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/collections/${id}/`,
      { photos },
      {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return { status: response.status, data: response.data };
    }
  } catch (err) {
    alert("Failed to edit collection");
  }
};


export const deleteCollection = async (id: number, authTokens: any) => {
  try{
    const response = await axios.delete(`${BASE_URL}/api/collections/${id}/`, {
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 204) {  
      return {status: response.status} 
    }
  } catch (err) {
    alert("Failed to delete collection");
  }
}


// Photo APIs
// types
type PhotoLinks = {
    link_small: string;
    link_medium: string;
    link_large: string;
    link_original: string;
}


export const addPhoto = async (
  img_id: number,
  alt: string,
  PhotoLinks: PhotoLinks,
  authTokens: any
) => {
  try {
    const response = await axios.post(  
      `${BASE_URL}/api/photos/`,
      { img_id, alt, ...PhotoLinks },
      
        {
          headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201 || response.status === 200) {
      return { status: response.status, data: response.data };
    }
  } catch (err) {
    alert("Failed to add photo");
  }
};      


export const getPhotoById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/photos/${id}/`);
    if (response.status === 200) {
      return { status: response.status, data: response.data };
    } else {
      return { status: response.status, data: null };
    }
  } catch (err) {
    alert(`Failed to fetch photo with ID: ${id}`);
  }

}


// Token APIs
export const getTokens = async (username: string, password: string) => {

    const response = await axios.post(`${BASE_URL}/api/token/`, { username, password });
    if (response.status === 200) {
      return { status: response.status, data: response.data };
    }
}

export const getTokensRefresh = async (refresh: string | undefined) => {
    const response = await axios.post(`${BASE_URL}/api/token/refresh/`, { refresh });
    if (response.status === 200) {
      return { status: response.status, data: response.data };
    }
}

export const registerUser = async (username: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/api/register/`, { username, password });
  if (response.status === 201) {
    return { status: response.status, data: response.data };
  }
}