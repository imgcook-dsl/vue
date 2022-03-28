import { IPanelDisplay } from './interface';

import { prettierJsOpt, prettierMarkDownOpt, prettierJsonOpt, prettierHtmlOpt } from './consts';


export default function exportCreateApp(schema, option): IPanelDisplay[] {
  const fileName = schema.fileName;
  const folderName = schema.componentName == 'Page' ? './': './components/';
  const {
    dependencies,
    dslConfig,
    _,
    prettier
  } = option;

  let panelValue = '';
  const panelDisplay: IPanelDisplay[] = [];

  panelValue = `<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
`
  panelDisplay.push({
    panelName: `index.html`,
    panelType: 'html',
    panelValue,
    folder: '/public',
  });

  // index.js
  panelValue = `
  import { createApp } from 'vue'
  import App from '${folderName}${fileName}'
  
  createApp(App).mount('#app')
  `
  panelDisplay.push({
    panelName: `main.js`,
    panelType: 'js',
    panelValue:  prettier.format(panelValue, prettierJsOpt),
    folder: '/src',
  });

  // index.css
  // panelValue = `$vue-blue: #32485F;
  // $vue-green: #00C185;`
  // panelDisplay.push({
  //   panelName: `variable.scss`,
  //   panelType: 'css',
  //   panelValue:  prettier.format(panelValue, prettierCssOpt),
  //   folder: option.folder || '',
  // });



  // dependencies
  let packDependencies = dependencies;


  // package.json
  const packageJson = {
    "title": "imgcook vue",
    "version": "0.0.1",
    "scripts": {
      "serve": "vue-cli-service serve",
      "build": "vue-cli-service build"
    },
    "dependencies": {
      "core-js": "^3.6.5",
      "vue": "^3.0.0",
      ...packDependencies
    },
    "devDependencies": {
      "@vue/cli-plugin-babel": "~4.5.15",
      "@vue/cli-plugin-eslint": "~4.5.15",
      "@vue/cli-service": "~4.5.15",
      "@vue/compiler-sfc": "^3.0.0",
      "babel-eslint": "^10.1.0",
      "eslint": "^6.7.2",
      "eslint-plugin-vue": "^7.0.0"
    },
    "eslintConfig": {
      "root": true,
      "env": {
        "node": true
      },
      "extends": ["plugin:vue/vue3-essential", "eslint:recommended"],
      "parserOptions": {
        "parser": "babel-eslint"
      },
      "rules": {}
    }
  }
  panelValue = JSON.stringify(packageJson, null, 4)
  panelDisplay.push({
    panelName: `package.json`,
    panelType: 'json',
    panelValue:  prettier.format(panelValue, prettierJsonOpt),
    folder: '',
  });


  if (dslConfig.useTypescript) {
    panelValue = `{
      "compilerOptions": {
        "target": "es5",
        "lib": [
          "dom",
          "dom.iterable",
          "esnext"
        ],
        "allowJs": true,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "noFallthroughCasesInSwitch": true,
        "module": "esnext",
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx"
      },
      "include": [
        "src"
      ]
    }
     `
    panelDisplay.push({
      panelName: `tsconfig.json`,
      panelType: 'json',
      panelValue:  prettier.format(panelValue, prettierJsonOpt),
      folder:  '',
    });
  }

  const readme = `# vue3-demo
## Project setup
\`\`\`
npm install
  \`\`\`

### Compiles and hot-reloads for development
  \`\`\`
npm run serve
  \`\`\`

### Compiles and minifies for production
  \`\`\`
npm run build
  \`\`\`

### Lints and fixes files
  \`\`\`
npm run lint
  \`\`\`

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
`

  panelDisplay.push({
    panelName: `README.md`,
    panelType: 'md',
    panelValue:  prettier.format(readme, prettierMarkDownOpt),
    folder: '',
  });


  panelDisplay.push({
    panelName: `babel.config.js`,
    panelType: 'js',
    panelValue:  prettier.format(`module.exports = {
      presets: [
        '@vue/cli-plugin-babel/preset'
      ]
    }`, prettierJsOpt),
    folder: '',
  });

  

  return panelDisplay;
}
