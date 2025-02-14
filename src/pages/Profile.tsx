import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import supabase from '../supabase/service';
import useUserStore from '../store/userStore';
import { Button } from '../components';
import { useLoading } from '../hooks';
import useToastStore from '../store/useToastStore';
import { routes } from '../constants';

const ProfilePage = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { Loading, isLoading, startTransition } = useLoading();
	const { userInfo, resetUser } = useUserStore();
	const { addToast } = useToastStore();

	const handleLogout = async () => {
		try {
			const { error } = await startTransition(supabase.auth.signOut());

			if (error) {
				throw new Error(error?.message);
			}

			navigate(routes.HOME);
			resetUser();

			addToast({ status: 'success', message: 'Successfully Logout' });
		} catch (error) {
			addToast({ status: 'error', message: 'Error with Logout' });
			console.error(error);
		} finally {
			queryClient.setQueryData(['auth'], null);
			queryClient.clear();
		}
	};

	return (
		<Container>
			<User>✹ {userInfo?.user?.email?.split('@').at(0)} ✹ </User>
			<Bottom>
				<Title>Keep Writing ? </Title>
				<LogoutButton type="button" onClick={handleLogout}>
					{isLoading ? Loading : 'LogOut ⇲'}
				</LogoutButton>
			</Bottom>
		</Container>
	);
};

const Container = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 32px;
	height: calc(100dvh - 3 * var(--nav-height));
`;

const User = styled.h2`
	min-width: 270px;
	font-size: var(--fz-h5);
	font-weight: var(--fw-bold);
	color: var(--white);
	background: linear-gradient(135deg, var(--blue200), var(--grey200));
	text-align: center;
`;

const Bottom = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
`;

const Title = styled.p`
	min-width: 270px;
	padding: calc(var(--padding-container-mobile) / 1.2) var(--padding-container-mobile);
	font-size: var(--fz-h7);
	font-weight: var(--fw-medium);
	color: var(--white);
	background: linear-gradient(to right, var(--grey600), var(--grey200));
	text-align: center;
`;

const LogoutButton = styled(Button)`
	padding: var(--padding-container-mobile);
	min-width: 270px;
	color: var(--white);
	background-color: var(--black);
	font-size: var(--fz-p);
	font-weight: var(--fw-bold);
	transition: background 0.15s ease-in-out;

	&:hover {
		background-color: var(--grey900);
	}
`;

export default ProfilePage;
