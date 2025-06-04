const setImagePath = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}/imgs`);
    req.imagePath = `${req.protocol}://${req.get('host')}/imgs/`
    next()
}

module.exports = setImagePath;