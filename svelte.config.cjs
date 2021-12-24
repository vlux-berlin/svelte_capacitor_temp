const preprocess = require('svelte-preprocess');

const config = {
  preprocess: [
    preprocess({
      typescript: true,
      postcss: true
    })
  ]
};

module.exports = config;
