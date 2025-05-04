import db from '../database';
export const agragrTecnologia = (name, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO tecnologias (name) VALUES (?);',
            [name],
            (_, result) => callback(true),
            (_, error) => {
                console.error(error);
                return callback(false);
            }
        );
    });
};

export const obtenerTecnologias = (callback) => {
    db.transaction(tx => {
        tx.executesSql(
            'SELECT * FROM tecnologias;',
            [],
            (_, { rows }) => callback(rows_array),
            (_, error) => {
                console.error(error);
                return callback([]);
            }
        );
    });
};
