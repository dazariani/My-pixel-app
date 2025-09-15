import styled from "styled-components";

const Title = styled.h1`
  font-size: 2.25rem;
  margin-bottom: 0.75rem;
  letter-spacing: -0.025em;
`;

const Description = styled.p`
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  font-weight: 300;
  text-align: center;
  letter-spacing: -0.025em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;

  & > span {
    color: red;
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }
`;

const Input = styled.input<{ icon: string }>`
  width: 45vw;
  border: 1px solid ${(props) => props.theme.light_grey};
  border-radius: 0.25rem;
  color: ${(props) => props.theme.dark_grey};
  font-size: 1rem;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  background-image: url(${(props) => props.icon});
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.25rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.black};
  }
`;

export { Title, Description, Form, Input };