import * as t from "./index";
import { print } from "graphql/language";
import stripIndent from "strip-indent";

describe("GraphQL AST types", () => {
  it("can print queries and mutations with simple fields", () => {
    const ast = t.document([
      t.operationDefinition(
        "query",
        t.selectionSet([t.field(t.name("foo")), t.field(t.name("bar"))])
      ),
      t.operationDefinition(
        "mutation",
        t.selectionSet([t.field(t.name("foo")), t.field(t.name("bar"))])
      )
    ]);

    expect(print(ast).trim()).toEqual(
      stripIndent(`
      {
        foo
        bar
      }

      mutation {
        foo
        bar
      }
    `).trim()
    );
  });

  describe("GraphQL Definitions", () => {
    it("matches the existing snapshot", () => {
      expect(t.NODE_FIELDS).toMatchSnapshot("Node Fields");
      expect(t.ALIAS_KEYS).toMatchSnapshot("Alias Keys");
      expect(t.BUILDER_KEYS).toMatchSnapshot("Builder Keys");
      expect(t.FLIPPED_ALIAS_KEYS).toMatchSnapshot("Flipped Alias Keys");
    });
  });

  describe("nonNull", () => {
    it("should accept the following", () => {
      const nonNullFn = () => t.nonNullType(t.namedType(t.name("User")));
      expect(nonNullFn).not.toThrow();
    });
  });
});
