import { useForm, type SubmitHandler } from "react-hook-form";
import { useSearchParams } from "react-router";
import { Title, Description, Form, Input } from "./search-styles";
import searchIcon from "../../assets/Search.svg";

type Inputs = {
  keyword: string;
};

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setSearchParams({ search: data.keyword });
  };

  return (
    <>
      {!search && (
        <>
          <Title>Search</Title>
          <Description>
            Search high-resolution images and add to collections
          </Description>
        </>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          $icon={searchIcon}
          defaultValue={search ? search : ""}
          type="text"
          placeholder="Enter your keywords..."
          {...register("keyword", { required: true })}
        />

        {errors.keyword && <span>This field is required</span>}
      </Form>
    </>
  );
};

export default Search;
