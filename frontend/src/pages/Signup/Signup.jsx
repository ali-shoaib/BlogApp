import React,{useState} from 'react';
import {signup} from '../../api/internal';
import styles from "./Signup.module.css";
import TextInput from "../../components/TextInput/TextInput";
import SignupSchema from "../../schemas/SignupSchema";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import {RotatingLines} from 'react-loader-spinner';
import SelectInput from '../../components/SelectInput/SelectInput';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  const options = ["Male","Female"];

  const handleSignup = async () => {
    setIsLoading(true);

    const data = {
      name: values.name,
      username: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword,
      email: values.email,
      gender: values.gender,
    };

    const response = await signup(data);

    if (response.status === 201) {
      setIsLoading(false);
      // redirect homepage
      navigate("/login");
    } else if (response.code) {
      // display error message
      setError(response.response.data.message);
      setIsLoading(false);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: ""
    },

    validationSchema: SignupSchema,
  });

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.signupHeader}>Create an account</div>
      <TextInput
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="name"
        error={errors.name && touched.name ? 1 : undefined}
        errormessage={errors.name}
      />

      <TextInput
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="username"
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.username}
      />

      <TextInput
        type="text"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="email"
        error={errors.email && touched.email ? 1 : undefined}
        errormessage={errors.email}
      />

      <TextInput
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />

      <TextInput
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="confirm password"
        error={
          errors.confirmPassword && touched.confirmPassword ? 1 : undefined
        }
        errormessage={errors.confirmPassword}
      />

      <SelectInput
        name="gender"
        value={values.gender}
        onChange={handleChange}
        options={options}
        error={
          errors.gender && touched.gender ? 1 : undefined
        }
        errormessage={errors.gender}
      />

      <button
        className={styles.signupButton}
        onClick={handleSignup}
        disabled={
          !values.username ||
          !values.password ||
          !values.name ||
          !values.confirmPassword ||
          !values.email ||
          !values.gender
        }
      >
        Sign Up
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
        Already have an account?{" "}
        <button className={styles.login} onClick={() => navigate("/login")}>
          Log In
        </button>
      </span>

      {error !== "" ? <p className={styles.errorMessage}>{error}</p> : null}
    </div>
  )
}

export default Signup;