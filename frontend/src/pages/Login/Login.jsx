import React from 'react';
import styles from "./Login.module.css";
import TextInput from "../../components/TextInput/TextInput";
import loginSchema from "../../schemas/loginSchema";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {login} from '../../api/internal';
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

function Login() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [error, setError] = React.useState("");

    const handleLogin = async () => {
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
                auth: response.data.auth,
            };
            console.log("response => ",response);
    
            dispatch(setUser(user));
            // 2. redirect -> homepage
            navigate("/");
        } 
        else if (response.code) {
            // display error message
            setError(response.response.statusText);
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
      <div className={styles.loginHeader}>Log in to your account</div>
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
        // disabled={
        //   !values.username ||
        //   !values.password ||
        //   errors.username ||
        //   errors.password
        // }
        onClick={handleLogin}
      >
        Log In
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