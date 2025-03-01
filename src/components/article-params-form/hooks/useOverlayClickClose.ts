import { useEffect } from 'react';

type UseOverlayClickClose = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLFormElement>;
};

export const useOverlayClickClose = ({
	isOpen,
	rootRef,
	onClose,
}: UseOverlayClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target)
			) {
				isOpen && onClose();
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, isOpen]);
};
