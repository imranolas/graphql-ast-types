// const { parse } = require('babylon');
// const t = require('babel-types');
// const visit = require('babel-traverse').default;
const fs = require('fs');
// const nodePath = require('path');

// const visitor = {
//   CallExpression: path => {
//     if (path.get('callee').isIdentifier({ name: 'defineType' })) {
//       const typeName = path.get('arguments.0').node.value;
//       const config = path.get('arguments.1').node.properties;
//     }
//   }
// };

// const raw = fs.readFileSync('./src/definitions/graphql.js', 'utf-8');

// visit(
//   parse(raw, {
//     sourceType: 'module',
//     plugins: ['flow']
//   }),
//   visitor
// );

const docTemplate = (name, { builder, fields }) => {
  fs.appendFileSync(
    './README.md',
    `#### \`t.${name}(${builder ? builder.join(', ') : ''})\`
`
  );
};

require('./lib/definitions/graphql').default(docTemplate);
