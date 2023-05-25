const Joi = require('joi');
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const UserDTO = require('../dto/userDTO');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

const authController={
    async register(req, res, next){
        const userRegisterSchema = Joi.object({
            username: Joi.string().min(6).max(30).required(),
            name: Joi.string().max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(passwordPattern).required(),
            confirmPassword: Joi.ref('password')
        })

        const {error} = userRegisterSchema.validate(req.body);

        if(error){
            return next(error);
        }

        const { username, name, email, password } = req.body;

        try {
            const emailInUse = await User.exists({ email });

            const usernameInUse = await User.exists({ username });

            if (emailInUse) {
                const error = {
                status: 409,
                message: "Email already registered, use another email!",
                };

                return next(error);
            }

            if (usernameInUse) {
                const error = {
                status: 409,
                message: "Username not available, choose another username!",
                };

                return next(error);
            }
        } catch (error) {
            return next(error);
        }

        // 4. password hash
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. store user data in db
        let accessToken;
        let refreshToken;

        const userToRegister = new User({
            username,
            email,
            name,
            password: hashedPassword,
        });

        const user = await userToRegister.save();

        // const userDto = new UserDTO(user);

        return res.status(201).json({ user });
    },
    async login(req,res,next){
        const userLoginSchema = Joi.object({
            username: Joi.string().min(6).max(30).required(),
            password: Joi.string().pattern(passwordPattern).required(),
        })

        const {error} = userLoginSchema.validate(req.body);

        if(error){
            return next(error);
        }

        const { username, password } = req.body;

        let user;
        try {
            user = await User.findOne({username});

            if (!user) {
                const error = {
                  status: 401,
                  message: "Invalid username",
                };
        
                return next(error);
            }

            const match = await bcrypt.compare(password, user.password);

            if(!match){
                const error = {
                    status:401,
                    message:'Invalid Password'
                }
                
                return next(error);
            }
        
        } catch (error) {
            return next(error);
        }

        let userDto = new UserDTO(user);

        return res.status(200).json({user:userDto});
    },
    async getAllUsers(req,res){
        let users = await User.find();

        let userDto = new UserDTO(users);

        return res.status(200).json(users);
    }
}

module.exports=authController;