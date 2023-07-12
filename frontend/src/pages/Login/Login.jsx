import React, { useState } from 'react';
import styles from "./Login.module.css";
import TextInput from "../../components/TextInput/TextInput";
import loginSchema from "../../schemas/loginSchema";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {login} from '../../api/internal';
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import {RotatingLines} from 'react-loader-spinner';

function Login() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [error, setError] = React.useState("");
    const [isLoading,setIsLoading] = useState(false);

    const handleLogin = async () => {
      setIsLoading(true);

      const data = {
        username: values.username,
        password: values.password,
      };
  
      const response = await login(data);
  
      if (response.status === 200) {
        // 1. setUser
        const user = {
            _id: response.data.user._id,
            email: response.data.user.email,
            username: response.data.user.username,
            name: response.data.user.name,
            auth: response.data.auth,
            createdAt: response.data.user.createdAt
        };

        dispatch(setUser(user));

        setIsLoading(false);
        // 2. redirect -> homepage
        navigate("/");
      } 
      else if (response.code) {
        // display error message
        setError(response.response.statusText);

        setIsLoading(false);
      }
    };
    
    const { values, touched, handleBlur, handleChange, errors } = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
  
      validationSchema: loginSchema,
    });

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginHeader}>LogIn your account</div>
      <TextInput
        type="text"
        value={values.username}
        name="username"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="username"
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.username}
      />
      <TextInput
        type="password"
        name="password"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />
      <button
        className={styles.logInButton}
        disabled={
          !values.username ||
          !values.password
        }
        onClick={handleLogin}
      >
        Log In
        {isLoading ? 
          <span className={styles.loader}>
          <RotatingLines
            height="35" 
            width="35"
            radius="9"
            strokeColor='maroon'
            strokeWidth="5"
            animationDuration="0.75"
            visible={true}
          />
          </span>
          :
        null}
      </button>
      <span>
        Don't have an account?{" "}
        <button
          className={styles.createAccount}
          onClick={() => navigate("/signup")}
        >
          Register
        </button>
      </span>
      {error !== ''?<p className={styles.errorMessage}>{error}</p>:null}
    </div>
  )
}

export default Login