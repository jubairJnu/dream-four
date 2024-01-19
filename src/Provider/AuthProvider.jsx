import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// *** atuh provider routes
const AuthProvider = ({ children }) => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (isAuthenticated === "true" && storedUserInfo) {
      setUser({ isAuthenticated: true });
      setUserInfo(storedUserInfo);
    }
    setLoading(false);
  }, []);

  // login system
  const login = (email, password) => {
    setLoading(true);
    fetch(`${base_url}/logged`, {
      method: "POST",

      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "invalid User") {
          setLoading(false);
          setError("Invalid Credentials");
          setUser({ isAuthenticated: false });
        } else if (data.status === "valid User") {
          // Store user information in local storage
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userInfo", JSON.stringify(data.user));

          // Update state or perform other actions based on successful login
          setUser({ isAuthenticated: true });
          setUserInfo(data.user);

          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("Something went wrong");
        console.error("Error:", error);
      });
  };

  // logout

  const logOut = () => {
    loading;
    setUser({ isAuthenticated: false });
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userInfo");
  };

  const authInfo = {
    user,
    userInfo,
    error,
    login,
    logOut,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
