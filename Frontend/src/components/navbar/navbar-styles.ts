import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export {
  NavContainer,
  NavList,
  NavItem,
  NavAuth,
  AuthButtonsContainer,
  AuthLink,
  AuthButton,
};

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  font-size: 0.875rem;
  border-bottom: 1px solid ${(props) => props.theme.black};
`;

const NavList = styled.ul`
  list-style-type: none;
  color: ${(props) => props.theme.dark_grey};
  display: flex;
  gap: 1.25rem;

  & a {
    text-decoration: none;
    color: unset;
  }
`;

const NavItem = styled.li<{ $isActive: boolean }>`
  padding: 0.75rem;
  border-radius: 0.25rem;
  color: ${(props) => (props.$isActive ? props.theme.black : "unset")};
  background-color: ${(props) =>
    props.$isActive ? props.theme.light_grey : "unset"};
  transition: 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.light_grey};
  }
`;

const NavAuth = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & span {
    color: ${(props) => props.theme.dark_grey};
  }
`;

const AuthButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const buttonStyles = css`
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
  border: 1px solid ${(props) => props.theme.black};
  background-color: transparent;
  cursor: pointer;
  transition: 0.3s ease;
  text-decoration: none;
  color: ${(props) => props.theme.black};
  font-size: 0.875rem;
  display: inline-block;
  text-align: center;

  &:hover {
    background-color: ${(props) => props.theme.black};
    color: ${(props) => props.theme.white};
  }
`;

const AuthLink = styled(Link)`
  ${buttonStyles}
`;

const AuthButton = styled.button`
  ${buttonStyles}
`;