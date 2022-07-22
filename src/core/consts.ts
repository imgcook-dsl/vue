import { IPanelDisplay, IDslConfig } from './interface';

export const prettierVueOpt = {
  parser: 'vue',
  printWidth: 80,
  singleQuote: true
};

export const prettierJsOpt = {
  parser: 'babel',
  printWidth: 120,
  singleQuote: true,
};
export const prettierCssOpt = {
  parser: 'css',
};

export const prettierJsonOpt = {
  parser: 'json',
};


export const prettierHtmlOpt = {
  parser: 'html',
  printWidth: 120,
  singleQuote: true
};


export const prettierMarkDownOpt = {
  parser: 'md'
};


export const CSS_TYPE = {
  MODULE_CLASS: 'module',
  MODULE_STYLE: 'module_style',
  IMPORT_CLASS: 'import',
  INLINE_CSS: 'inline',
}

export const COMPONENT_TYPE = {
  HOOKS: 'hooks',
  COMPONENT: 'component',
}

export const OUTPUT_TYPE = {
  PROJECT: 'project',
  COMPONENT: 'component',
}


// 记录全局参数配置，初始化时直接修改
export let DSL_CONFIG: IDslConfig = {
  scale: 1,
  globalCss: true,
  cssUnit: 'px',
  outputStyle: 'component',
  cssStyle: 'camelCase',
  htmlFontSize: 16
};


export const initConfig = (cfg) => {
  DSL_CONFIG = Object.assign(DSL_CONFIG, cfg)
}

