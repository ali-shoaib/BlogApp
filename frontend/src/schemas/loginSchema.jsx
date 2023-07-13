import * as yup from 'yup';

const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;

const erroMessage = "use lowercase, uppercase and digits";

const LoginSchema = yup.object().shape({
    username: yup.string().min(5).max(30).required(),
    password: yup.string().min(5).max(30).matches(passwordPattern, {message:erroMessage}).required()
})

export default LoginSchema;