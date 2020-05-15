import React, {useEffect, useState} from 'react';
import './App.css';
import {EditEmployee} from '../EditEmployee/EditEmployee.component';
import {EmployeesList} from '../EmployeeList/EmployeesList.component';
import {Employee} from '../types';
import EmployeesService from '../../services/employeeService';
export const DEFAULT_EMPLOYEE: Employee = {
  username: '',
  fullName: '',
  age: 0,
  sex: 'M',
  department: 'Engineering',
};
function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, selectEmployee] = useState<Employee>(DEFAULT_EMPLOYEE);
  const [fetchIsRequired, setFetchIsRequired] = useState<boolean>(true);
  useEffect(() => {
    if (fetchIsRequired) {
      EmployeesService.refetch();
      setFetchIsRequired(false);
    } else {
      EmployeesService.fetchEmployeesData();
      EmployeesService.employeesData$.subscribe((data: any) => {
        setEmployees(data.response);
        if (data.response) {
          selectEmployee(data.response[0]);
        }
        setFetchIsRequired(false);
      });
    }
  }, [fetchIsRequired]);

  const editEmployee = (updatedEmployeeData: Employee) => {
    EmployeesService.editEmployeeData(updatedEmployeeData);
    setFetchIsRequired(true);

    EmployeesService.editEmployee$.subscribe((x: any) => {
      setFetchIsRequired(true);
    });
  };
  return (
    <div className="app-container">
      <EditEmployee employee={selectedEmployee} editEmployee={editEmployee} />
      <EmployeesList employees={employees || []} selectEmployee={selectEmployee} />
    </div>
  );
}

export default App;
