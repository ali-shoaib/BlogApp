const Joi = require('joi');
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const UserDTO = require('../dto/user');
const JWTService = require('../services/JWTService');
const RefreshToken = require("../models/token");
const nodemail = require('nodemailer');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

const authController={
    async register(req, res, next){
        const userRegisterSchema = Joi.object({
            username: Joi.string().min(6).max(30).required(),
            name: Joi.string().max(30).required(),
            email: Joi.string().email().required(),
            gender: Joi.string().required(),
            password: Joi.string().pattern(passwordPattern).required(),
            confirmPassword: Joi.ref('password')
        })

        const {error} = userRegisterSchema.validate(req.body);

        if(error){
            return next(error);
        }

        const { username, name, email, password, gender } = req.body;

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

        let user;

        try{
            const userToRegister = new User({
                username,
                email,
                name,
                password: hashedPassword,
                gender
            });
    
            user = await userToRegister.save();

            // token generation
            accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");

            refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");
        }
        catch(err){
            next(err);
        }

        // store refresh token in db
        await JWTService.storeRefreshToken(refreshToken, user._id);

        // send tokens in cookie
        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });

        res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });

        const userDto = new UserDTO(user);

        return res.status(201).json({ user:userDto });
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

        const accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
        const refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");

        // update refresh token in database
        try {
            await RefreshToken.updateOne(
                {
                _id: user._id,
                },
                { token: refreshToken },
                { upsert: true }
            );
        } catch (error) {
            return next(error);
        }

        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });

        res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });

        let userDto = new UserDTO(user);

        return res.status(200).json({user:userDto, auth:true});
    },
    async resetPassword(req,res,next){
        const resetPasswordSchema = Joi.object({
            username: Joi.string().min(6).max(30).required(),
            currentPassword: Joi.string().pattern(passwordPattern).required(),
            newPassword: Joi.string().pattern(passwordPattern).required(),
            confirmPassword: Joi.ref('newPassword'),
        })

        const {error} = resetPasswordSchema.validate(req.body);

        if(error){
            return next(error);
        }

        const { username, currentPassword, newPassword, confirmPassword } = req.body;

        let user;
        try {
            user = await User.findOne({username});

            if (user) {
                const match = await bcrypt.compare(currentPassword, user.password);

                if(!match){
                    const error = {
                        status:401,
                        message:'Invalid Password'
                    }
                    
                    return next(error);
                }

                const newmatch = await bcrypt.compare(newPassword, confirmPassword);

                if(newmatch){
                    const error = {
                        status:401,
                        message:"New passwords do not match"
                    }
                    return next(error);
                }

                const hashedPassword = await bcrypt.hash(newPassword, 10);

                await User.updateOne(
                    {_id:user._id},
                    {password:hashedPassword}
                )

                // 1. delete refresh token from db
                const { refreshToken } = req.cookies;

                try {
                await RefreshToken.deleteOne({ token: refreshToken });
                } catch (error) {
                return next(error);
                }

                // delete cookies
                res.clearCookie("accessToken");
                res.clearCookie("refreshToken");
            }
            else{
                const error = {
                    status: 401,
                    message: "Invalid username",
                };
          
                return next(error);
            }
        
        } catch (error) {
            return next(error);
        }

        return res.status(200).json({user, message:"Password has been reset."});
    },
    async logout(req,res,next){
        // 1. delete refresh token from db
        const { refreshToken } = req.cookies;

        try {
        await RefreshToken.deleteOne({ token: refreshToken });
        } catch (error) {
        return next(error);
        }

        // delete cookies
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        // 2. response
        res.status(200).json({ user: null, auth: false });
    },
    async refresh(req,res,next){
        const originalRefreshToken = req.cookies.refreshToken;

        let id;

        try {
            id = JWTService.verifyRefreshToken(originalRefreshToken)._id;
        } 
        catch (e) {
            const error = {
                status: 401,
                message: "Unauthorized",
            };

            return next(error);
        }

        try {
            const match = RefreshToken.findOne({
                _id: id,
                token: originalRefreshToken,
            });

            if (!match) {
                const error = {
                status: 401,
                message: "Unauthorized",
                };

                return next(error);
            }
        } catch (e) {
            return next(e);
        }

        try {
            const accessToken = JWTService.signAccessToken({ _id: id }, "30m");

            const refreshToken = JWTService.signRefreshToken({ _id: id }, "60m");

            await RefreshToken.updateOne({ _id: id }, { token: refreshToken });

            res.cookie("accessToken", accessToken, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
            });

            res.cookie("refreshToken", refreshToken, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
            });
        } catch (e) {
            return next(e);
        }

        const user = await User.findOne({ _id: id });

        const userDto = new UserDTO(user);

        return res.status(200).json({ user: userDto, auth: true });
    },
    async getAllUsers(req,res){
        let users = await User.find();

        let userDto = new UserDTO(users);

        return res.status(200).json(users);
    },
    async deleteUser(req,res){
        try{
            let user = await User.deleteOne({_id: req.body.id})

            return res.status(200).json({success:true, data: user});
        }
        catch(err){
            res.status(500).json({success:false, message: err});
        }
    },
    async forgetPassword(req,res,next){
        try{
            const {email, password} = req.body;

            let user;
            user = await User.findOne({email});

            if (!user) {
                const error = {
                  status: 401,
                  message: "Invalid email",
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

            let options = {
                host: "smtp.gmail.com",
                port: 587,
                secure: false, 
                requireTLS: true,
                auth:{
                    user: "yolohoxoyolo@gmail.com",
                    pass: "yolohoxo@2000"
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false,
                },
            }

            let data= {
                from:"yolohoxoyolo@gmail.com",
                to:email,
                subject:"Password Reset",
                html:`<p>Hi ${email}, Change your password.<p>`
            }

            let response;
            const transporter = nodemail.createTransport(options);
            transporter.sendMail(data , (err, info) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({success:false, data: err});
                }
                else{
                    response = info.response;
                    return res.status(200).json({success:true, data: response});
                }
            })
        }
        catch(err){
            next(err);
        }
    }
}

module.exports=authController;