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


router.get('/', async (req, res) => {
    if (!req.query || (!req.query.apps && !req.query.packages)) {
        helper.sendJsonResponse(req, res, "No apps or packages specified", 400);
        return;
    }

    var apps = req.query.apps ? req.query.apps.split(',') : [];
    var packages = req.query.packages ? req.query.packages.split(',') : [];

    if (apps.concat(packages).some(function (id) {
        return isNaN(id);
    })) {
        helper.sendJsonResponse(req, res, "Invalid input ID", 400);
        return;
    }

    apps = apps.map(function (appid) {
        return parseInt(appid, 10);
    });

    packages = packages.map(function (packageid) {
        return parseInt(packageid, 10);
    });

    var timedOut = false;
    var timeout = setTimeout(function () {
        timedOut = true;
        helper.sendJsonResponse(req, res, "Steam request timed out", 504);
    }, 30000);

    user.getProductInfo(apps, packages, function (err, appData, packageData, unknownApps, unknownPackages) {
        if (err) {
            helper.sendJsonResponse(req, res, err.message, 500);
            clearTimeout(timeout);
            return;
        }


        if (timedOut) {
            return;
        }

        var outApps = {};
        var outPackages = {};

        var i;
        for (i in appData) {
            if (!appData.hasOwnProperty(i)) {
                continue;
            }

            outApps[i] = appData[i].appinfo;
            outApps[i].change_number = appData[i].changenumber;
        }

        for (i in packageData) {
            if (!packageData.hasOwnProperty(i)) {
                continue;
            }

            outPackages[i] = packageData[i].packageinfo;
        }

        helper.sendJsonResponse(req, res, { "success": 1, "apps": outApps, "packages": outPackages, "unknown_apps": unknownApps, "unknown_packages": unknownPackages });

        clearTimeout(timeout);
    });
});
module.exports = router;