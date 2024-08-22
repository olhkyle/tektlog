import styled from '@emotion/styled';
import { Portal } from '../layout';
import useModalStore from '../../store/useModalStore';

const ModalContainer = () => {
	const { modals, removeModal } = useModalStore();

	return (
		<Portal>
			<Container isVisible={modals.length > 0}>
				{modals.map(({ Component, props }, index) => {
					const closeModal = () => removeModal(Component);

					if (props) {
						return <Component key={index} onClose={closeModal} id={`modal-${index}`} {...props} />;
					}
				})}
			</Container>
		</Portal>
	);
};

const Container = styled.div<{ isVisible: boolean }>`
	position: fixed;
	max-width: var(--max-app-width);
	min-width: var(--min-app-width);
	margin: 0 auto;
	height: 100dvh;
	background-color: rgba(0, 0, 0, 40%);
	visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
	inset: 0px;
	z-index: var(--overlay-index);
`;

export default ModalContainer;