const client = require('./database');

const dataMapper = {

    getAllPlay: function (callback) {
        const query = {
        text: `SELECT * FROM "play"`
        };
        client.query(query, callback);
    },

};

module.exports = dataMapper;