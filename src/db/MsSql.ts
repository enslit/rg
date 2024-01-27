// @ts-ignore
import sql from 'mssql';
import { dbConfig } from './config'

export interface IDb {
  connect: () => Promise<void>;
  query: <T>(command: string) => Promise<sql.IResult<T>>;

}
export class MsSqlDb implements IDb {
  private _pool: sql.ConnectionPool | null = null;

  async connect() {
    try {
      this._pool = await sql.connect(dbConfig);
      console.info('sql db connected')
    } catch (exception: any) {
      console.log('failure connect to sql db', exception);
      throw exception
    }
  }

  async query<T>(command: string) {
    if (!this._pool) throw new Error('Database does not connected')

    return await this._pool.query<T>(command)
  }
}
