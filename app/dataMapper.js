const client = require('./database');

const dataMapper = {

    getAllPlay: function (callback) {
        const query = {
        text: `SELECT * FROM "play"`
        };
        client.query(query, callback);
    },

    deletePlay: function (id, callback) {
        const query = {
        text: `DELETE FROM "play" WHERE "id"=$1`,
        values: [id]
        };
        client.query(query, callback);
    },

};

module.exports = dataMapper;