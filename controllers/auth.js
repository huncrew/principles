const UserModel = require('../models/User');
const {BadRequestError, UnauthenticatedError} = require('../errors');

const register = async (req, res, next) => {
    try {
        // token uses the 'user' variable, which now contains the users data, after passing through the data to the 'create' method.
        // the signed token with that users specific details are sent to the user.
        const registerUser = await UserModel.create(req.body);
        const token = registerUser.createJWT()
        return res.status(200).json({ user: { id: registerUser._id, name: registerUser.name, email: registerUser.email, token} })
    } catch (error) {
        return next(error);
    }
}

// Now, check against the registered user in the DB.
const login = async (req, res, next) => {
    console.log('in login', req.headers.authorization)
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return next(new BadRequestError('Please enter an email and password'));
        }
        const user = await UserModel.findOne({email});
        console.log(user);
        if (!user) {
            return next(new UnauthenticatedError('Invalid Credentials'));
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return next(new UnauthenticatedError('Invalid Password Credentials'));
        }
        // compare password
        const token = user.createJWT()
        return res.status(200).json({ user: { name: user.name, email: user.email, token} })

    } catch (error) {
        console.log(error)
        return next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        console.log('updateUser', req.headers.authorization);
        console.log('we are in update user')
        const { email, name } = req.body;
        if (!email || !name) {
          return next(new BadRequestError('Please provide all values'));
        }
        const user = await UserModel.findOne({ _id: req.user.userId });
      
        user.email = email;
        user.name = name;
      
        await user.save();
        res.status(200).json({
          user: {
            email: user.email,
            name: user.name,
          },
        });
    } catch (error){
        next(error);
    }

  };

module.exports = {
    register,
    login,
    updateUser
}