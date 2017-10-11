import * as t from '../index';
import { print } from 'graphql/language';

test('', () => {
  const ast = t.document([
    t.operationDefinition(
      'query',
      t.selectionSet([t.field(t.name('foo')), t.field(t.name('bar'))])
    ),
    t.operationDefinition(
      'mutation',
      t.selectionSet([t.field(t.name('foo')), t.field(t.name('bar'))])
    )
  ]);

  expect(print(ast)).toEqual(
    `{
  foo
  bar
}

mutation {
  foo
  bar
}
`
  );
});
