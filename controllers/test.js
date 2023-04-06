const addToRed = (req, res, next) => {
    req.dale = 'dale';
    next();
}

module.exports = addToRed;