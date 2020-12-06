const { GraphQLList, GraphQLInt } = require("graphql");

const PostType = require("../../../modules/post/PostType");
const PostModel = require("../../../modules/post/PostModel");

module.exports = {
  type: new GraphQLList(PostType),
  args: {
    limit: { type: GraphQLInt },
  },
  resolve: async (_, { limit = 10 }, context) => {
    if (!context.user) return null;

    return await PostModel.find({})
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(limit);
  },
};
