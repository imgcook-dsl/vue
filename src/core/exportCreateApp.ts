import { IPanelDisplay } from './interface';

import { CSS_TYPE, OUTPUT_TYPE, prettierJsOpt, prettierCssOpt, prettierJsonOpt, prettierHtmlOpt } from './consts';


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

  panelValue = `<div id="app"></div>`
  panelDisplay.push({
    panelName: `index.html`,
    panelType: 'html',
    panelValue,
    folder: option.folder || '',
  });

  // index.js
  panelValue = `import Vue from 'vue';
  import App from '${folderName}${fileName}'
  
  Vue.config.productionTip = false
  
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
  })
  `
  panelDisplay.push({
    panelName: `index.js`,
    panelType: 'js',
    panelValue:  prettier.format(panelValue, prettierJsOpt),
    folder: option.folder || '',
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
    "title": "imgcook vue demo",
    "scripts": {
    },
    "devDependencies": {
    },
    "dependencies": {
      "vue": "^2.5.3",
      ...packDependencies
    },
    "browserslist": [
      ">0.2%",
      "not dead",
      "not ie <= 11",
      "not op_mini all"
    ]
  }
  panelValue = JSON.stringify(packageJson, null, 4)
  panelDisplay.push({
    panelName: `package.json`,
    panelType: 'json',
    panelValue:  prettier.format(panelValue, prettierJsonOpt),
    folder: option.folder || '',
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
      folder: option.folder || '',
    });
  }


  return panelDisplay;
}
