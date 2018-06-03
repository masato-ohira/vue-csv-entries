<template lang='pug'>
.v-csv-entries
  section.columns
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
        .level-right(v-if="checkEntry()")
          a.button.is-outlined.is-info(
            @click="entrySelect()"
          ) 全て選択する
      .v-csv-entries__result.box(ref="result")
        p(v-if="loading") 変換中...
        pre(
          v-for="i in entryStr"
          v-html="setEntry(i)"
        )

  CsvEntriesSample(:entries="entryStr")

</template>
<script>
import mixins from './mixins.js';
import csv from 'csvtojson';
import CsvEntriesSample from './csv-entries-sample.vue';

export default {
  mixins: [mixins],
  components: {
    CsvEntriesSample,
  },
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

    entrySelect() {
      const self = this;
      let range = document.createRange();
      range.selectNodeContents(self.$refs.result);
      let selection = window.getSelection();
      selection.removeAllRanges();
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
