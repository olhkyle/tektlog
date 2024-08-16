import { ReactNode, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingSpinner, NotAuthenticated } from '../components';
import { useAuthQuery } from '../hooks';
import routes, { Route } from '../constants/routes';

interface AuthenticationGuardProps {
	redirectTo: Route<typeof routes>;
	element: ReactNode;
}

// As a role of Server-Side-Rendering's Middleware
const AuthenticationGuard = ({ redirectTo, element }: AuthenticationGuardProps) => {
	const { data, isFetched, isLoading, error } = useAuthQuery();

	return isLoading ? (
		<LoadingSpinner />
	) : isFetched && data ? (
		error === null ? (
			<Suspense fallback={<LoadingSpinner />}>{element}</Suspense>
		) : (
			<Navigate to={redirectTo} />
		)
	) : (
		<NotAuthenticated />
	);
};

export default AuthenticationGuard;
