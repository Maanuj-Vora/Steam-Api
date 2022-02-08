module.exports = {
    cors: function (req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        next();
    },
    checkLogOn: function (req, res, next, user) {
        if (req.url != '/' && !user.steamID) {
            sendJsonResponse(req, res, "Not logged onto Steam", 503);
        } else {
            next();
        }
    },
    sendJsonResponse: function (req, res, response, statusCode) {
        if (typeof response === 'string') {
            response = { "success": 0, "error": response };
        }

        if (typeof statusCode === 'number') {
            res.status(statusCode);
        }

        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(response, null, (req.query && req.query.prettyprint && req.query.prettyprint != 0) ? "\t" : null));
    }
}