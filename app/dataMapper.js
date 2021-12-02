const client = require('./database');

const dataMapper = {

    getAllPlay: function (callback) {
        const query = {
        text: `SELECT * FROM "play"`
        };
        client.query(query, callback);
    },

    createPlay: function (form, callback) {
        const query = {
        text: `INSERT INTO "play" ("team_A", "team_B") VALUES ($1, $2) RETURNING *`,
        values: [form.team_A, form.team_B]
        };
        client.query(query, callback);
    },

    endPlay: function (form, callback) {
        const query = {
        text: `UPDATE "play" SET "status" = $1, "score_A" = $2, "score_B" = $3 WHERE "id" = $4 RETURNING *`,
        values: [true, form.score_A, form.score_B, form.id]
        };
        client.query(query, callback);
    },

    deletePlay: function (id, callback) {
        const query = {
        text: `DELETE FROM "play" WHERE "id" = $1`,
        values: [id]
        };
        client.query(query, callback);
    },

};

module.exports = dataMapper;