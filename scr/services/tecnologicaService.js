import db from '../database';

// Función para agregar un nuevo usuario a la base de datos
export const agregarUsuario = (email, username, passsword, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO usuarios (email, username, passsword) VALUES (?, ?, ?);',
            [email, username, passsword],
            (_, result) => callback(true), 
            (_, error) => {
                console.error(error);
                return callback(false);
            }
        );
    });
};

// Función para obtener todos los usuarios (si es necesario)
export const obtenerUsuarios = (callback) => {
    db.transaction(tx => {
        tx.executesSql(
            'SELECT * FROM usuarios;',
            [],
            (_, { rows }) => callback(rows._array),
            (_, error) => {
                console.error(error);
                return callback([]);
            }
        );
    });
};

// Función para obtener un usuario por email (si es necesario para login)
export const obtenerUsuarioPorEmail = (email, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM usuarios WHERE email = ?;',
            [email],
            (_, { rows }) => callback(rows._array),
            (_, error) => {
                console.error(error);
                return callback([]);
            }
        );
    });
};

// Función para actualizar la contraseña de un usuario
export const actualizarContraseña = (email, nuevaContraseña, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'UPDATE usuarios SET password = ? WHERE email = ?;',
            [nuevaContraseña, email],
            (_, result) => callback(true), // Si la actualización es exitosa
            (_, error) => {
                console.error(error);
                return callback(false); // Si hay un error, callback con false
            }
        );
    });
};