const express = require('express');
const router = express.Router();
const connect = require('../dbConnection'); // Import the connect object
const app = express()
app.use(express.json())
// define post route for adding  an student
router.post('/createstudent', (req, res) => {
    const { student_num, student_name, student_surname, student_section, student_address } = req.body;
    console.log(req.body);
    // define the sql query with placeholders
    const sqlquery = 'INSERT INTO student (student_num, student_name, student_surname, student_section, student_address) VALUES (?,?,?,?,?)';

    // Execute the SQL query with the provided data
    connect.query(sqlquery, [student_num, student_name, student_surname, student_section, student_address], (err, result) => {
        if (err) {
            // Handle the error, such as sending an error response
            console.error('Error adding student:', err);
            res.status(500).json({ error: 'Error adding student' });
            return;
        }

        // If there's no error, send a success response
        res.status(200).json({ message: 'Student added successfully' });
    })
});
// define get call route for adding an student
router.get('/getstudent/:studentnum', (req, res) => {
    const studentnum = req.params.studentnum;

    // Define the SQL query to select a student by their ID
    const sqlQuery = 'SELECT * FROM student WHERE student_num = ?';

    // Execute the SQL query with the provided studentnum
    connect.query(sqlQuery, [studentnum], (err, results) => {
        if (err) {
            // Handle the error, such as sending an error response
            console.error('Error fetching student:', err);
            res.status(500).json({ error: 'Error fetching student' });
            return;
        }

        if (results.length === 0) {
            // If no student is found with the given num, send a not found response
            res.status(404).json({ message: 'Student not found' });
        } else {
            // If a student is found, send the student data as a response
            res.status(200).json(results[0]);
        }
    });
});

// define put call route for update an student
router.put('/updatestudent/:student_num', (req, res) => {
    const student_num = req.params.student_num;
    const { student_name, student_surname, student_section, student_address } = req.body;

    // Define the SQL query to update the students record
    const sqlQuery = 'UPDATE student SET student_name = ?, student_surname = ?, student_section = ?, student_address = ? WHERE student_num = ?';

    // Execute the SQL query with the provided data
    connect.query(
        sqlQuery,
        [student_name, student_surname, student_section, student_address, student_num],
        (err, result) => {
            if (err) {
                console.error('Error updating student:', err);
                res.status(500).json({ error: 'Error updating student' });
                return;
            }

            if (result.affectedRows === 0) {
                // student not found
                res.status(404).json({ message: 'student not found' });
            } else {
                // student updated successfully
                res.status(200).json({ message: 'student updated successfully' });
            }
        }
    );
});
// define delete call route for delete an student
router.delete('/deletestudent/:student_num', (req, res) => {
    const student_num = req.params.student_num;
  
    // Define the SQL query to delete the student record
    const sqlQuery = 'DELETE FROM student WHERE student_num = ?';
  
    // Execute the SQL query with the provided student ID
    connect.query(sqlQuery, [student_num], (err, result) => {
      if (err) {
        console.error('Error deleting student:', err);
        res.status(500).json({ error: 'Error deleting student' });
        return;
      }
  
      if (result.affectedRows === 0) {
        // Employee not found
        res.status(404).json({ message: 'student not found' });
      } else {
        // Employee deleted successfully
        res.status(200).json({ message: 'student deleted successfully' });
      }
    });
  });
module.exports = router


