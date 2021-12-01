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

    deletePlay: async (req, res) => {

        try{
            const id = req.params.id;
            dataMapper.deletePlay(id, (err, results) => {
                if (err) {
                    console.error(err);
                    next();
                    return;
                }
                return res.status(200).json({message: 'play deleted'})
            });
        } catch(error) {
            console.error(error);
            return res.status(500);
        }

    },


};


module.exports = mainController;