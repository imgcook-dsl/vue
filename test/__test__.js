const co = require('co');
const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const { NodeVM } = require('vm2');
const _ = require('lodash');
const XTemplate = require('xtemplate');
const data = require('./data');
var originData = require('./origin-data');
const vm = new NodeVM({
  console: 'inherit',
  sandbox: {}
});

describe('Generate', function() {
  describe('#generateCode()', function() {
    it('should generate code to write to file', function() {
      co(function*() {
        const code = fs.readFileSync(
          path.resolve(__dirname, '../src/index.js'),
          'utf8'
        );
        const prettierOpt = {
          printWidth: 120,
          singleQuote: true
        };
        const renderInfo = vm.run(code)(data, {
          prettier: prettier,
          _: _,
          originData: originData
        });
        const renderData = renderInfo.renderData;
        const { modClass, style } = renderData;
        const tpl = fs.readFileSync(
          path.resolve(__dirname, '../src/template.xtpl'),
          'utf8'
        );
        const ret = new XTemplate(tpl).render(renderData);
        fs.ensureDirSync(path.resolve(__dirname, './codeExample'));
        fs.writeFileSync(
          path.join(__dirname, './codeExample/index.jsx'),
          prettier.format(ret, prettierOpt)
        );
        fs.writeFileSync(
          path.join(__dirname, './codeExample/mod.jsx'),
          prettier.format(modClass, prettierOpt)
        );
        fs.writeFileSync(
          path.join(__dirname, './codeExample/style.js'),
          prettier.format(style, prettierOpt)
        );
      });
    });
  });
});
