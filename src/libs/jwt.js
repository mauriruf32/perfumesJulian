// src/libs/jwt.js
import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

// Validación adicional
if (!TOKEN_SECRET) {
  console.error("❌ ERROR CRÍTICO: TOKEN_SECRET no está definido");
  throw new Error("Configuración de seguridad incompleta");
}

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          console.error("Error al firmar JWT:", err);
          reject(err);
        }
        resolve(token);
      }
    );
  });
}

// import { TOKEN_SECRET } from "../config.js";
// import jwt from "jsonwebtoken";

// export function createAccessToken (payload) {
//     return new Promise((resolve, reject) =>{
//         jwt.sign(
//             payload,
//             TOKEN_SECRET,
//             {
//                 expiresIn: "1d",
//             },
//             (err, token) => {
//                 if (err) reject(err);
//                 resolve(token);
//             }
//         );
//     });
// }
