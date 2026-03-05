import { employee } from '../models/employee.model';

export type EmployeeSocketEvent =
  | { type: 'EMPLOYEE_CREATED'; employee: employee }
  | { type: 'EMPLOYEE_DELETED'; id: number }
  | { type: 'EMPLOYEE_UPDATED'; employee: employee };