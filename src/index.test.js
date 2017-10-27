import * as t from './index';
import { print } from 'graphql/language';
import stripIndent from 'strip-indent';

describe('GraphQL AST types', () => {
  it('can print queries and mutations with simple fields', () => {
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

    expect(print(ast).trim()).toEqual(stripIndent(`
      {
        foo
        bar
      }

      mutation {
        foo
        bar
      }
    `).trim());
  });
});
