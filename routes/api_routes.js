const path = require('path');
const router = require('express').Router();
const fs = require("fs");

router.get("/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data))
        }
    })
});

router.post("/notes", (req, res) => {
    console.log(req.body);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            //Create variable = JSON.parse(data) so that we can use it as a JS object (array)//
            const parsenote = JSON.parse(data);
            // Add a new review
            parsenote.push(newnote);
           
            //     * Array should be in a variable

            // 2. Add new note from req.body
            //     * Push the object  from req.body to the array

            // 3. Write the new array into the db.json file
            fs.writeFile('./db/db.json',
          JSON.stringify(parsenote, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

            // 4. res.json(array)

        }
    })


});
module.exports = router;