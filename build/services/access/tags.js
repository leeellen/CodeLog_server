const { Tags, postings_tags } = require('../../database/models');
const handlePromise = require('../helper');
module.exports = {
    getAllTags: () => handlePromise(Tags.findAll()),
    findByName: (tagname) => handlePromise(Tags.findOne({
        where: {
            name: tagname,
        },
    })),
    addAllTags: (tagDatas) => handlePromise(postings_tags.bulkCreate(tagDatas)),
};
