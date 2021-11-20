
export interface IPanelDisplay {
  panelName: string;
  panelValue: string;
  panelType: string;
  folder?: string;
  panelImports?: IImport[]
}

export interface IImport {
  _import: string;
  package: string;
  version: string;
}

export interface IDslConfig {
  globalCss: boolean;
  cssUnit: 'px' | 'vw' | 'rpx' | 'rem';
  outputStyle: 'project' | 'component';
  cssStyle: 'kebabCase' | 'camelCase' | 'snakeCase',
  htmlFontSize: number
}