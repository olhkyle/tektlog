import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { MdOutlineAdd } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
import { routes } from '../../constants';
import { Button } from '../common';
import GoBackButton from './GoBackButton';

const Header = () => {
	const { pathname } = useLocation();

	return (
		<Container>
			<Logo>
				{pathname.includes(routes.EXPENSE_TRACKER) ||
				pathname.includes(routes.TODO_REMINDER) ||
				pathname.includes(routes.REFLECT) ||
				[...pathname].filter(item => item === '/').length >= 2 ? (
					<GoBackButton>
						<IoIosArrowBack size="24" color="var(--grey700)" />
					</GoBackButton>
				) : (
					<Link to={routes.HOME}>TEKT</Link>
				)}
			</Logo>
			<StyledButton type="button">
				<MdOutlineAdd size={24} color="var(--black)" />
			</StyledButton>
		</Container>
	);
};

const Container = styled.nav`
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

const Logo = styled.h1`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: var(--fz-h6);
	font-weight: var(--fw-black);
`;

const StyledButton = styled(Button)`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 27px;
	height: 27px;
	cursor: pointer;
`;

export default Header;
