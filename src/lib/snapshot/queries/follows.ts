export const getFollowsQuery = /* GraphQL */ `
  query getFollows($follower: String!) {
    follows(first: 10, where: { follower: $follower }) {
      follower
      space {
        id
        name
        avatar
        followersCount
      }
      created
    }
  }
`;
