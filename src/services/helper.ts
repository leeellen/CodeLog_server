export default function handlePromise(promise: Promise<any>) {
  return promise
    .then((res) => {
      if (res instanceof String) {
        return res;
      }
      const data = Array.isArray(res) ? res.map((el) => el.dataValues) : res.dataValues;
      return data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}
