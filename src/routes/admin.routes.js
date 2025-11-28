//((================== Importaciones ==================))\\
import express from 'express'
import auth from '../middlewares/auth.js';
import validateRole from '../middlewares/validateRole.js'


const adminRouter = express.Router(); 

//((================== Ruta unica de administrador ==================))\\
// Ruta que solo puede ser accedida por un usuario con el rol 'admin'
adminRouter.get('/admin', auth, validateRole(['admin']), (req, res) => {
    res.json({ messge: 'Biemvenido al área de administración' });
});


//((================== Ruta admin / editor ==================))\\
// Ruta que puede ser accedida por un usuario con rol 'admin' o 'editor', o otro usuario con permisos.
adminRouter.get('/editor', auth, validateRole(['admin', 'editor']), (req, res) => {
    res.json({ messge: 'Biemvenido al área de edición' });
});

export default adminRouter;