const express = require('express');
const html_routes = require ("./routes/html_routes")
const api_routes = require ("./routes/api_routes")
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//Tell the express to use the files// 
app.use("/api" , api_routes)
app.use("/" , html_routes)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
 // DELETE 
 app.delete("/notes/:id", function (req, res) {
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
