import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { IoMdNotifications } from 'react-icons/io';
import { FaCalculator } from 'react-icons/fa';
import { RiOpenaiFill } from 'react-icons/ri';
import { routes } from '../constants';

const linkGroup = [
	{
		to: routes.TODO_REMINDER,
		icon: <IoMdNotifications size="24" color="var(--white)" />,
		title: 'Reminder',
	},
	{
		to: routes.EXPENSE_TRACKER,
		icon: <FaCalculator size="18" color="var(--blue100)" />,
		title: 'Expense Tracker',
	},
	{
		to: routes.REFLECT,
		icon: <RiOpenaiFill size="24" color="var(--white)" />,
		title: 'AI Agent(WIP)',
	},
];

const HomePage = () => {
	return (
		<Container>
			<Flex>
				{linkGroup.map(({ to, icon, title }) => (
					<Link to={to} key={to}>
						<StyledMotion
							initial="rest"
							whileTap={{
								scale: 0.95,
								transition: { duration: 0.2 },
							}}>
							<IconBackground>{icon}</IconBackground>
							<span>{title}</span>
						</StyledMotion>
					</Link>
				))}
			</Flex>
		</Container>
	);
};

const Container = styled.section`
	width: 100%;
`;

const Flex = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const StyledMotion = styled(motion.div)`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: var(--padding-container-mobile);
	background-color: var(--greyOpacity50);
	border-radius: var(--radius-m);
	font-weight: var(--fw-semibold);
`;

const IconBackground = styled.div`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 32px;
	height: 32px;
	background-color: var(--blue300);
	border-radius: var(--radius-s);
`;

export default HomePage;
