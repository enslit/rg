import { Dayjs } from "dayjs";
import { Employee, Log } from "./types";
import { IDb } from "./MsSql";
import { selectEmployee } from "./query-templates/select-employee";
import { selectEmployeeLogs } from "./query-templates/select-logs";
import { LogByDate, clearLogs } from "../utils/clearLogs";

interface IDbService {
  getEmployee: (args: { id: string }) => Promise<Employee>; 
  getEmployeeLogsByDate: (args: { employeeId: string; start: Dayjs; end: Dayjs }) => Promise<LogByDate[]>;
}

export class DbService implements IDbService {
  constructor (private readonly db: IDb) {}

  async getEmployee({ id }: { id: string }) {
    const command = selectEmployee({ where: { _id: id }});
    console.log('command', command)
    const employee = await this.db.query<Employee>(command);

    if (employee.recordset.length < 1) throw new Error(`Employee with id ${id} not found`)

    return employee.recordset[0];
  }

  async getEmployeeLogsByDate(args: { employeeId: string; start: Dayjs; end: Dayjs }): Promise<LogByDate[]> {
    const command = selectEmployeeLogs(args) 
    const logs = await this.db.query<Log>(command)

    return clearLogs(logs.recordset);
  }
}
