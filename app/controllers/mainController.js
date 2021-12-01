const dataMapper = require('../dataMapper.js');

const mainController = {

    homePage: async (_, res, next) => {

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
            res.status(500);
            next(error);
        }

    },

    deletePlay: async (req, res, next) => {

        try{
            const id = req.params.id;
            if (isNaN(id)) {
                return response.status(400).json({
                    error: `the provided id must be a number`
                });
                next();
            }
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
            res.status(500);
            next(error);
        }

    },

    addPlay: async (req, res, next) => {
        
        try{
            const form = req.body
            dataMapper.createPlay(form, (err, results) => {
                if (err) {
                    console.error(err);
                    next();
                    return;
                }
                return res.status(200).json(results.rows)
            });
        } catch(error) {
            console.error(error);
            res.status(500);
            next(error);
        }

    },


};


module.exports = mainController;