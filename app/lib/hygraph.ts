import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!;

export const hygraph = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.NEXT_HYGRAPH_TOKEN}`,
  },
});