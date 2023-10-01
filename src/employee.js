
const express = require('express');
const router = express.Router();
const app = express();
const connect = require('../dbConnection'); // Import the connect object

// Define a POST route for adding an employee
router.post('/addEmployee', (req, res) => {
  const { employee_id, employee_name, employee_address, employee_salary, employee_number } = req.body;

  // Define the SQL query with placeholders
  const sqlQuery = 'INSERT INTO employee (employee_id, employee_name, employee_address, employee_salary, employee_number) VALUES (?, ?, ?, ?, ?)';

  // Execute the SQL query with the provided data
  connect.query(sqlQuery, [employee_id, employee_name, employee_address, employee_salary, employee_number], (err, result) => {
    if (err) {
      // Handle the error, such as sending an error response
      console.error('Error adding employee:', err);
      res.status(500).json({ error: 'Error adding employee' });
      return;
    }

    // If there's no error, send a success response
    res.status(200).json({ message: 'Employee added successfully' });
  });
});

//getemployee
router.get('/getAllEmployees', (req, res) => {
  const sqlQuery = 'SELECT * FROM employee';

  connect.query(sqlQuery, (err, results) => {
    
    if (err) {
      console.error('Error fetching employees:', err);
      res.status(500).json({ error: 'Error fetching employees' });
      return;
    }

    res.status(200).json(results);
  });
});

//get employee by id
router.get('/getEmployee/:employeeId', (req, res) => {
  const employeeId = req.params.employeeId;
  const sqlQuery = 'SELECT * FROM employee WHERE employee_id = ?';

  connect.query(sqlQuery, [employeeId], (err, results) => {
    if (err) {
      console.error('Error fetching employee by ID:', err);
      res.status(500).json({ error: 'Error fetching employee by ID' });
      return;
    }

    if (results.length === 0) {
      // Employee not found
      res.status(404).json({ message: 'Employee not found' });
    } else {
      // Employee found, return the result
      res.status(200).json(results[0]);
    }
  });
});

// Update Employee by ID (PUT Request)
router.put('/updateEmployee/:employeeId', (req, res) => {
  const employeeId = req.params.employeeId;
  const { employee_name, employee_address, employee_salary, employee_number } = req.body;

  // Define the SQL query to update the employee record
  const sqlQuery = 'UPDATE employee SET employee_name = ?, employee_address = ?, employee_salary = ?, employee_number = ? WHERE employee_id = ?';

  // Execute the SQL query with the provided data
  connect.query(
    sqlQuery,
    [employee_name, employee_address, employee_salary, employee_number, employeeId],
    (err, result) => {
      if (err) {
        console.error('Error updating employee:', err);
        res.status(500).json({ error: 'Error updating employee' });
        return;
      }

      if (result.affectedRows === 0) {
        // Employee not found
        res.status(404).json({ message: 'Employee not found' });
      } else {
        // Employee updated successfully
        res.status(200).json({ message: 'Employee updated successfully' });
      }
    }
  );
});

// Delete Employee by ID (DELETE Request)
router.delete('/deleteEmployee/:employeeId', (req, res) => {
  const employeeId = req.params.employeeId;

  // Define the SQL query to delete the employee record
  const sqlQuery = 'DELETE FROM employee WHERE employee_id = ?';

  // Execute the SQL query with the provided employee ID
  connect.query(sqlQuery, [employeeId], (err, result) => {
    if (err) {
      console.error('Error deleting employee:', err);
      res.status(500).json({ error: 'Error deleting employee' });
      return;
    }

    if (result.affectedRows === 0) {
      // Employee not found
      res.status(404).json({ message: 'Employee not found' });
    } else {
      // Employee deleted successfully
      res.status(200).json({ message: 'Employee deleted successfully' });
    }
  });
});

module.exports = router;

