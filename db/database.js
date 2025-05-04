import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabaseAsync('app.db');

export const initDB = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXIST tecnologias (id INTEGER PRIMARY KEY AUTOINCREMEN, name TEXT NOT NULL );'
        );
    });
};

export default db;
