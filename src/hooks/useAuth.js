import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BASE_API_URL } from "../utils/api";
const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
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
    const response = await axios.post(
      `${BASE_API_URL}/users/login`,
      signinData
    );
    const data = response.data;
    if (data.token) {
      setUser(data);
    }
    return { ...data };
  };

  const signup = async (signupData) => {
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
      setUser(data);
    }
    return { ...data };
  };

  const verifyOTP = async (userId, otp) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/users/verify`, {
        userId,
        otp,
      });
      if (response.status === 200) {
        const user = { ...response.data.user, isVerified: true };
        setUser(user);
        return user; // Return the updated user object
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };


  const resendOTP = async (userId) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/users/resend-otp`, {
        userId,
      });
      if (response.status === 200) {
        return true; // Return true if OTP was resent successfully
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateProfile = async (userId, updateData) => {
    try {
      const response = await axios.put(`${BASE_API_URL}/users/user/${userId}`, updateData, {
        headers: {
          "Content-Type": "application/json",
          // Optionally include Authorization header if needed
          // Authorization: `Bearer ${user?.token}`,
        },
      });
      const updatedUser = response.data;
      setUser(prevUser => ({ ...prevUser, ...updatedUser }));
      return updatedUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };
  
  const signout = async () => {
    setUser(null);
    return true;
  };
  
  return {
    user,
    signin,
    signup,
    verifyOTP,
    resendOTP,
    updateProfile,
    signout,
  };
}
