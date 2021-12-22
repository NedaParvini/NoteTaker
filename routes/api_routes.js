const path = require('path');
const router = require('express').Router();
const fs = require("fs");

router.get("/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log(data);
            res.json(JSON.parse(data))
        }
    })
});

router.post("/notes", (req, res) => {
    console.log(req.body);
    console.log("headrout");
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
    // Variable for the object we will save
    const newnote = {
        title,
        text,

    };
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            //Create variable = JSON.parse(data) so that we can use it as a JS object (array)//
            const parsenote = JSON.parse(data);
            console.log(data);
            newnote.id = parsenote.length;
            // Add a new review
            parsenote.push(newnote);

            // Add new note from req.body
            //     * Push the object  from req.body to the array

            //Write the new array into the db.json file
            fs.writeFile('./db/db.json',
                JSON.stringify(parsenote, null, 4),
                (writeErr) =>
                    writeErr
                        ? console.error(writeErr)
                        : console.info('Successfully updated notes!'),
            )
            res.json(newnote)
        }
    });







    // res.json(array)//
    router.get('/api/notes', (req, res) => {
        // Inform the client
        res.json(`${req.method} request received `);

        // Log our request to the terminal
        console.info(`${req.method} request received `);
    });


});
// DELETE 
router.delete("/notes/:id", function (req, res) {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);
        // let notes = JSON.parse(notesData);
        let notesId = req.params.id;
        let newNotesId = 0;

        notes = notes.filter(currNote => {
            return currNote.id != notesId;
        });

        for (currNote of notes) {
            currNote.id = newNotesId.toString();
            newNotesId++;
        }

        fs.writeFileSync("db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
            if (err) throw err;
            console.log("Success!");
        });

        res.json(notes);
    });
});

module.exports = router;
