import styled from '@emotion/styled';
import { ContentBody, ContentBodyLoader, GoBackButton } from '../components';
import { Suspense } from 'react';

const ContentPage = () => {
	return (
		<Container>
			<GoBackButton />
			<Suspense fallback={<ContentBodyLoader />}>
				<ContentBody />
			</Suspense>
		</Container>
	);
};

const Container = styled.section`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: calc(100dvh - (3 * var(--nav-height)));
`;

export default ContentPage;
