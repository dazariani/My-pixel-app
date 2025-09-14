import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../functions/apiCalls";
import {
  SignupContainer,
  SignupForm,
  Title,
  Input,
  Button,
  ErrorMessage,
  ErrorMsg,
} from "./signup-styles";

type Inputs = {
  username: string;
  password1: string;
  password2: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const password = watch("password1");
  const errprText = "This field is required";

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setError(null);
    registerUser(data.username, data.password1).then((res) => {
      if (res && res.status === 201) {
        navigate("/login");
      } else {
        setError("An error occurred. Please try again.");
      }
    });
  };

  return (
    <SignupContainer>
      <SignupForm onSubmit={handleSubmit(onSubmit)}>
        <Title>Sign Up</Title>
        <Input
          placeholder="username"
          {...register("username", { required: true })}
        />
        {errors.username && <ErrorMsg>{errprText}</ErrorMsg>}
        <Input
          type="password"
          placeholder="password"
          {...register("password1", { required: true })}
        />
        {errors.password1 && <ErrorMsg>{errprText}</ErrorMsg>}
        <Input
          type="password"
          placeholder="repeat password"
          {...register("password2", {
            required: true,
            validate: (value) =>
              value === password || "The passwords do not match",
          })}
        />
        {errors.password2 && <ErrorMsg>{errors.password2.message}</ErrorMsg>}
        <Button type="submit">Sign Up</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </SignupForm>
    </SignupContainer>
  );
}
