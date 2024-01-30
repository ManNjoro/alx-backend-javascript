const fs = require('fs').promises;
const express = require('express');

const app = express();
const port = 1245;

const countStudents = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf-8')
    .then((fileContent) => {
      const fileLines = fileContent.trim().split('\n');

      const studentGroups = {};
      const dbFieldNames = fileLines[0].split(',').slice(0, -1);

      for (const line of fileLines.slice(1)) {
        const studentRecord = line.split(',');
        const studentPropValues = studentRecord.slice(0, -1);
        const field = studentRecord.slice(-1)[0];

        if (!studentGroups[field]) {
          studentGroups[field] = [];
        }

        const studentEntry = Object.fromEntries(
          dbFieldNames.map((propName, idx) => [propName, studentPropValues[idx]]),
        );
        studentGroups[field].push(studentEntry);
      }

      const totalStudents = Object.values(
        studentGroups,
      ).reduce((acc, group) => acc + group.length, 0);

      const result = {
        totalStudents,
        studentGroups,
      };

      resolve(result);
    })
    .catch(() => {
      reject(new Error('Cannot load the database'));
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const databasePath = process.argv[2];

  countStudents(databasePath)
    .then((result) => {
      const { totalStudents, studentGroups } = result;
      let response = `This is the list of our students\nNumber of students: ${totalStudents}\n`;

      for (const [field, group] of Object.entries(studentGroups)) {
        const studentNames = group.map((student) => student.firstname).join(', ');
        response += `Number of students in ${field}: ${group.length}. List: ${studentNames}\n`;
      }

      res.send(response);
    })
    .catch((error) => {
      res.status(500).send(`Error: ${error.message}`);
    });
});

module.exports = app;
