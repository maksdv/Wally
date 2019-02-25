import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { USER_QUERY } from '../../../graphql/user.query';
import Profile from '../components/profile';

const mapStateToProps = ({ auth }) => ({
  auth,
});

const userQuery = graphql(USER_QUERY, {
  options: auth => ({ variables: { id: auth.auth.id } }), // fake the user for now
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
    loggedUser: true,
  }),
});

export default compose(
  connect(mapStateToProps),
  userQuery,
)(Profile);
