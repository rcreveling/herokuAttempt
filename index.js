var mysql = require('mysql')
const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var characters = [
    {
        routeName: "JKeena",
        name: "Justin Keena",
        role: "Massive pain in the ass",
        hitpoints: 5,
        specialty: "Philosophy(?)"
    }, {
        routeName: "JCutler",
        name: "J. MacDaddio",
        role: "Dad?",
        hitpoint: 369,
        specialty: "Getting cigarettes when I was 10"
    }, {
        routeName: "BGrogg",
        name: "Bethany Grogg",
        role: "Silent but deadly",
        hitpoints: 25,
        specialty: "The side glance chuckle"
    },
    {
        routeName: "PMaclaughlin",
        name: "Pete IIII",
        role: "That Guy",
        hitpoints: 2000,
        specialty: "Providing out of date and ecclectic knowledge that makes you feel like a part of something special"
    }, {
        routeName: "ALacasse",
        name: "Adam LaCasse",
        role: "Teacher's 'Assistant'",
        hitpoints: 12,
        specialty: "What that bike do tho?"
    }, {
        routeName: "JLeboeuf",
        name: "Joshua LeBoeuf",
        role: "Teacher's 'Assistant'",
        hitpoints: 12,
        specialty: "Quickest Slack in the West."
    }];

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++///
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

// Displays all characters
app.get("/api/characters", function (req, res) {
    return res.json(characters);
});

// Displays a single character, or returns false
app.get("/api/characters/:character", function (req, res) {
    var chosen = req.params.character;

    console.log(chosen);

    for (var i = 0; i < characters.length; i++) {
        if (chosen === characters[i].routeName) {
            return res.json(characters[i]);
        }
    }

    return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/characters", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newCharacter = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newCharacter);

    characters.push(newCharacter);

    res.json(newCharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

