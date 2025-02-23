import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
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

const resolvers = {
	Query: {
		posts: () => {
			console.log("Fetching all posts");

			return db.prepare("SELECT * FROM posts").all();
		},
	},
	Post: {
		comments: (post) => {
			console.log(`Fetching comments for post ${post.id}`);

			return db
				.prepare("SELECT * FROM comments WHERE post_id = ?")
				.all(post.id);
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const { url } = await startStandaloneServer(server, {
	listen: { port: 4001 },
});

console.log(`🚀  Server ready at: ${url}`);
