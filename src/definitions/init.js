import defineType from './index';
import graphqlDef from './graphql';

graphqlDef().forEach(([ kind, params ]) => {
  defineType(kind, params);
});
