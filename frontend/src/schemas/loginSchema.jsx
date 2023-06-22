import * as yup from 'yup';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const erroMessage = "use lowercase, uppercase and digits";

const LoginSchema = yup.object().shape({
    username: yup.string().min(5).max(30).required(),
    password: yup.string().min(5).max(30).matches(passwordPattern, {message:erroMessage}).required()
})

export default LoginSchema;