const jwt = require('jsonwebtoken');

const tokenGenerator = (data) => {
  return new Promise((res, rej) => {
    jwt.sign(data, 'secret', { algorithm: 'HS256', expiresIn: '1d' }, function(err, token) {
      console.log('token : ' + token);
      if (err) {
        throw err;
      }
      res(token);
    });
  });
};

const isValid = (token) => {
  return new Promise((res, rej) => {
    jwt.verify(token, 'secret', (err, decode) => {
      if (err) {
        res({ isValid: false });
      } else {
        const exp = new Date(decode.exp * 1000);
        const now = new Date();
        console.log('exp', exp, 'now', now);
        if (exp < now) {
          res({ isValid: false });
        } else {
          res({ isValid: true, token: token, userData: decode });
        }
      }
    });
  });
};

module.exports = {
  tokenGenerator,
  isValid,
};
