const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsutils');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
    console.log("READING FROM DB");
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


notes.get('/:id', (req, res) => {
    const notesId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === notesId);
        return result.length > 0
          ? res.json(result)
          : res.json('No tip with that ID');
      });
  });

notes.delete('/:id', (req, res) => {
    const notesId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id !== notesId);
  
        writeToFile('./db/db.json', result);
        console.log("NOTE DELETED");
        res.json(`Item ${notesId} has been deleted 🗑️`);
      });
  });
  

notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
          };

        res.json(response);
    } else {
        res.json('Error in adding note');
    }
});

module.exports = notes;