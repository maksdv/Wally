import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import userArticles from "../components/userArticles";
import { USER_QUERY } from "../../../graphql/user.query";

const userQuery = graphql(USER_QUERY, {
  options: auth => ({ variables: { id: auth.auth.id } }), // fake the user for now
  props: ({ data: { loading, user } }) => ({
    loading,
    user
  })
});
const mapStateToProps = ({ auth }) => ({
  auth
});
export default compose(
  connect(mapStateToProps),
  userQuery
)(userArticles);
