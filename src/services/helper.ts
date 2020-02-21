module.exports = async (promise: Promise<any>) => {
  try {
    const res = await promise;

    if (typeof res === 'string') {
      return res;
    }
    if (res === null) {
      return null;
    }

    const data = Array.isArray(res) ? res.map((el) => el.dataValues) : res.dataValues;

    return data;
  } catch (err) {
    console.log(err);

    return null;
  }
};
