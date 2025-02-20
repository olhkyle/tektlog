import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { MdOutlineAdd } from 'react-icons/md';
import { Portal } from '../layout';
import Button from './Button';
import { customPropReceiver } from '../../constants';

// TODO:
// 1 - top | bottom 위치에 따른 변화
// 2 - mobile 환경에 맞는 애니메이션

interface DrawerProps {
	position: 'top' | 'bottom';
	isOpen: boolean;
	open?: () => void;
	close: () => void;
	title: string | ReactNode;
	toggle?: () => void;
	children: ReactNode;
}

// TODO: GrabArea - touch event를 활용한 애니메이션 움직임
const Drawer = ({ position, isOpen, close, title, children }: DrawerProps) => {
	return (
		<Portal>
			<Container role="dialog" position={position} isOpen={isOpen}>
				<Header>
					<Title>{title}</Title>
					<AdditionalActions isShown={position === 'top'}>
						<Button type="button" onClick={close}>
							<RotatableSvg size={24} color="var(--black)" $isActive={isOpen} />
						</Button>
					</AdditionalActions>
				</Header>
				<GrabArea isShown={position === 'bottom'} />
				<Body>{children}</Body>
			</Container>
			<Overlay id="drawer-overlay" isOpen={isOpen} onClick={close} aria-hidden={isOpen ? true : false} />
		</Portal>
	);
};

const Container = styled.div<{ position: 'top' | 'bottom'; isOpen: boolean }>`
	position: fixed;
	top: ${({ position }) => (position === 'top' ? '0' : 'auto')};
	left: 0;
	right: 0;
	bottom: ${({ position }) => (position === 'bottom' ? '0' : 'auto')};
	margin: 0 auto;
	padding: var(--padding-container-mobile);
	max-width: var(--max-app-width);
	min-width: var(--min-app-width);
	border-radius: ${({ position }) => (position === 'top' ? '0 0 var(--radius-l) var(--radius-l)' : 'var(--radius-l) var(--radius-l) 0 0')};
	background-color: var(--white);
	z-index: var(--drawer-index);
	animation: ${({ isOpen }) => (isOpen ? 'slideDown 0.3s ease forwards' : 'slideUp 0.2s ease forwards')};
	-webkit-animation: ${({ isOpen }) => (isOpen ? 'slideDown 0.3s ease forwards' : 'slideUp 0.2s ease forwards')};

	@keyframes slideUp {
		from {
			transform: translate3d(0, 0, 0);
		}
		to {
			transform: translate3d(0, -100%, 0);
		}
	}

	@keyframes slideDown {
		from {
			transform: translate3d(0, -100%, 0);
		}
		to {
			transform: translate3d(0, 0, 0);
		}
	}
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.h4`
	font-size: var(--fz-h5);
	font-weight: var(--fw-bold);
`;

const GrabArea = styled.div<{ isShown: boolean }>`
	display: ${({ isShown }) => (isShown ? 'block' : 'none')};
	margin: 16px auto 0;
	width: 100px;
	height: 8px;
	border-radius: var(--radius-extra);
	background-color: var(--greyOpacity100);
`;

const Body = styled.div`
	height: auto;
`;

const AdditionalActions = styled.div<{ isShown: boolean }>`
	display: ${({ isShown }) => (isShown ? 'flex' : 'none')};
	justify-content: flex-end;
`;

const RotatableSvg = styled(MdOutlineAdd, customPropReceiver)<{ $isActive: boolean }>`
	transform: ${({ $isActive }) => ($isActive ? 'rotate(45deg)' : 'rotate(0deg)')};
	transition: transform 0.1s ease-in-out;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
	position: fixed;
	margin: 0 auto;
	max-width: var(--max-app-width);
	min-width: var(--min-app-width);
	height: 100dvh;
	background-color: rgba(0, 0, 0, 20%);
	inset: 0px;
	visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
	opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
	z-index: calc(var(--drawer-index) - 1);
	transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

export default Drawer;
