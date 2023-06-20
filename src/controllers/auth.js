import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {pool} from "../config/db.config.js";


//allusuario
export const allusuario = async (req,res)=>{
    try {

    
        const [rows] = await pool.query("select id, nombre, usuario,password,std,departamento from users");
        

        if (rows.length <0) {
            return res.status(404).json({message: "Error en el servicio"});
            
        }

       
        res.json({rows});

    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
 
};




///Insert usuario
export const registrousuario = async (req, res)=>{

    try {

        const nombre  = req.body.nombre;
        const usuario = req.body.usuario;
        const password = req.body.password = bcrypt.hashSync(req.body.password,10);
        const std = req.body.std;
        const departamento = req.body.departamento;
        //const {nombre,usuario,password,std,departamento} = req.body;
          const [existUsuario] = await pool.query(`SELECT usuario FROM users where usuario=?`,[usuario])
        if(existUsuario.length >0){
                            
           return res.status(409).json({error: "Usuario ya existe"});

        }else{
         
            const insertuSuario = await pool.query("INSERT INTO users(nombre, usuario,password,std,departamento) Value (?,?,?,?,?)",[nombre,usuario,password,std,departamento])
        
         return   res.status(200).json({message:"Succes"});
        }
        //res.status(200).json({message:"Success"});
        
    

    } catch (error) {
        return res.status(500).json({message:"Somethin goes wrong"})
        
    }

}


//update usuario
export const updateusuario =async(req, res)=>{
    
    try {
        const id = req.body.id;
        const nombre  = req.body.nombre;
        const usuario = req.body.usuario;
        const password = req.body.password = bcrypt.hashSync(req.body.password,10);
        const std = req.body.std;
        const departamento = req.body.departamento;
        //const {nombre,usuario,password,std,departamento} = req.body;
        console.log(id)
        const updateSuario = await pool.query("UPDATE users SET nombre=?,usuario=?,password=?,std=?,departamento=? WHERE id=?    ",[nombre,usuario,password,std,departamento, id])
     
        return   res.status(200).json({message:"Update exitoso"});
        
        //res.status(200).json({message:"Success"});
        
    

    } catch (error) {
        return res.status(500).json({message:"Somethin goes wrong"})
        
    }


}


//Login
export const login =async (req, res)=>{
    //const {usuario, password} = req.body;

    const usuario = req.body.usuario;
    const password = req.body.password;
  
    const [rows] = await pool.query("SELECT * FROM users where usuario=?",[usuario]);
    if(rows.length > 0){
   
        
        const user = rows[0];
      
        const validPassword = await bcrypt.compareSync(password, user.password)
      
        if (validPassword) {

            const token = jwt.sign({username: user.username}, 'dXNlcm5hbWU',{
                expiresIn: '1h',

            });
            
            res.cookie("access_token", token,{
                httpOnly: true,
                
            }).status(200).json({success:"Wellecome  users " + user.usuario, token})
            //return res.status(200).json({success:"Wellecome  users " + user.usuario, token});
            
        }

        
        
        
        else{
            return res.status(401).json({error:"Incorrect Password"});
        }
    }else{
        return res.status(404).json({error:"User not found!"});
    }
   

}



//token verification middware

///logon
export const logout =(req,res)=>{
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out");
}