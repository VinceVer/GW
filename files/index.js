const fs = require('fs');
const express = require("express");
const app = express();
const serversRouter = require("./sessions");
const port = 80;

//app.use(express.static(__dirname + '/public'));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use("/sessions", serversRouter);

// GET:
app.get("/", (req, res) => { res.status(200).sendFile("/website/main.html", {root: __dirname}); });

app.get("/host", (req, res) => { res.status(200).sendFile("/website/join.html", {root: __dirname}); });

app.get("/join", (req, res) => { res.status(200).sendFile("/website/join.html", {root: __dirname}); });

app.get("/:folder/:file", (req, res) => {
    const fileName = req.params.file,
    folderName = req.params.folder + "s";
    res.status(200).sendFile(`/website/${folderName}/${fileName}`, {root: __dirname})
});

app.get("/sessionList", (req, res) => { res.status(200).sendFile("/website/servers.html", {root: __dirname}); });
// ----

// POST:
app.post("/player_ids", (req, res) => {
    const data = req.body;

    if (!data.name || !data) {
        res.status(400).send("Undefined or Unreadable userinfo")
    }

    const player_list = JSON.parse(fs.readFileSync("storage/player_ids.json"))
    const newID = player_list.length;

    const newPlayer = {
        id: newID,
        name: data.name,
        wins: {}
    }

    player_list.push(newPlayer);
    
    fs.writeFileSync("storage/player_ids.json", JSON.stringify(player_list, null, "\t"));
    console.log(`New Player: {id: ${newID}, name: ${data.name}}`);

    res.status(201).send({id: newID});
});
// -----



app.listen(port, () => {
    console.log(`The server is listening on port ${port}`)
});