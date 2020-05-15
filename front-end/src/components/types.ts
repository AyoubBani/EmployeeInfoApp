export type Sex = 'F' | 'M';
export type Department = 'Marketing' | 'Managment' | 'Engineering';
export interface Employee {
  username: string;
  fullName: string;
  sex: Sex;
  age: number;
  department: Department;
}
