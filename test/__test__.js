const co = require('co');
const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const { NodeVM } = require('vm2');
const _ = require('lodash');
const XTemplate = require('xtemplate');
const dslHelper = require('@imgcook/dsl-helper');
const data = require('./data');
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
          helper: dslHelper,
          _: _
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
          path.join(__dirname, './codeExample/index.vue'),
          ret
        );
      });
    });
  });
});
