import { GraphQLClient } from 'graphql-request';

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
      `Please add it to your .env.local file or deployment environment.`
    );
  }
  return value;
}

const endpoint = getRequiredEnv('NEXT_PUBLIC_HYGRAPH_ENDPOINT');
const token = process.env.NEXT_HYGRAPH_TOKEN;

export const hygraph = new GraphQLClient(endpoint, {
  headers: {
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  },
});