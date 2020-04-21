import { mapStateToProps } from './mapToProps';

test('check that the adapter returns the authedUser JUST as it gets if from the store', () => {
	const authedUser = '::authedUser::';

	const props = {
		authedUser
	};

	const adaptedProps = mapStateToProps(props);
	expect(adaptedProps).toEqual({authedUser});	
});
