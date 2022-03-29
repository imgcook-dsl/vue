import { IPanelDisplay, IImport } from './interface';
import {
  toString,
  existImport,
  traverse,
  parseLoop,
  parseStyle,
  parseFunction,
  parseProps,
  parseState,
  parseLifeCycles,
  replaceState,
  parseCondition,
  generateCSS,
  genStyleClass,
  parseDataSource,
  isExpression,
  addAnimation,
} from './utils';

import { CSS_TYPE, OUTPUT_TYPE, prettierVueOpt, prettierJsOpt, prettierCssOpt } from './consts';


export default function exportMod(schema, option): IPanelDisplay[] {
  const {
    prettier,
    scale,
    componentsMap,
    folder,
    blocksCount,
    blockInPage,
    dslConfig = {},
    pageGlobalCss,
    _,
  } = option;

  const isExportGlobalFile = dslConfig.globalCss && schema.componentName == 'Page';

  const fileName = schema.fileName;
  const { cssUnit } = dslConfig;
  const rootSchema = schema;

  let folderName;
  let filePathName = 'index';
  if (schema.componentName == 'Page') {
    // schema.fileName = 'App';
    folderName = ''; //('pages/' + schema.fileName);
    filePathName = 'App';
    schema.fileName = 'App';
    // filePathName = schema.fileName
  } else {
    folderName = dslConfig.outputStyle !== OUTPUT_TYPE.PROJECT ? '' : ('components/' + schema.fileName);
  }


  schema.folderName = folderName;

  const cssFileName = `${filePathName}.css`


  // template
  const template: string[] = [];

  // imports
  const imports: IImport[] = [];

  // imports mods
  const importMods: { _import: string, compName: string }[] = [];

  const importStyles: string[] = [];

  // import components
  const components: string[] = []

  // Global Public Functions
  const utils: string[] = [];

  // data
  let datas: string[] = [];

  const constants = {};

  // methods
  const methods: string[] = [];

  const expressionName = {};

  // lifeCycles
  const lifeCycles: string[] = [];

  // styles
  const styles = [];

  // inline style
  const style = {};


  const lifeCycleMap = {
    _constructor: 'created',
    getDerivedStateFromProps: 'beforeUpdate',
    render: '',
    componentDidMount: 'mounted',
    componentDidUpdate: 'updated',
    componentWillUnmount: 'beforeDestroy'
  };

  const width = option.responsive.width || 750;
  const viewportWidth = option.responsive.viewportWidth || 375;

  // 1vw = width / 100
  const _w = width / 100;

  const _ratio = width / viewportWidth;
  let isPage = false;
  if (isExportGlobalFile) {
    importStyles.push(` <style src="./global.css" />`);
  }
  importStyles.push(` <style src="./${cssFileName}" />;`);


  const transformEventName = (name) => {
    return name.replace('on', '').toLowerCase();
  };

  const toString = (value) => {
    if ({}.toString.call(value) === '[object Function]') {
      return value.toString();
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value, (key, value) => {
        if (typeof value === 'function') {
          return value.toString();
        } else {
          return value;
        }
      });
    }

    return String(value);
  };


  // parse function, return params and content
  const parseFunction = (func) => {
    const funcString = func.toString();
    const name = funcString.slice(funcString.indexOf('function'), funcString.indexOf('(')).replace('function ', '');
    const params = funcString.match(/\([^\(\)]*\)/)[0].slice(1, -1);
    const content = funcString.slice(funcString.indexOf('{') + 1, funcString.lastIndexOf('}'));
    return {
      params,
      content,
      name
    };
  };

  // parse layer props(static values or expression)
  const parseProps = (value, isReactNode = false, constantName = '') => {

    if (typeof value === 'string') {
      if (isExpression(value)) {
        if (isReactNode) {
          return value
        } else {
          return value.slice(2, -2);
        }
      }

      if (isReactNode) {
        return value;
      } else if (constantName) {
        // save to constant
        expressionName[constantName] = expressionName[constantName] ? expressionName[constantName] + 1 : 1;
        const name = `${constantName}${expressionName[constantName]}`;
        constants[name] = value;
        return `"constants.${name}"`;
      } else {
        return `"${value}"`;
      }
    } else if (typeof value === 'function') {
      const { params, content, name } = parseFunction(value);
      expressionName[name] = expressionName[name] ? expressionName[name] + 1 : 1;
      methods.push(`${name}_${expressionName[name]}(${params}) {${content}}`);
      return `${name}_${expressionName[name]}`;
    } else {
      return `"${value}"`;
    }
  };

  const parsePropsKey = (key, value) => {
    if (typeof value === 'function') {
      return `@${transformEventName(key)}`;
    } else {
      return `:${key}`;
    }
  };


  // parse condition: whether render the layer
  const parseCondition = (condition, render) => {

    let _condition = isExpression(condition) ? condition.slice(2, -2) : condition;
    if (typeof _condition === 'string') {
      _condition = _condition.replace('this.', '').replace('state.', '');
    }else if(typeof _condition === 'boolean'){
      _condition = String(_condition)
    }

    render = render.trim();
    render = render.replace(/^<\w+\s/, `${render.match(/^<\w+\s/)[0]} v-if="${_condition}" `);
    return render;
  };

  // parse loop render
  const parseLoop = (loop, loopArg, render) => {
    let data;
    let loopArgItem = (loopArg && loopArg[0]) || 'item';
    let loopArgIndex = (loopArg && loopArg[1]) || 'index';

    if (Array.isArray(loop)) {
      data = 'loopData';
      datas.push(`${data}: ${toString(loop)}`);
    } else if (isExpression(loop)) {
      data = loop.slice(2, -2).replace('this.state.', '');
    }
    // add loop key
    const tagEnd = render.indexOf('>');
    const keyProp = render.slice(0, tagEnd).indexOf('key=') == -1 ? `:key="${loopArgIndex}"` : '';
    render = `
      ${render.slice(0, tagEnd)}
      v-for="(${loopArgItem}, ${loopArgIndex}) in ${data}"  
      ${keyProp}
      ${render.slice(tagEnd)}`;

    // remove `this`
    const re = new RegExp(`this.${loopArgItem}`, 'g');
    render = render.replace(re, loopArgItem);

    return render;
  };

  // generate render xml
  const generateRender = (json, isReplace = false) => {
    const type = json.componentName.toLowerCase();
    const className = json.props && json.props.className;
    let classString = json.classString || '';


    if (className) {
      style[className] = parseStyle(json.props.style, {
        scale,
        cssUnit,
      });
    }


    let xml;
    let props = '';

    Object.keys(json.props).forEach((key) => {
      if (['className', 'style', 'text', 'src', 'lines', 'dealGradient'].indexOf(key) === -1) {
        props += ` ${parsePropsKey(key, json.props[key])}=${parseProps(json.props[key])}`;
      }
    });
    switch (type) {
      case 'text':
        const innerText = parseProps(json.props.text, true);
        xml = `<span${classString}${props}>${innerText}</span> `;
        break;
      case 'image':
        let source = parseProps(json.props.src, false);
        if (!source.match('"')) {
          source = `"${source}"`;
          xml = `<img${classString}${props} :src=${source} /> `;
        } else {
          xml = `<img${classString}${props} src=${source} /> `;
        }
        break;

      case 'page':
      case 'block':
      case 'component':
        if (isReplace) {
          const compName = json.fileName;
          xml = `<${compName} />`;
          // 当前是 Page 模块
          const compPath = rootSchema.componentName == 'Page' ? './components' : '..';
          importMods.push({
            _import: `import ${compName} from '${compPath}/${compName}';`,
            compName: compName
          });
          delete style[className]
        } else if (json.children && json.children.length) {
          xml = `<div ${classString} ${props}>${json.children
            .map((node) => {
              return generateRender(node, true);
            })
            .join('')}</div>`;
        } else {
          xml = `<div ${classString} ${props} />`;
        }
        break;
      case 'div':
        if (json.children && json.children.length) {
          xml = `<div ${classString} ${props}>${json.children
            .map((node) => {
              return generateRender(node, true);
            })
            .join('')}</div>`;
        } else {
          xml = `<div ${classString} ${props} />`;
        }
        break;
      default:
        if (json.children && json.children.length) {
          xml = `<div${classString}${props}>${transform(json.children)}</div>`;
        } else {
          xml = `<div${classString}${props} />`;
        }
    }

    if (json.loop) {
      xml = parseLoop(json.loop, json.loopArgs, xml);
    }
    if (json.condition && type !== 'image') {
      xml = parseCondition(json.condition, xml);
    }
    return xml || '';
  };

  // parse schema
  const transform = (schema, flag = false) => {
    if(typeof schema == 'string'){
      return schema
    }
    let result = '';
    if (flag && schema.componentName === 'Page') {
      isPage = true;
    }
    if (Array.isArray(schema)) {
      schema.forEach((layer) => {
        result += transform(layer);
      });
    } else {
      let type = schema.componentName.toLowerCase();
      if (isPage && type === 'block') {
        type = 'div';
      }

      if (['page', 'block', 'component'].indexOf(type) !== -1) {
        // 容器组件处理: state/method/dataSource/lifeCycle/render
        const init: string[] = [];

        if (schema.state) {
          datas.push(`${toString(schema.state).slice(1, -1)}`);
        }

        if (schema.methods) {
          Object.keys(schema.methods).forEach((name) => {
            const { params, content } = parseFunction(schema.methods[name]);
            methods.push(`${name}(${params}) {${content}}`);
          });
        }

        if (schema.dataSource && Array.isArray(schema.dataSource.list)) {
          schema.dataSource.list.forEach((item) => {
            if (typeof item.isInit === 'boolean' && item.isInit) {
              init.push(`this.${item.id}();`);
            } else if (typeof item.isInit === 'string') {
              init.push(`if (${parseProps(item.isInit)}) { this.${item.id}(); }`);
            }
            const parseDataSourceData = parseDataSource(item, imports);
            methods.push(parseDataSourceData.value);
          });

          if (schema.dataSource.dataHandler) {
            const { params, content } = parseFunction(schema.dataSource.dataHandler);
            methods.push(`dataHandler(${params}) {${content}}`);
            init.push(`this.dataHandler()`);
          }
        }

        if (schema.lifeCycles) {
          if (!schema.lifeCycles['_constructor']) {
            lifeCycles.push(`${lifeCycleMap['_constructor']}() { ${init.join('\n')}}`);
          }

          Object.keys(schema.lifeCycles).forEach((name) => {
            const vueLifeCircleName = lifeCycleMap[name] || name;
            const { params, content } = parseFunction(schema.lifeCycles[name]);

            if (name === '_constructor') {
              lifeCycles.push(`${vueLifeCircleName}() {${content} ${init.join('\n')}}`);
            } else {
              lifeCycles.push(`${vueLifeCircleName}() {${content}}`);
            }
          });
        }
        template.push(generateRender(schema));
      } else {
        result += generateRender(schema);
      }
    }
    return result;
  };

  if (option.utils) {
    Object.keys(option.utils).forEach((name) => {
      utils.push(`const ${name} = ${option.utils[name]}`);
    });
  }

  // start parse schema
  transform(schema, true);
  datas.push(`constants: ${toString(constants)}`);
  datas = datas.filter(i=>i!=='');

  let indexValue = `
  <template>
      ${template}
  </template>
  <script>
  ${imports.map((i) => i._import).join('\n')}
  ${importMods.map((i) => i._import).join('\n')}

    export default {
      components: {
        ${importMods.map((i) => i.compName).join(',\n')}
      },
      data() {
        return {
          ${datas.join(',\n')}
        } 
      },
      methods: {
        ${methods.join(',\n')}
      },
      ${lifeCycles.join(',\n')}
    }
  </script>
  
  ${importStyles.join('\n')}
`;

  const prefix = dslConfig.inlineStyle
    ? ''
    : schema.props && schema.props.className;

  // 获取当前 节点 所有 动画参数
  const animationKeyframes = addAnimation(schema);

  const panelDisplay: IPanelDisplay[] = [
    {
      panelName: `${filePathName}.vue`,
      panelValue: prettier.format(indexValue, prettierVueOpt),
      panelType: 'vue',
      folder: folderName,
      panelImports: imports,
    },
  ];

  panelDisplay.push({
    panelName: cssFileName,
    panelValue: prettier.format(
      `${generateCSS(style, prefix)} ${animationKeyframes}`,
      prettierCssOpt
    ),
    panelType: 'css',
    folder: folderName,
  });


  return panelDisplay.map(item=>{
    if( dslConfig.outputStyle == OUTPUT_TYPE.PROJECT ){
      item.folder = 'src/' + item.folder;
    }
    return item
  });
}

