import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import DataLoader from "dataloader";
import gql from "graphql-tag";
import db from "./database.js";

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    content: String!
    post: Post!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }
`;

// Comments를 배치로 로딩하는 DataLoader 생성
function createCommentsLoader() {
	return new DataLoader(async (postIds) => {
		console.log(`Batch loading comments for posts: ${postIds.join(", ")}`);

		const comments = db
			.prepare(
				`SELECT * FROM comments WHERE post_id IN (${postIds.map(() => "?").join(",")})`,
			)
			.all(...postIds);

		// postId별로 comments 그룹화하여 반환
		return postIds.map((postId) =>
			comments.filter((comment) => comment.post_id === Number.parseInt(postId)),
		);
	});
}

const resolvers = {
	Query: {
		posts: () => {
			console.log("Fetching all posts");
			return db.prepare("SELECT * FROM posts").all();
		},
	},
	Post: {
		comments: (post, _, context) => {
			return context.commentsLoader.load(post.id);
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
	context: () => ({
		commentsLoader: createCommentsLoader(),
	}),
});

console.log(`🚀 Server ready at: ${url}`);
