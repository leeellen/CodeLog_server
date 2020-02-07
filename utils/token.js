// const jwt = require('jsonwebtoken');

// const tokenGenerator = (data, callback) => {
//   jwt.sign(data, 'secret', { algorithm: 'HS256', expiresIn: 60 * 60 }, function(err, token) {
//     if (err) {
//       throw err;
//     }
//     callback(token);
//   });
// };

// const isValid = (token, callback) => {
//   jwt.verify(token, 'secret', (err, decode) => {
//     if (err) {
//       callback({ isValid: false });
//     } else {
//       const exp = new Date(decode.exp * 1000);
//       const now = Date.now();
//       // const day = 1000 * 60 * 60 * 24;
//       if (exp < now) {
//         callback({ isValid: false });
//         // } else if (exp < now + 5 * day) {
//         //   console.log("=========Token Helper: Generate New Token")
//         //   const newToken = module.exports.generateToken(decode.user.id);
//         //   callback({ isValid: true, token: newToken, userInfo: decode });
//       } else {
//         // console.log("=========Token Helper: Token is valid")
//         callback({ isValid: true, token: token, userInfo: decode });
//       }
//     }
//   });
// };

// module.exports = {
//   tokenGenerator,
//   isValid,
// };
