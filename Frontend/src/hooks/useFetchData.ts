import axios from "axios";

const API_KEY = import.meta.env.VITE_IMAGE_API_KEY;

const useFetchData = () => {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  const fetchData = async (url: string) => {
    try {
      if (!API_KEY) {
        throw new Error(
          "Pexels API Key is not defined. Please set VITE_IMAGE_API_KEY in your .env file."
        );
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `${API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // setError(`Error fetching data: ${err.message}`);
        console.error("Axios error:", err.response?.data || err.message);
      } else if (err instanceof Error) {
        // setError(`Error: ${err.message}`);
        console.error("General error:", err);
      } else {
        // setError("An unexpected error occurred.");
        console.error("Unexpected error:", err);
      }
    } 
  };
  return fetchData;
};

export default useFetchData;
