import Search from "../../components/search/Search";
import { useSearchParams } from "react-router-dom";
import SearchResult from "../searchResult/SearchResult";
import { BackgroundImage, HomeContainer, SearchResultBox } from "./home-styles";

const Home = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  return (
    <>
      {search ? (
        <SearchResultBox>
          <Search />
          <SearchResult />
        </SearchResultBox>
      ) : (
        <>
          <BackgroundImage />
          <HomeContainer>
            <Search />
          </HomeContainer>
        </>
      )}
    </>
  );
};

export default Home;
