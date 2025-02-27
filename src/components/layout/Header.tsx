import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { IoIosArrowBack } from 'react-icons/io';
import { routes } from '../../constants';
import { GoBackButton, AddQuickDrawerMemoButton, Logo } from '..';

const Header = () => {
	const { pathname } = useLocation();

	const isGoBackButtonActive =
		pathname.includes(routes.EXPENSE_TRACKER) ||
		pathname.includes(routes.TODO_REMINDER) ||
		pathname.includes(routes.REFLECT) ||
		[...pathname].filter(item => item === '/').length >= 2;

	return (
		<Container id="layout-header">
			<ReactiveLogo>
				{isGoBackButtonActive ? (
					<GoBackButton>
						<IoIosArrowBack size="24" color="var(--grey700)" />
					</GoBackButton>
				) : (
					<Logo />
				)}
			</ReactiveLogo>
			<AddQuickDrawerMemoButton />
		</Container>
	);
};

const Container = styled.header`
	position: fixed;
	top: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 auto;
	padding: 0 var(--padding-container-mobile);
	max-width: var(--max-app-width);
	min-width: var(--min-app-width);
	width: 100%;
	height: var(--nav-height);
	background-color: var(--white);
	border-bottom: 1px solid var(--greyOpacity100);
	z-index: var(--nav-index);
`;

const ReactiveLogo = styled.h1`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: var(--fz-h6);
	font-weight: var(--fw-black);
`;

export default Header;
