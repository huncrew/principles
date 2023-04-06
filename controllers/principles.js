const Principles = require('../models/principles');
const CustomError = require('../errors/index');
const jwt = require('jsonwebtoken');

const getPrinciples = async (req, res, next) => {
    try {
        const allPrinciplesObject = await Principles.find();
        return res.status(201).json({ jobs: allPrinciplesObject});
    } catch (error) {
        return next(error);
    }
}
const getSpecificAreaPrinciples = async (req, res, next) => {
    try {
        const { area } = req.query;
        if (!area) {
            return next(new CustomError.BadRequestError(`You haven't entered a specific area of principles to retrieve!`));
        }
        const principlesAreaObject = await Principles.find({area: area});
        if (!principlesAreaObject.length) {
            console.log(principlesAreaObject, 'query undefined');
            return next(new CustomError.BadRequestError(`You don't have any principles in this area yet!`));
        }
    } catch (error) {
        return next(error);
    }
    return res.status(201).json({principles: principlesAreaObject});
}
const createPrinciple = async (req, res, next) => {
    const userObject = {
        area: req.body.area,
        text: req.body.text,
        user: req.user.userId
    }
    try {
        const submittedPrinciple = await Principles.create(userObject);
        return res.status(200).json({ msg: 'successfully posted principle', principle: submittedPrinciple });
    } catch (error) {
        console.log(error);
        return next(error);
    }
}
const updatePrinciple = async (req, res, next) => {
    try {
        const id  = req.params.id;
        const product = await Principles.findOneAndUpdate({ _id: id }, req.body, {
          new: true,
          runValidators: true,
        });
        if (!product) {
            return next(new CustomError.NotFoundError(`No product with id : ${id}`)); 
          }
        return res.status(200).json({ product });
    } catch (error) {
        console.log('we are calling in the error block')
        return next(error);
    }
};
const deletePrinciple = async (req, res, next) => {
    try {
        const id = req.params.id;
        const principle = await Principles.findOne({ _id: id });
        if (!principle) {
            throw new CustomError.NotFoundError(`No principle with id : ${id}`);
        } 
        await principle.remove();
        res.status(200).json({ msg: 'Success! Principle removed.' });       
    } catch (error) {
        next(error);
    }
};
const hardWorkPrinciple = async (req, res, next) => {
    const edison = "There is no substitute for hard work";
    res.status(200).json({
        msg: `Hello, ${req.user.name}`,
        secret: `${edison}`,
      })
}
const getUsersPrinciples = async (req, res, next) => {
    try {
        const { search } = req.query;
        const queryObject = {
          user: req.user.userId,
        };
        if (search) {
          queryObject.text = { $regex: search, $options: 'i' };
        }
        const principles = await Principles.find(queryObject);
        return res.status(201).json({ jobs: principles});
    } catch (error) {
        console.log('getUsersError', error);
        return next(error);
    }
}

module.exports = {
    getPrinciples,
    getSpecificAreaPrinciples,
    createPrinciple,
    updatePrinciple,
    deletePrinciple,
    hardWorkPrinciple,
    getUsersPrinciples
} 