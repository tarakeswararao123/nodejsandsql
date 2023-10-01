DROP TABLE IF EXISTS employee;

CREATE TABLE employee (
    'employee_id' INT NOT NULL AUTO_INCREMENT,
    'employee_name' VARCHAR(99) NOT NULL,
    'employee_address' VARCHAR(99) NOT NULL,
    'employee_salary' DECIMAL(10, 2) NOT NULL, --Assuming salary is a numeric value
    PRIMARY KEY (employee_id)
);

ALTER TABLE employee
ADD COLUMN employee_number INT;

ALTER TABLE employee
MODIFY COLUMN employee_number BIGINT;

CREATE TABLE student(
    'student_num' INT NOT NULL AUTO_INCREMENT,
    'student_name' VARCHAR(99) NOT NULL, 
    'student_surname' VARCHAR(99) NOT NULL,
    'student_section' VARCHAR(99) NOT NULL,
    'student_address' VARCHAR(99) NOT NULL,
)