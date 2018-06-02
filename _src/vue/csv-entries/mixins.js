'use strict';

import Sugar from 'sugar';

const mixins = {
  methods: {
    setText(obj) {
      let date = Sugar.Date('now');
      // 05/31/2018 05:11:35 PM
      let basename = obj.title.toLowerCase();
      basename = basename.replace('\/', '_');
      return `AUTHOR: admin
TITLE: ${obj.title}
BASENAME: ${basename}
STATUS: Publish
ALLOW COMMENTS: 1
CONVERT BREAKS: richtext
ALLOW PINGS: 1
DATE: ${date.format('{MM}/{dd}/{yyyy} {hh}:{mm}:{ss} {TT}')}
TAGS: ${obj.tag}
-----
BODY:

-----
EXTENDED BODY:

-----
EXCERPT:

-----
KEYWORDS:
${obj.tag}, ${obj.title}

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
