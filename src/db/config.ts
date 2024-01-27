export const dbConfig = {
    user: 'sa',
    password: 'Fyyukdt4326GFR',
    server: '192.168.8.7\\RUSGUARD',
    database: 'RusGuardDB',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
}
