import styled from '@emotion/styled';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common';

const GoBackButton = () => {
	const navigate = useNavigate();

	return (
		<StyledButton type="button" onClick={() => navigate(-1)}>
			<RiArrowLeftLine size="24" color="var(--grey500)" />
		</StyledButton>
	);
};

const StyledButton = styled(Button)`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 32px;
	height: 32px;
	background-color: var(--greyOpacity50);
	border: 1px solid var(--greyOpacity200);
	border-radius: var(--radius-s);
	transition: background 0.15s ease-in-out;

	&:hover {
		background-color: var(--greyOpacity100);
	}
`;

export default GoBackButton;
