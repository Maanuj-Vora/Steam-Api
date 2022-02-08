const SteamUser = require('steam-user');
const express = require("express");
const app = express()
const router = express.Router();

const helper = require('../helper')

var userOptions = {};
if (false) {
    userOptions.dataDirectory = '';
}

var user = new SteamUser(null, userOptions);
user.logOn();

app.use(helper.checkLogOn);

router.get('/:changenumber', async (req, res) => {
    var changenumber = parseInt(req.params.changenumber, 10);
    if (isNaN(changenumber)) {
        helper.sendJsonResponse(req, res, "Invalid changenumber", 400);
        return;
    }

    var timedOut = false;

    var timeout = setTimeout(function () {
        helpersendJsonResponse(req, res, "Steam request timed out", 504);
        timedOut = true;
    }, 15000);

    user.getProductChanges(changenumber, function (err, currentChangenumber, apps, packages) {
        if (err) {
            helper.sendJsonResponse(req, res, err.message, 500);
            clearTimeout(timeout);
            return;
        }

        if (timedOut) {
            return;
        }

        var appData = {};
        var packageData = {};

        apps.forEach(function (app) {
            appData[app.change_number] = app.appid;
        });

        packages.forEach(function (pkg) {
            packageData[pkg.change_number] = pkg.packageid;
        });

        helper.sendJsonResponse(req, res, { "success": 1, "current_changenumber": currentChangenumber, "apps": appData, "packages": packageData });
        clearTimeout(timeout);
    });
});

module.exports = router;