const asyncHandler = require('express-async-handler');

const { companies, users } = require('../../services');

module.exports = {
  post: asyncHandler(async (req, res) => {
    const { code, coperate_name, ispartner, business_name, eid, homepage, member } = req.body;
    const { position, email, username, password } = member;

    let result = await companies.create(
      code,
      coperate_name,
      '',
      ispartner,
      business_name,
      eid,
      homepage,
    );
    if (!result.success) {
      res.status(409).send('Company already exists');
      return;
    }
    const companyid = result.payload.id;

    const userResult = await users.create(email, username, password, companyid, position, '', '');
    if (!userResult.success) {
      res.status(404).send("There's an error while creating user");
      return;
    }

    res.status(200).send('Company successfully created!');
  }),
};
