import { useState, useEffect } from "react";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FRONTEND_INTERNAL_API_PATH } from "../config/keys";

function useAutoLogin() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    // IIFE
    (async function autoLoginApiCall() {
      try {
        const response = await axios.get(
          `${FRONTEND_INTERNAL_API_PATH}refresh`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          // 1. setUser
          const user = {
            _id: response.data.user._id,
            email: response.data.user.email,
            username: response.data.user.username,
            auth: response.data.auth,
            name: response.data.user.name,
            createdAt: response.data.user.createdAt
          };

          dispatch(setUser(user));
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return loading;
}

export default useAutoLogin;