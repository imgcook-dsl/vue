import { IPanelDisplay, IDslConfig } from './interface';
import {
  line2Hump,
  transComponentsMap,
  initSchema,
  traverse,
  genStyleClass,
  getGlobalClassNames,
  simpleStyle,
} from './utils';
const camelCase = require('lodash/camelCase');
import { CSS_TYPE, COMPONENT_TYPE, OUTPUT_TYPE, DSL_CONFIG, initConfig } from './consts';

import exportBlock from './exportBlock';
// const exportPage from './exportPage';
import exportCreateApp from './exportCreateApp';
import exportGlobalCss from './exportGlobalCss';

module.exports = function (schema, option) {
  // get blocks json
  const blocks: any[] = [];

  // 参数设置
  option.scale = 750 / ((option.responsive && option.responsive.width) || 750);
  option.componentsMap = transComponentsMap(option.componentsMap);
  option.blockInPage = schema.componentName === 'Page';
  option.pageGlobalCss = schema.css || '';


  const dslConfig = Object.assign(
    {},
    option._.get(schema, 'imgcook.dslConfig')
  );

  dslConfig.useTypescript = dslConfig.jsx === 'typescript'
  option.dslConfig = dslConfig;

  // 初始化全局参数
  initConfig(dslConfig);

  const isExportProject = dslConfig.outputStyle == OUTPUT_TYPE.PROJECT;


  // 仅组件时，只导出一个组件
  if( isExportProject ){
    // 项目模式，兼容没有Page根节点情况
    if(schema.componentName === 'Block'){
      schema = {
        componentName: 'Page',
        className: '',
        props: { style: {}},
        children: [schema],
        css: schema.css || ''
      }
    }
  }else{
    // 组件模式，去除Page
    traverse(schema, (json) => {
      if(json.componentName == 'Block'){
        json.componentName = 'Div'
      }
    });
    schema.componentName = 'Block'
  }

  console.log('schema', schema)

  // clear schema
  initSchema(schema);

  // 记录所有blocks
  traverse(schema, (json) => {
    switch ((json.componentName || '').toLowerCase()) {
      case 'block':
        blocks.push(json);
        break;
    }
  });

  // 样式名处理：指定命名风格
  traverse(schema, (json) => {
    if (json.props && json.props.className) {
      json.props.className = genStyleClass(
        json.props.className,
        dslConfig.cssStyle
      );
    }
  });


  // 精简默认样式
  simpleStyle(schema)

  
  // 提取全局样式，类名数组存于 json.classString , 剩余样式覆盖 style
  traverse(schema, (json) => {
    let className = json.props && json.props.className;
    let classString = '';
    let style = json.props.style;
    if (!className) {
      return
    }

    // inline 
    let classnames: string[] = []
    let enableGlobalCss = dslConfig.globalCss && schema.css

    // 计算全局样式类名
    if (enableGlobalCss) {
      const cssResults = getGlobalClassNames(style, schema.css);
      if (cssResults.names.length > 0) {
        classnames = cssResults.names
      }
      style = cssResults.style;
    }

    if (className) {
      classnames.push(className);
    }
    if (classnames.length > 0) {
      classString = ` class="${classnames.join(' ')}"`;
    }

    json.props.style = style;
    json.classString = classString;
  });

  option.blocksCount = blocks.length;

  // export module code
  let panelDisplay: IPanelDisplay[] = [];

  const panelImports = []

  blocks.length > 0 &&
    blocks.forEach((block) => {
      const result = exportBlock(block, option);
      panelDisplay = panelDisplay.concat(result);
    });
  // export Page code
  if (schema.componentName === 'Page') {
    const result = exportBlock(schema, option);
    panelDisplay = panelDisplay.concat(result);
  }


  if (dslConfig.outputStyle == OUTPUT_TYPE.PROJECT) {
    // 依赖 package.json
    const dependencies = {};
    for (let item of panelDisplay) {
      if (item.panelImports && item.panelImports.length > 0) {
        for (let pack of item.panelImports) {
          dependencies[pack.package] = pack.version || '*'
        }
      }
    }

    // 项目文件
    panelDisplay = panelDisplay.concat(exportCreateApp(schema, { ...option, dependencies }));
  }



  // 全局样式
  panelDisplay = panelDisplay.concat(exportGlobalCss(schema, option));


  return {
    panelDisplay,
    imagesFolder: isExportProject ? 'src/': '',
    noTemplate: true,
  };
};
