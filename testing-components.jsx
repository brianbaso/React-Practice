const Image = props => {
	if (props.loading) {
		return <LoadingIcon />;
	}
	return <img src={props.src} />;
};

describe('Image', () => {
	it('renders a loading icon when the image is loading', () =>)
	
});