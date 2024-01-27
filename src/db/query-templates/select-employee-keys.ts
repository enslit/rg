
const query = `SELECT 
  Employee.FirstName, 
  Employee.SecondName, 
  Employee.LastName, 
  AcsKey2EmployeeAssignment.AcsKeyId, 
  AcsKeys.Description 
FROM 
  AcsKeys, 
  Employee, 
  AcsKey2EmployeeAssignment 
WHERE 
  Employee._id = AcsKey2EmployeeAssignment.EmployeeId 
  AND AcsKey2EmployeeAssignment.AcsKeyId = AcsKeys.KeyNumber 
  AND Employee.IsRemoved = 'false'
  AND Employee.IsLocked = 'false'`;
