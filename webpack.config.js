'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/js'
  },
  watch: true,

  devtool: "source-map",

  module: {
    rules: [ // первое правило для модулей
      {
        test: /\.js$/,  // берем файлы с расширением js
        exclude: /(node_modules|bower_components)/, // откуда мы берем плагин или модуль - из папки node_modules 
        use: { // как именно нужно использовать тот или иной плагин
          loader: 'babel-loader?optional[]=runtime', // loader это плагин который подключается во время работы webpack и что то делает (используем babel-loader)
          options: { // его настройки
            presets: [ // чтобы не указывать все настройки существуют пресеты
              ["@babel/env", { // - самый рекомендованный пресет// вот  его настройки
                targets: { // те браузеры которые мы хотим поддерживать вн ашем проекте
                  edge: "17", // название броузера и версия в формате ключ значение (на babel странице preset/env )
                  firefox: "60",
                  chrome: "67",
                  safari: "11.1",
                  ie: "11"
                }
              }]
            ],
            plugins: ["es6-promise"] // вставляем наш плагин и убираем кавычки теперь этот плагин будет включаться во время работы webpack
          }
        }
      }
    ]
  }
};
