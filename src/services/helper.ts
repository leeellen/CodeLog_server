module.exports = {
  handlePromise: async (promise: Promise<any>) => {
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
  },

  handlePostData: (postData: any) => {
    postData.theme = postData.Type.name;
    delete postData.Type;

    let cobj: any = {};
    for (let content of postData.Contents) {
      cobj[content.Subtitle.name] = content.body;
    }
    postData.content = cobj;
    delete postData.Contents;

    let tagArr: any = [];
    for (let ptcon of postData.postings_tags) {
      tagArr.push(ptcon.Tag.name);
    }
    postData.selected_tags = tagArr;
    delete postData.postings_tags;

    return postData;
  },

  handlePostDatas: (postDatas: any) => {
    return postDatas.map((postData: any) => {
      postData.theme = postData.Type.name;
      delete postData.Type;

      let cobj: any = {};
      for (let content of postData.Contents) {
        cobj[content.Subtitle.name] = content.body;
      }
      postData.content = cobj;
      delete postData.Contents;

      let tagArr: any = [];
      for (let ptcon of postData.postings_tags) {
        tagArr.push(ptcon.Tag.name);
      }
      postData.selected_tags = tagArr;
      delete postData.postings_tags;

      return postData;
    });
  },

  handleCompanyData: (companyData: any) => {
    let ctagArr: any = [];
    for (let ctag of companyData.companies_tags) {
      ctagArr.push(ctag.Tag.name);
    }
    companyData.company_tags = ctagArr;
    delete companyData.companies_tags;

    return companyData;
  },

  handleCompanyDatas: (companyDatas: any) => {
    return companyDatas.map((companyData: any) => {
      let ctagArr: any = [];
      for (let ctag of companyData.companies_tags) {
        ctagArr.push(ctag.Tag.name);
      }
      companyData.company_tags = ctagArr;
      delete companyData.companies_tags;

      return companyData;
    });
  },

  handleTagDatas: (Tags: any) => {
    let obj: any = {};
    Tags.map((tag: any) => {
      tag.Tag.dataValues.postings_tags.map((post: any) => {
        if (post.Posting.user_id in obj) {
          obj[post.Posting.user_id]++;
        } else {
          obj[post.Posting.user_id] = 1;
        }
      });
    });
    console.log(obj);
    return Object.entries(obj).sort((a, b) => b[1] - a[1]);
  },
};
