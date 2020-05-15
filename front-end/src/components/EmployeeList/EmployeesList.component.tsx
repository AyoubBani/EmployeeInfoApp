import React from 'react';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';
import {Employee} from '../types';

const useStyles = makeStyles({
  container: {
    marginTop: '0px',
    width: '450px',
  },
  employeeInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});

interface EmployeesListProps {
  employees: Employee[];
  selectEmployee: React.Dispatch<React.SetStateAction<Employee>>;
}
export const EmployeesList: React.FC<EmployeesListProps> = props => {
  const classes = useStyles();
  const {employees, selectEmployee} = props;
  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Employee</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map(employee => (
            <TableRow key={employee.fullName}>
              <TableCell className={classes.employeeInfoContainer} align="right">
                <span> Username: {employee.username}</span>
                <span> Full Name: {employee.fullName}</span>
                <span> Age: {employee.age}</span>
                <span> Sex: {employee.sex}</span>
                <span> Department: {employee.department}</span>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    console.log('setting Employee..');
                    selectEmployee(employee);
                  }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
