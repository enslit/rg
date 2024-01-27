import { MsSqlDb } from './MsSql';

export const createDbConnection = async () => {
  const db = new MsSqlDb();
  await db.connect();

  return db;
}
