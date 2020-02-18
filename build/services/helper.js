"use strict";
module.exports = (promise) => {
    return promise
        .then((res) => {
        if (typeof res === 'string') {
            return res;
        }
        const data = Array.isArray(res) ? res.map((el) => el.dataValues) : res.dataValues;
        return data;
    })
        .catch((err) => {
        console.log(err);
        return null;
    });
};
