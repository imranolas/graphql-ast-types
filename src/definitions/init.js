import defineType from "./index";
import graphqlDef from "./graphql";

graphqlDef().forEach(([name, params]) => defineType(name, params));
