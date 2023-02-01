import preprocess from 'svelte-preprocess';

const config = {
  preprocess: preprocess({
    scss: {
      prependData: "@import 'src/style/vars.scss';"
    }
  })
};

export default config;
