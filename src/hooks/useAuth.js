import axios from "axios";
import {createContext, useContext, useEffect, useState} from "react";
import { BASE_API_URL } from "../utils/api";
const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({children}) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {

  const [user, setUser] = useState(null);

  // ... to save the user to state.
  const signin = async (signinData) => {
    const response = await axios.post(`${BASE_API_URL}/users/login`,signinData);
    const data = response.data;
    if (data.token) {
      setUser(data);
    }
    return {...data};
  };

    const signup = async signupData => {
        const response = await axios.post(
          `${BASE_API_URL}/users/register`,
          signupData,
          {
            headers: {
             "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        if (data.token) {
          setUser(data)
        }
        return {...data}
    };

  const signout = async () => {
    // axios.post(
    //   `${BASE_API_URL}/auth/logout`,
    //   {},
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    setUser(null);
    return true;
  };
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
//   useEffect(() => {
//     const user = JSON.parse(sessionStorage.getItem("user"));
//     const userToken = sessionStorage.getItem("token");
//     if (user && userToken) {
//       setUser(user);
//     } else {
//       setUser(null);
//     }
//   }, []);
  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
  };
}
