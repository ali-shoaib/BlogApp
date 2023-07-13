import React,{useState} from 'react'
import styles from "./ChangePassword.module.css";
import TextInput from "../../components/TextInput/TextInput";
import {resetPassword} from '../../api/internal';
import { resetUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import {RotatingLines} from 'react-loader-spinner';
import { useSelector } from "react-redux";
import SignupSchema from "../../schemas/SignupSchema";

function ChangePassword() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { values, touched, handleBlur, handleChange, errors } = useFormik({
        initialValues: {
          username: "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        },
    
        validationSchema: SignupSchema,
    });

    const [error, setError] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const globalusername = useSelector((state) => state.user.username);

    const handleResetPassword = async () => {
        setIsLoading(true);
  
        const data = {
          username: globalusername,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword
        };
    
        const response = await resetPassword(data);
    
        if (response.status === 200) {

          // 1. resetUser
          dispatch(resetUser);
  
          setIsLoading(false);
          // 2. redirect -> homepage
          navigate("/login");
        } 
        else if (response.code) {
          // display error message
          setError(response.response.data.message);
  
          setIsLoading(false);
        }
      };
  return (
    <div className={styles.changePasswordWrapper}>
      <div className={styles.changePasswordHeader}>Reset Password</div>
        <TextInput
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={values.currentPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.password && touched.password ? 1 : undefined}
            errormessage={errors.password}
        />
        <TextInput
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={values.newPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.password && touched.password ? 1 : undefined}
            errormessage={errors.password}
        />
        <TextInput
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.confirmPassword && touched.confirmPassword ? 1 : undefined}
            errormessage={errors.confirmPassword}
        />
        <button
            onClick={handleResetPassword}
            className={styles.confirmButton}
        >
            Confirm
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
        {error !== ''?<p className={styles.errorMessage}>{error}</p>:null}
    </div>
  )
}

export default ChangePassword