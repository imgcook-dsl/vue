module.exports = function(layoutData, opts) {
  let renderData = {};
  const { _, helper } = opts;
  const { printer, utils } = helper;
  const _line = utils.line;

  const COMPONENT_TYPE_MAP = {
    link: 'a',
    video: 'video',
    expview: 'div',
    scroller: 'div',
    slider: 'div',
    view: 'div',
    text: 'span',
    picture: 'img'
  };

  // 事件方法名称转换
  const EVENT_NAME_MAP = {
    init: 'beforeCreate',
    destroy: 'beforeDestroy'
  };

  // 事件绑定名称转换
  const EVENT_MAP = {
    onClick: 'click'
  };

  // 需要删除的属性
  const DELETE_STYLE = ['lines'];

  // 样式过滤
  if (helper.clearInheritedAttr) {
    layoutData = helper.clearInheritedAttr(layoutData, true);
  }

  let modConfig = layoutData.modStyleConfig || {
    designWidth: 750
  };
  let viewportWidth = modConfig.viewportWidth || 375;
  let designWidth = modConfig.designWidth;
  let htmlFontsize = viewportWidth ? viewportWidth / 10 : null;

  let dslMessage = genertePartJson(layoutData);
  renderData = {
    template: printer(dslMessage._rXML),
    mockDataScript: printer(dslMessage._rMockData),
    script: printer(dslMessage._rScript),
    style: printer(dslMessage._rStyle)
  };

  let vuejs = printer([
    _line('<template>', { indent: { tab: 0 } }),
    ...dslMessage._rXML,
    _line('</template>', { indent: { tab: 0 } }),
    _line('', { indent: { tab: 0 } }),
    _line('<script>', { indent: { tab: 0 } }),
    ...dslMessage._rMockData,
    ...dslMessage._rScript,
    _line('</script>', { indent: { tab: 0 } }),
    _line('<style scoped>', { indent: { tab: 0 } }),
    ...dslMessage._rStyle,
    _line('</style>', { indent: { tab: 0 } })
  ]);

  let vuejs4rem = printer([
    _line('<template>', { indent: { tab: 0 } }),
    ...dslMessage._rXML,
    _line('</template>', { indent: { tab: 0 } }),
    _line('', { indent: { tab: 0 } }),
    _line('<script>', { indent: { tab: 0 } }),
    ...dslMessage._rMockData,
    ...dslMessage._rScript,
    _line('</script>', { indent: { tab: 0 } }),
    _line('<style scoped>', { indent: { tab: 0 } }),
    ...dslMessage._rRemStyle,
    _line('</style>', { indent: { tab: 0 } })
  ]);

  return {
    renderData: renderData,
    xml: renderData.template,
    style: renderData.style,
    prettierOpt: {},
    panelDisplay: [
      {
        panelName: 'index.vue',
        panelValue: vuejs,
        panelType: 'BuilderRaxIndex'
      },
      {
        panelName: 'index.rem.vue',
        panelValue: vuejs4rem,
        panelType: 'BuilderRaxStyle'
      }
    ],
    playground: {
      info: '前往vue playground',
      link: 'http://jsplayground.net/vueplayground',
      // sourceCode: vuejs,
      // playgroundDslName: 'vue',
      mobilePreviewUrl: 'http://jsplayground.net/bundle/{uuid}/vuebundle.html'
    },
    noTemplate: true
  };

  /**
   * @desc 生成所有文档生成相关的信息
   * @param originJson originJson
   * @return Object 所有文档相关的信息
   */
  function genertePartJson(originJson) {
    let mockDataStore = {};
    let methodsFunction = [];
    let computedFunction = [];
    let lifeCycleFunction = [];
    let cssStore = [];

    const getScriptStore = originJson => {
      return originJson.eventStore && originJson.scriptStore
        ? (originJson.eventStore || []).map(v => {
            const contentStore = (originJson.scriptStore || []).find(
              _v => _v.id === v.scriptId
            );
            return {
              belongId: v.belongId,
              content: contentStore.content,
              eventType: v.type,
              scriptName: contentStore.name
            };
          })
        : originJson.scriptStore || [];
    };
    let scriptsStore = getScriptStore(originJson);
    let scriptsStoreMap = {};
    scriptsStore.forEach(v => {
      scriptsStoreMap[v.belongId] = v;
    });

    let dataBindingStore = originJson.dataBindingStore || [];
    let dataBindingStoreMap = {};
    dataBindingStore.forEach(v => {
      dataBindingStoreMap[v.belongId] = v;
    });

    let _rXML = generateXML(originJson, {
      indent: 1,
      eventsOn: true
    });

    let mockDataOptions = generateMockData(mockDataStore);
    let _rMockData =
      Object.keys(mockDataOptions).length > 0
        ? helper.parser(
            `const mockData = ${JSON.stringify(mockDataOptions, null, 2)};`
          )
        : [];

    let _rScript = generateScript(originJson, {
      indent: 0,
      eventsOn: true
    });

    // 同名样式去重
    let cssNameMap = {};
    cssStore = cssStore.filter(v => {
      if (cssNameMap[v.styleName]) {
        return false;
      } else {
        cssNameMap[v.styleName] = true;
        return true;
      }
    });
    let { _rStyle, _rRemStyle } = generateStyle(cssStore, {
      indent: 0
    });

    return {
      _rXML,
      _rMockData,
      _rScript,
      _rStyle,
      _rRemStyle
    };

    /**
     * @desc 根据cssStore生成rax的style
     * @param cssStore 存储css的数组
     * @return result css的partsJson
     */
    function generateStyle(cssStore) {
      let result = [];
      let remResult = [
        _line(
          `/* 视觉稿宽度为 ${designWidth}, 请设置html的font-size为 ${htmlFontsize}px, 以便在布局视口宽度为 ${viewportWidth} 的页面中自适应 */`
        )
      ];
      cssStore.map((v, i) => {
        let styleCssLine = [];
        let styleRemCssLine = [];
        for (let _o in v.styleValue) {
          if (DELETE_STYLE.indexOf(_o) == -1) {
            let cssLineString = `${_.kebabCase(_o)}: ${cssValue(
              _o,
              v.styleValue[_o]
            )};`;
            styleCssLine.push(_line(cssLineString, { indent: { tab: 1 } }));
            if (htmlFontsize) {
              let cssLineRemString = `${_.kebabCase(_o)}: ${cssValue(
                _o,
                v.styleValue[_o],
                htmlFontsize
              )};`;
              styleRemCssLine.push(
                _line(cssLineRemString, { indent: { tab: 1 } })
              );
            }
          }
        }
        result = result.concat(
          _line(`.${v.styleName} {`),
          styleCssLine,
          _line('}')
        );
        if (styleRemCssLine.length > 0) {
          remResult = remResult.concat(
            _line(`.${v.styleName} {`),
            styleRemCssLine,
            _line('}')
          );
        }
      });
      return {
        _rStyle: result,
        _rRemStyle: remResult
      };

      function cssValue(key, value, htmlFontsize) {
        if (!value) return value;
        if (['fontWeight'].indexOf(key) > -1) {
          return value;
        } else {
          let valueNum =
            typeof value == 'string' ? value.replace(/(px)|(rem)/, '') : value;
          if (valueNum == 1 || ['fontSize'].indexOf(key) > -1) {
            return valueNum + 'px';
          }
          if (
            typeof value == 'number' ||
            value - 0 == value ||
            value.match(/px$/)
          ) {
            value = parseFloat(value);
            return htmlFontsize
              ? (
                  (value * (viewportWidth / designWidth)) /
                  htmlFontsize
                ).toFixed(2) + 'rem'
              : value + 'px';
          } else {
            return value;
          }
        }
      }
    }

    function generateScript(json, options) {
      let indent = options.indent || 0;
      let result = [];

      let dataFunctionScript =
        _rMockData && _rMockData.length
          ? [].concat(
              _line('data() {', { indent: { tab: indent + 1 } }),
              _line('return mockData;', { indent: { tab: indent + 2 } }),
              _line('},', { indent: { tab: indent + 1 } })
            )
          : [];
      let methodScript = [].concat(
        _line('methods: {', { indent: { tab: indent + 1 } }),
        ...methodsFunction,
        _line('}', { indent: { tab: indent + 1 } })
      );
      result = result.concat(
        _line('export default {', { indent: { tab: indent } }),
        _line('name: "DvcComponent",', { indent: { tab: indent + 1 } }),
        dataFunctionScript,
        ...lifeCycleFunction,
        methodScript,
        _line('}', { indent: { tab: indent } })
      );

      return result;
    }

    function generateXML(json, options) {
      let indent = options.indent || 0;
      let eventsOn = options.eventsOn || false;
      let result = [];
      if (!!json.length && typeof json != 'string') {
        json.forEach(v => {
          let _i = generateXML(v, {
            indent: indent,
            eventsOn: eventsOn
          });
          result = result.concat(_i);
        });
      } else if (typeof json == 'object') {
        let type = json.componentType;
        // let changeType = json.changeType || json.componentType;
        let changeType = json.componentType;
        let changeTypeName = COMPONENT_TYPE_MAP[changeType] || 'div';

        let className = _.kebabCase(json.attrs && json.attrs.className);
        let styleParts = _line(`class="${className}"`, {
          indent: { tab: indent + 1 }
        });
        let eventParts = [];

        // 过滤出当前节点是否有事件
        scriptsStore.forEach(v => {
          let eventRet = generateEvent(v, {
            indent: 1
          });
          if (eventRet && v.belongId == json.id) {
            if (['destroy', 'init'].indexOf(v.eventType) != -1) {
              lifeCycleFunction.push(eventRet);
            } else if (['helper'].indexOf(v.eventType) != -1) {
              computedFunction.push(eventRet);
              // computedValue = v.scriptName;
            } else {
              methodsFunction.push(eventRet);
              eventParts.push(
                _line(
                  `@${EVENT_MAP[v.eventType] || v.eventType}="${v.scriptName}"`,
                  { indent: { tab: indent + 1 } }
                )
              );
            }
          }
        });

        // 生成mockData
        let dataBinding = dataBindingStoreMap[json.id];
        if (dataBinding) {
          let { source, sourceValue } = dataBinding.value;
          if (source && sourceValue) {
            !mockDataStore[source] && (mockDataStore[source] = {});
            if (Array.isArray(sourceValue)) {
              let dynamicValue = '';
              if (
                dataBinding.target[0] == 'innerText' &&
                json.componentType == 'text'
              ) {
                dynamicValue = json.innerText;
                sourceValue.map(_v => {
                  if (_v.type !== 'DYNAMIC') {
                    dynamicValue = dynamicValue.replace(_v.value, '');
                  }
                });
              } else if (
                dataBinding.target[0] == 'source' &&
                json.componentType == 'picture'
              ) {
                dynamicValue = json.attrs.src;
              }
              sourceValue.map(_v => {
                if (_v.type == 'DYNAMIC') {
                  let _path = _v.value;
                  _path = _path.slice(7, _path.length - 1); // -todo
                  mockDataStore[source][_path] = dynamicValue;
                }
              });
            } else {
              mockDataStore[source][sourceValue] = (() => {
                if (
                  dataBinding.target[0] == 'innerText' &&
                  json.componentType == 'text'
                ) {
                  return json.innerText;
                } else if (
                  dataBinding.target[0] == 'source' &&
                  json.componentType == 'picture'
                ) {
                  return json.attrs.src;
                } else {
                  return null;
                }
              })();
            }
          }
        }

        cssStore.push({
          styleName: className,
          styleValue: json.style
        });

        switch (type) {
          case 'text':
            let textValue = createBindingValue(dataBinding);
            textValue =
              !dataBinding || dataBinding.value.isStatic
                ? textValue
                : `{{${textValue}}}`;
            if (eventParts && eventParts.length > 0) {
              result = result.concat(
                _line(`<${changeTypeName}`, { indent: { tab: indent } }),
                styleParts,
                eventParts
              );
              result = result.concat(_line('>', { indent: { tab: indent } }));
              result = result.concat(
                _line(textValue, { indent: { tab: indent + 1 } }),
                _line(`</${changeTypeName}>`, { indent: { tab: indent } })
              );
            } else {
              result = result.concat(
                _line(
                  `<${changeTypeName} ${
                    styleParts.parts[0]
                  }>${textValue}</${changeTypeName}>`,
                  { indent: { tab: indent } }
                )
              );
            }
            break;
          case 'picture':
            let source = `${json.attrs.src}`;
            let srcAttr =
              !dataBinding || dataBinding.value.isStatic
                ? `src="${source}"`
                : `:src="${createBindingValue(dataBinding)}"`;
            result = result.concat(
              _line(`<${changeTypeName}`, { indent: { tab: indent } }),
              styleParts,
              _line(srcAttr, { indent: { tab: indent + 1 } })
            );
            if (eventParts && eventParts.length > 0) {
              result = result.concat(eventParts);
            }
            result = result.concat(_line('/>', { indent: { tab: indent } }));
            break;
          case 'view':
          default:
            if (json.children && json.children.length > 0) {
              let childResult = generateXML(json.children, {
                indent: indent + 1,
                eventsOn: eventsOn
              });
              if (eventParts && eventParts.length > 0) {
                result = result.concat(
                  _line(`<${changeTypeName}`, { indent: { tab: indent } }),
                  styleParts,
                  eventParts
                );
                result = result.concat(_line('>', { indent: { tab: indent } }));
              } else {
                result = result.concat(
                  _line(`<${changeTypeName} ${styleParts.parts[0]}>`, {
                    indent: { tab: indent }
                  })
                );
              }
              result = result.concat(
                childResult,
                _line(`</${changeTypeName}>`, { indent: { tab: indent } })
              );
            } else {
              if (eventParts && eventParts.length > 0) {
                result = result.concat(
                  _line(`<${changeTypeName}`, { indent: { tab: indent } }),
                  styleParts,
                  eventParts
                );
                result = result.concat(
                  _line('/>', { indent: { tab: indent } })
                );
              } else {
                result = result.concat(
                  _line(`<${changeTypeName} ${styleParts.parts[0]} />`, {
                    indent: { tab: indent }
                  })
                );
              }
            }
            break;
        }
      } else {
        return json
          .toString()
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      }

      return result;
    }

    /**
     * @desc 根据绑定过的数据生成
     */
    function generateMockData(mockData) {
      let targetMockObject = {};
      for (let _o in mockData) {
        targetMockObject[_o] = _deepMock({}, mockData[_o]);
      }
      return targetMockObject;

      function _deepMock(targetObj, sourceObj) {
        let targetObjStore = targetObj;
        for (let _o in sourceObj) {
          let _oArr = _utilsStringToArr(_o);
          let _len = _oArr.length;
          _oArr.forEach((_v, _i) => {
            if (_i == _len - 1) {
              targetObj[_v] = sourceObj[_o];
            } else {
              targetObj[_v] = {};
              targetObj = targetObj[_v];
            }
          });
          targetObj = targetObjStore; // 回退到顶点
        }
        return targetObjStore;
      }
      function _utilsStringToArr(string) {
        let arr = [];
        string = string.replace(/\]/g, '');
        string = string.replace(/\[/g, '.');
        arr = string.split('.');
        return arr;
      }
    }

    /**
     * @desc 根据单个脚本内容，解析格式，重新生成partsJson
     * @param scriptJson 事件内部编写的内容
     * @param indent
     * @return eventParts 描述事件的partsJson
     */
    function generateEvent(scriptJson, options) {
      let indent = options.indent || 0;
      let funcInner = parseFunction(scriptJson);
      if (!funcInner.content) {
        return null;
      } else {
        let eventContentParts = _line(funcInner.content, {
          indent: { tab: indent + 1 }
        });
        let eventName =
          EVENT_NAME_MAP[scriptJson.scriptName] || scriptJson.scriptName;
        if (['destroy', 'init'].indexOf(scriptJson.eventType) != -1) {
          eventName = EVENT_NAME_MAP[scriptJson.eventType];
        } else {
          indent = indent + 1;
        }

        let eventParts = [].concat(
          _line(`${eventName}(${funcInner.args.join(', ')}){`, {
            indent: { tab: indent }
          }),
          eventContentParts,
          _line('},', { indent: { tab: indent } })
        );
        // console.log('eventParts', eventParts);
        return eventParts;
      }

      function parseFunction(json) {
        let args = [];
        let content = '';
        const REG_ARGS1 = /[\s\S]*export\sdefault\sfunction\s{0,1}\(([\s\S]*)\)\s{0,1}{\n([\s\S]*)\n\}/;
        const REG_ARGS2 = /[\s\S]*export\sdefault\s\(([\s\S]*)\)\s{0,1}=>\s{0,1}\{\n([\s\S]*)\n\}/;
        try {
          let scriptContent = json.content;
          let regResult =
            scriptContent.match(REG_ARGS1) || scriptContent.match(REG_ARGS2);

          if (regResult) {
            let argsArr = regResult[1].split(',');
            argsArr.map(_v => {
              if (_.trim(_v) !== '') {
                args.push(_.trim(_v));
              }
            });
            content = _.trim(regResult[2]) == '' ? '' : regResult[2];
          }
        } catch (e) {
          args = [];
          content = '';
        }

        return {
          args: args,
          content: content
        };
      }
    }
  }

  /**
   * @desc 生成模板语法文本
   * @param {binding} 数据绑定
   * @retun string
   */
  function generateTemplate(binding) {
    binding = binding.value;
    if (binding.source == 'data' && Array.isArray(binding.sourceValue)) {
      if (
        binding.sourceValue.length == 1 &&
        binding.sourceValue[0].type == 'DYNAMIC'
      ) {
        return binding.sourceValue[0].value.slice(
          2,
          binding.sourceValue[0].value.length - 1
        );
      } else {
        let r = '';
        binding.sourceValue.map(_v => {
          r += _v.value;
        });
        return '`' + r + '`';
      }
    } else {
      return '';
    }
  }

  /**
   * @desc 根据绑定生成value，是generateDataBindValue的右值
   * @param dataBinding 绑定关系
   * @return string 返回值
   */
  function createBindingValue(dataBinding) {
    if (!dataBinding) return '';
    let string = '';
    // let helperScriptName = dataBinding.value.helperScriptName;
    let source = dataBinding.value.source;
    let sourceValue = dataBinding.value.sourceValue;
    if (dataBinding.value.isStatic) {
      string = dataBinding.value.value;
    } else {
      if (source == 'data' && Array.isArray(sourceValue)) {
        // 共售出${item_num}件 这样的语法解析
        string = generateTemplate(dataBinding);
      } else {
        if (source && sourceValue) {
          string = `${source}.${sourceValue}`;
        } else {
          return false;
        }
      }
    }
    return string;
  }
};
