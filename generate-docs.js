const fs = require('fs');

const docTemplate = (name, { builder, fields }) => {
  fs.appendFileSync(
    './README.md',
    `#### \`t.${name}(${builder ? builder.join(', ') : ''})\`
`
  );
};

require('./lib/definitions/graphql').default(docTemplate);
