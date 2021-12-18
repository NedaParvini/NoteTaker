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
                // Add a new review
                parsenote.push(newnote);

                // Add new note from req.body
                //     * Push the object  from req.body to the array

                // 3. Write the new array into the db.json file
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
module.exports = router;
