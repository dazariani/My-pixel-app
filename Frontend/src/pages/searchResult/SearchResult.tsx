import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Photo } from "../../types";
import useFetchData from "../../hooks/useFetchData";
import { Link } from "react-router-dom";
import {
  SearchResultsContainer,
  Title,
  ResultsGrid,
  ResultItem,
  ErrorMessage,
} from "./searchResult-styles";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [searchResults, setSearchResults] = useState<Photo | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(true);

  const fetchData = useFetchData();

  useEffect(() => {
    if (searchQuery) {
      fetchData(`/pexels-api/v1/search?query=${searchQuery}`)
        .then((response) => {
          if (response) {
            setSearchResults(response.photos);
          }
        })
        .catch((err) => {
          setError(err.message);
          console.error("Error fetching search results:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <SearchResultsContainer>
      <Title>Search Results for "{searchQuery || "..."}"</Title>
      {loading && <p>Loading results...</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!loading && searchResults.length === 0 && !error && (
        <p>No results found for "{searchQuery}".</p>
      )}
      <ResultsGrid>
        {searchResults.map((photo, ind) => (
          <ResultItem $index={ind} key={photo.id}>
            <div
              style={{
                display: imgLoading ? "block" : "none",
                height: "200px",
              }}
            >
              Loading image
            </div>
            <Link to={`/g${photo.id}`} state={{ image: photo }}>
              <img
                key={photo.id}
                style={{ display: imgLoading ? "none" : "block" }}
                onLoad={() => setImgLoading(false)}
                src={photo.src.large}
                alt={photo.alt}
              />
            </Link>
          </ResultItem>
        ))}
      </ResultsGrid>
    </SearchResultsContainer>
  );
};

export default SearchResult;
