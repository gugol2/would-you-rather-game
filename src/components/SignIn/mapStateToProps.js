export const mapStateToProps = ({users, loadingBar}) => {
	return {
		users,
		loading: loadingBar.default
	};
};
