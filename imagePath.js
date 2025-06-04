const setImagePath = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}/img`);
    req.imagePath = `${req.protocol}://${req.get('host')}/img/`
    next()
}

module.exports = setImagePath;