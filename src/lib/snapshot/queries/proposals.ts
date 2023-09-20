export const getProposalsQuery = /* GraphQL */ `
  query getProposals($space: String!) {
    proposals(
      first: 10
      where: { space: $space }
      orderBy: "created"
      orderDirection: desc
    ) {
      id
      title
      state
      start
      end
      snapshot
      author
    }
  }
`;
