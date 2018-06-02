'use strict';

import Vue from 'vue';
import jquery from 'jquery';
window.$ = jquery;
window.jQuery = jquery;
import vueCustomElement from 'vue-custom-element';
import 'document-register-element';
Vue.use(vueCustomElement);

// 他のカスタムタグと併用するなら除外を書く
Vue.config.ignoredElements = [
  'ion-icon',
];

import CsvEntries from '../vue/csv-entries/csv-entries.vue';
Vue.customElement('csv-entries', CsvEntries);

