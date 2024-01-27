import dayjs, { Dayjs } from 'dayjs'; 

interface SelectEmployeeLogsArgs {
  employeeId: string;
  start: Dayjs; // 2021-05-27 00:00:00 
  end: Dayjs; // 2021-05-27 00:00:00
}

const SQL_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export const selectEmployeeLogs = ({ employeeId, start, end }: SelectEmployeeLogsArgs) => {
  const startFormatted = start.format(SQL_DATE_TIME_FORMAT)
  const endFormatted = end.format(SQL_DATE_TIME_FORMAT);

  return `SELECT [Log].[_id] as LogId
      ,[DateTime]
      ,[LogMessageType]
      ,[LogMessageSubType]
      ,[Message]
      ,[Details]
  FROM [dbo].[Log]
  JOIN [dbo].[Employee] ON Employee._id=Log.EmployeeID
  WHERE [Employee].[_id] = '${employeeId}' AND DateTime > '${startFormatted}' AND DateTime < '${endFormatted}'`
}
