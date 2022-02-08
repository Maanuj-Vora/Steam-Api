if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require("express")
const app = express()
const development_changes = require("./development/changes")
const development_info = require("./development/info")
const query_information = require("./query/information")
const helper = require("./helper")

app.use(express.json({ extended: false }))

app.use(helper.cors);

app.use("/development/changes", development_changes)
app.use("/development/info", development_info)
app.use("/query/information", query_information)

app.get("/", async (req, res) => {
    try {
        res.json({
            status: 200,
            message: "api is currently up and running",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))