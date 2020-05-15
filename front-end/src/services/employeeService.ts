import {Employee} from '../components/types';
import {BehaviorSubject} from 'rxjs';

const BASE_URL = 'http://127.0.0.1:5000/employees';

class EmployeesService {
  public employeesData$: BehaviorSubject<Employee>;
  public editEmployee$: BehaviorSubject<Employee>;

  constructor() {
    this.employeesData$ = new BehaviorSubject<Employee>({} as Employee);
    this.editEmployee$ = new BehaviorSubject<Employee>({} as Employee);
  }

  refetch() {
    this.employeesData$ = new BehaviorSubject<Employee>({} as Employee);
    this.editEmployee$ = new BehaviorSubject<Employee>({} as Employee);
    this.fetchEmployeesData();
  }

  fetchEmployeesData() {
    fetch(BASE_URL)
      .then(res => {
        return res.json();
      })
      .then(body => {
        this.employeesData$.next(body);
        this.employeesData$.complete();
      })
      //Handle error
      .catch(err => this.employeesData$.error(err));
  }
  editEmployeeData(employeeData: Employee) {
    const url = `${BASE_URL}/${employeeData.username}`;
    fetch(url, {
      method: 'PUT',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify(employeeData),
    })
      .then(response => response.json())
      .then(body => {
        this.editEmployee$.next(body);
        this.editEmployee$.complete();
      });
  }
}
export default new EmployeesService();
