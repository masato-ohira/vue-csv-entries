<template lang='pug'>
section.columns
  .column.is-6
    p.title.is-6 サンプルCSV
    table.table.is-bordered.is-fullwidth
      thead
        tr
          th title
          th tag
          th body
      tbody
        tr(v-for="i in [1,2,3,4,5]")
          td EntryTitle{{ i }}
          td TagName {{ i }}
          td Content {{ i }}
</template>
<script>
import Sugar from 'sugar';
export default {
  props: ['entries'],
  methods: {
    checkEntry() {
      if (this.entries) {
        if ( this.entries.length ) {
          return true;
        } else {
          this.error = true;
          return false;
        }
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang='sass'></style>
