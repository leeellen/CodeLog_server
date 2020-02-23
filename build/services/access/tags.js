const { Tags, postings_tags, companies_tags } = require('../../database/models');
const { handlePromise } = require('../helper');
module.exports = {
    getPTTags: () => handlePromise(Tags.findAll({
        where: {
            type: 'stack',
        },
    })),
    getCTTags: () => handlePromise(Tags.findAll({
        where: {
            type: 'company',
        },
    })),
    findByName: (tagname) => handlePromise(Tags.findOne({
        where: {
            name: tagname,
        },
    })),
    deleteByPostId: (post_id) => handlePromise(postings_tags.destroy({
        where: {
            post_id,
        },
    })),
    deleteByCompanyId: (company_id) => handlePromise(companies_tags.destroy({
        where: {
            company_id,
        },
    })),
    addPTTags: (tagDatas) => handlePromise(postings_tags.bulkCreate(tagDatas)),
    addCTTags: (tagDatas) => handlePromise(companies_tags.bulkCreate(tagDatas)),
};
