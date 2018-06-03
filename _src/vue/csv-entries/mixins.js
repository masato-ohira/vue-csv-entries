'use strict';

import Sugar from 'sugar';

const mixins = {
  methods: {
    checkEntry(json) {
      if (this.entryStr) {
        if ( this.entryStr.length ) {
          return true;
        } else {
          this.error = true;
          return false;
        }
      } else {
        return false;
      }
    },

    setEntry(obj) {
      let date = Sugar.Date('now');
      // 05/31/2018 05:11:35 PM

      let basename = '';
      if (obj.title) {
        basename = obj.title.toLowerCase();
        basename = basename.replace('\/', '_');
      }

      let setData = (data) => {
        if (data) {
          return data;
        } else {
          return '';
        }
      };

      let setCategory = (data) => {
        if (data) {
          return `PRIMARY CATEGORY: ${data}
CATEGORY: ${data}`;
        } else {
          return '';
        }
      };

      let setTag = (data) => {
        if (data) {
          return `TAGS: ${data}`;
        } else {
          return '';
        }
      };

      return `AUTHOR: admin
TITLE: ${setData(obj.title)}
BASENAME: ${setData(basename)}
STATUS: Publish
ALLOW COMMENTS: 1
CONVERT BREAKS: richtext
ALLOW PINGS: 1
DATE: ${date.format('{MM}/{dd}/{yyyy} {hh}:{mm}:{ss} {TT}')}
${setCategory(obj.category)}
${setTag(obj.tag)}
-----
BODY:
${setData(obj.body)}
-----
EXTENDED BODY:
${setData(obj.extended_body)}
-----
EXCERPT:
${setData(obj.excerpt)}
-----
KEYWORDS:

-----

--------`;
    },

    execCopy(code) {
      let temp = document.createElement('div');
      temp.appendChild(document.createElement('pre')).textContent = code;

      let s = temp.style;
      s.position = 'fixed';
      s.left = '-100%';

      document.body.appendChild(temp);
      document.getSelection().selectAllChildren(temp);

      let result = document.execCommand('copy');
      document.body.removeChild(temp);

      // true なら実行できている falseなら失敗か対応していないか
      if (result) {
        alert('コピーできました');
      } else {
        alert('このブラウザでは対応していません');
      }
    },
  },
};


export default mixins;
