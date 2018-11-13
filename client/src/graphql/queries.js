

export const userQuery = graphql(USER_QUERY, {
    options: () => ({ variables: { id: 1 } }), // fake the user for now
    props: ({ data: { loading, user } }) => ({
      loading,
      user,
    }),
  });