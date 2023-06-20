
import jwt from "jsonwebtoken";


///metodo para verificar el token tanto por cookies y por url
 export const verifyToken =(req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      //jwt.verify(token, process.env.JWT_KEY, (err, decoded)
      jwt.verify(token, "dXNlcm5hbWU", (err, decoded) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Invalid Token..."
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User-login"
      });
    }
  }










// module.exports={
//   checkToken: (req, res, next) => {
//     let token = req.get("authorization");
//     if (token) {
//       // Remove Bearer from string
//       token = token.slice(7);
//       //jwt.verify(token, process.env.JWT_KEY, (err, decoded)
//       verify(token, "dXNlcm5hbWU", (err, decoded) => {
//         if (err) {
//           return res.json({
//             success: 0,
//             message: "Invalid Token..."
//           });
//         } else {
//           req.decoded = decoded;
//           next();
//         }
//       });
//     } else {
//       return res.json({
//         success: 0,
//         message: "Access Denied! Unauthorized User-login"
//       });
//     }
//   }
// };
