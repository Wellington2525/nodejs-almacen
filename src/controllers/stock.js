import {pool} from "../config/db.config.js";
///consulta stock
export const allStocks = async (req,res)=>{
    try {
        const [rows] = await pool.query("select * from stock");
        

        if (rows.length <0) {
            return res.status(404).json({message: "Error en el servicio"});
            
        }
        //res.status(200).json({message: "si"})
        res.json({rows});
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
 
};

//insert articulo


///update cantidad the stock
export const updateStock = async(req,res)=>{
    try {
        let cantidad = req.query.cantidad;
        let id = req.query.id;
        const [result] = await pool.query(`update stock set cantidad = cantidad +'${cantidad}' where id ='${id}' `)
        
        if(result.affectedRows){
            const [stock] = await pool.query(`select cantidad from stock where id ='${id}'`);
            //res.json(stock[0]) 
            return res.status(200).json({message:"success"})
           
        }
      
        res.json(stock[0]) 
              
    } catch (error) {
        return res.status(500).json({message: "Somethin goes wrong"});

   
    }


};
///Restar cantidad stock
export const resStock = async(req, res) => {
    try {
    let cantidad = req.query.cantidad;
    let id = req.query.id;
    let stock2 = 8
    console.log(id,cantidad)
    const [stock] = await pool.query(`select cantidad from stock where id ='${id}'`);
     
    if (cantidad > stock[0].cantidad) {
  
       return res.status(404).json({message: "No tiene suficiente Stock para retirar"})
      //const sql = await pool.query(`update stock set cantidad = cantidad - '${cantidad}' where id ='${id}' `);
     res.json(stock[0]);
         
    } else {
        const sql = await pool.query(`update stock set cantidad = cantidad - '${cantidad}' where id ='${id}' `) 
        const jsopack =res.json(stock[0]); 
        return res.status(200).json({message: "Stock descontado "})
  
    }
        
    } catch (error) {
        return res.status(500).json({message: "Somethin goes wrong"});
    }
    
     

}

export const rest = async (req,res) => {
    try {
        const id = req.query.id;
        const cantidad =4;
        console.log(id);
       const [rows] = await pool.query(`select cantidad from stock where id ='${id}'`);
        if(rows > cantidad){
            //return res.status(404).json({message: "Stock not found"})
           
        }else{
            res.json(rows[0])
        }
       
    } catch (error) {
        return res.status(500).json({message: "Somethin goes wrong"});
        
    }
};



//Insert de productos
export const insert_productos = async (req, res) => {
    try {
        
        const {nombre,descripcion,cantidad,precio} = req.body;
        const insert = await pool.query(`INSERT INTO productos(nombre,descripcion,cantidad,precio) VALUES (?,?,?,?)`,[nombre,descripcion,cantidad,precio])
        if (insert.length < 0) {

            res.status(404).json({message:"Error success"})
            
        }
        res.status(200).json({message: 'success'})
    } catch (error) {
        return res.status(500).json({message: "Somethin goes wrong"});
    }
}

///update cantidad the stock
export const updatecantidad = async(req,res)=>{
    try {
        let cantidad = req.query.cantidad;
        let id = req.query.id;
        const [result] = await pool.query(`update productos set cantidad = cantidad +'${cantidad}' where id ='${id}' `)
        
        if(result.affectedRows){
            const [stock] = await pool.query(`select cantidad from productos where id ='${id}'`);
            //res.json(stock[0]) 
            return res.status(200).json({message:"success"})
           
        }
      
        res.json(stock[0]) 
              
    } catch (error) {
        return res.status(500).json({message: "Somethin goes wrong"});

   
    }


};

export const allProductos = async (req, res, next) => {

    try {
        const [rows] = await pool.query("select * from productos");
        

        if (rows.length <0) {
            return res.status(404).json({message: "Error en el servicio"});
            
        }
        //res.status(200).json({message: "si"})
        res.json({rows});
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }


};

//compra y descuento del producto
export const compraproductos =async (req, res)=>{
    try {
        
    
  let proveedor_id = req.body.proveedor_id;
  let producto_id  = req.body.producto_id;
  let cantidad  = req.body.cantidad;
  let precio_unitario  = req.body.precio_unitario;

  const [stock] = await pool.query(`select cantidad from productos where id =?`, [producto_id]);
  if (cantidad > stock[0].cantidad) {
  
    return res.status(404).json({message: "No tiene suficiente cantidad para retirar"})

      
 } else {
    const inserCompra = await pool.query("INSERT INTO compras (proveedor_id,producto_id,cantidad,precio_unitario) Values (?,?,?,?)", [proveedor_id,producto_id,cantidad,precio_unitario])
    const sql = await pool.query(`update productos set cantidad = cantidad - ? where id =? `,[cantidad, producto_id])

     return res.status(200).json({message: "Stock descontado "})

 }
} catch (error) {
    return res.status(500).json({message: "Somethin goes wrong"});
        
}
};

//allcompras
export const allcompras = async (req, res, next) => {
    try {

    const [rows] = await pool.query("select c.id,c.fecha_compra as Fecha,pv.nombre as Proveedor, prod.nombre as Producto,prod.precio as Precio,c.cantidad, sum(c.cantidad*prod.precio) as Toal from sistventa.compras c inner join  proveedores pv on c.proveedor_id = pv.id inner join productos prod on c. producto_id = prod.id group by c.id,prod.nombre");
        if (rows.length <0) {
            return res.status(404).json({message: "Error en el servicio"});
            
        }
        res.json({rows});
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }


};

//id=compras
export const idcompras = async (req, res, next) => {
    try {
    const {id} = req.body;
    const [rows] = await pool.query("select c.id,c.fecha_compra as Fecha,pv.nombre as Proveedor, prod.nombre as Producto,prod.precio as Precio,c.cantidad, sum(c.cantidad*prod.precio) as Toal from sistventa.compras c inner join  proveedores pv on c.proveedor_id = pv.id inner join productos prod on c. producto_id = prod.id where prod.id=?  group by c.id,prod.nombre",[id]);
        if (rows.length <=0) {
            return res.status(404).json({message: "Compra no found"});
            
        }else{
            res.json({rows});
        }
        
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }


};




