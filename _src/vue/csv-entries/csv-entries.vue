<template lang='pug'>
.v-csv-entries
  .columns
    .column
      .level.mb-sm
        .level-left
          label.label CSVからここにペーストしてください
        .level-right(v-if="error")
          p.has-text-danger
            | 正しい値が入力されていません
      textarea.textarea(v-model="csvStr")
    .v-csv-entries__btns.column.is-1
      a.button.is-fullwidth.is-link(
        @click="csv2entry()"
      )
        span 変換
        ion-icon(name="arrow-forward")
      a.button.is-fullwidth.is-danger(
        @click="boxClear()"
      )
        span クリア
        ion-icon(name="close")
    .column
      .level.mb-sm
        .level-left
          label.label MTインポート形式
        .level-right(v-if="entryStr")
          a.button.is-outlined.is-info(
            @click="entryCopy()"
          ) テキストを選択する
      .v-csv-entries__result.box(ref="result")
        p(v-if="loading") 変換中...
        pre(
          v-for="i in entryStr"
          v-html="setText(i)"
        )

</template>
<script>
import Sugar from 'sugar';
import mixins from './mixins.js';
import csv from 'csvtojson';

export default {
  mixins: [mixins],
  data() {
    return {
      csvStr: null,
      entryStr: null,
      loading: false,
      error: false,
    };
  },
  mounted() {
    console.log(this);
  },
  methods: {
    csv2entry() {
      if ( this.csvStr ) {
        this.error = false;
        this.loading = true,
        csv({
          // noheader: true,
          delimiter: 'auto',
          output: 'json',
        })
        .fromString(this.csvStr)
        .then((jsonObj) => {
          console.log(jsonObj);
          this.loading = false,
          this.entryStr = jsonObj;
        });
      } else {
        this.error = true;
      }
    },

    entryCopy() {
      const self = this;
      // let code = $(self.$refs.result).text();

      // Rangeオブジェクトの取得
      let range = document.createRange();
      // 範囲の指定
      range.selectNodeContents(self.$refs.result);

      // Selectionオブジェクトを返す。ユーザが選択した範囲が格納されている
      let selection = window.getSelection();
      // 選択をすべてクリア
      selection.removeAllRanges();
      // 新規の範囲を選択に指定
      selection.addRange(range);
    },

    boxClear() {
      this.error = false;
      this.csvStr = null;
      this.entryStr = null;
    },
  },
};
// csv({output:"line"})
// .fromString(csvStr)
// .subscribe((csvLine)=>{
//     // csvLine =>  "1,2,3" and "4,5,6"
// })
</script>
