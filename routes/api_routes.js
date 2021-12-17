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
           
             // Add new note from req.body
            //     * Push the object  from req.body to the array

            // 3. Write the new array into the db.json file
            fs.writeFile('./db/db.json',
          JSON.stringify(parsenote, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!'),
        );
            }
    });
    const response = {
        status: 'success',
        body: newnote,
      };
  
      console.log(response);
      res.json(response);
   
      res.json('Error in posting notes'),
    
         
            // res.json(array)//
            app.get('/api/notes', (req, res) => {
                // Inform the client
                res.json(`${req.method} request received `);
              
                // Log our request to the terminal
                console.info(`${req.method} request received `);
            });
                
             
});
module.exports = router;