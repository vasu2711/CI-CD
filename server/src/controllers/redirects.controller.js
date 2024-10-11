const router = require('express').Router();
const { URLModel } = require('../models/url.model');


router.get('/:code', async(req, res) => {
    try {
        const { code } = req.params;
        console.log(code);
        const url = await URLModel.findOne({
            urlCode: code
        });
        console.log(JSON.stringify(url).urlCode);
        if (url) {
            URLModel.updateOne({ urlCode: code }, { $inc: { count: 1 } }).exec();
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No URL Found');
        }

    } catch (err) {
        console.error(err);
        res.status(500).json('Server Error');
    }
});

module.exports = router;