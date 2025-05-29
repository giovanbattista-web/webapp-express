const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Elenco film");
})

router.get('/:id', (req, res) => {
    res.send("Film con id" + req.params.id);
});

module.exports = router;