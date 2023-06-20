import { Router } from "express";
import {verifyToken} from '../auth/token_validation.js';
import {
allStocks,
updateStock,
resStock ,
rest,
insert_productos,
updatecantidad,
allProductos,
compraproductos,
allcompras,
idcompras
} from './../controllers/stock.js';

import {
registrousuario,
allusuario,
login,
logout,
updateusuario

} from './../controllers/auth.js';

const router = Router();

router.get("/Stock", allStocks);
router.put("/updateStock",updateStock);
router.put("/resStock",resStock);
router.get("/res",rest);

///producots
router.post("/productos",insert_productos);
router.put("/updatecantidad",updatecantidad);
router.get("/allproductos",allProductos);

///compras
router.post("/compraproductos",compraproductos);
router.get("/allcompras",allcompras);
router.get("/idcompras",idcompras);

///Users
router.get('/allusuario',verifyToken,allusuario);
router.post("/users",registrousuario)
router.post("/login",login);
router.post("/logout",logout);
router.put("/updateusers",updateusuario)


router.get('/ok', (req, res) => {
    res.send("120.0.0.13 =>session start");
  });





export default router;