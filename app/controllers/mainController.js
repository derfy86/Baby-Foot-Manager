const dataMapper = require('../dataMapper.js');

const mainController = {

    homePage: async (req, res) => {

        try{
            dataMapper.getAllPlay((err, results) => {
                if (err) {
                    console.error(err);
                    next();
                    return;
                }
                return res.status(200).json(results.rows)
            });
        } catch(error) {
            console.error(error);
            return res.status(500);
        }

    },


};

module.exports = mainController;