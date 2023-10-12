const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const sessionFolder = __dirname+"/storage/sessions";

let filePath, sessionName;

router.get("/", (req, res) => {
    let sessions = []

    fs.readdir(sessionFolder, (err, files) => {
        if (err) {
            console.error("Could not list the directory.", err);
        }

        files.forEach((file, index) => {
            const sessionInfo = JSON.parse(fs.readFileSync(path.join(sessionFolder, file))).information;
            sessions.push(sessionInfo);
        });

        console.log(sessions);
    });


    res.status(200).send();
});

module.exports = router;