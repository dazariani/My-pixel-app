import { useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { AuthContext, AuthToken, User } from "./authContextTypes";
import { getTokensRefresh } from "../functions/apiCalls";

interface AuthProviderProps {
  children: ReactNode;
}

const getInitialAuthState = () => {
  const tokensCookie = Cookies.get("authTokens");
  if (tokensCookie) {
    try {
      const parsedTokens: AuthToken = JSON.parse(tokensCookie);
      const decodedUser: User = jwtDecode(parsedTokens.access);
      return { authTokens: parsedTokens, user: decodedUser };
    } catch (error) {
      console.error("Invalid auth token in cookie", error);
      Cookies.remove("authTokens");
      return { authTokens: null, user: null };
    }
  }
  return { authTokens: null, user: null };
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const initialState = getInitialAuthState();
  const [authTokens, setAuthTokens] = useState<AuthToken | null>(
    initialState.authTokens
  );
  const [user, setUser] = useState<User | null>(initialState.user);
  const [loading, setLoading] = useState(true);

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    Cookies.remove("authTokens");
  };

  const loginUser = (tokens: AuthToken) => {
    setAuthTokens(tokens);
    const decodedUser: User = jwtDecode(tokens.access);
    setUser(decodedUser);
    Cookies.set("authTokens", JSON.stringify(tokens), {
      expires: 90,
      path: "/",
    });
  };

  const updateToken = async () => {
    getTokensRefresh(authTokens?.refresh)
      .then((res) => {
        if (res?.status === 200) {
          loginUser(res.data);
          // console.log("Token refreshed: ", new Date(new Date().getTime()));
        }
      })
      .catch((error) => {
        console.error("Token refresh failed", error);
        logoutUser();
      });
    setLoading(false);
  };

  useEffect(() => {
    if (authTokens) {
      if (loading) {
        updateToken();
      }
    } else {
      setLoading(false);
    }
    const FOUR_MINUTES = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, FOUR_MINUTES);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    logoutUser,
    loginUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
