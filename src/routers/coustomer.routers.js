import { Router } from "express";

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
} from "./../controllers/stock.js";

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




router.get('/ok', (req, res) => {
    res.send("120.0.0.13 =>session start");
  });


export default router;