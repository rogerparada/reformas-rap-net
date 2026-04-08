type ModalProps = {
	children: React.ReactNode;
	open: boolean;
	close?: () => void;
};

export default function Modal({ open, close, children }: ModalProps) {
	if (open) {
		return (
			<>
				<div className="bg-black w-full h-screen z-50 fixed inset-0 left-0 opacity-90"></div>
				<div className="send_modal">
					<div className="p-12!">
						<button type="button" className="close_modal_button" onClick={close}>
							<span className="icon-[fa7-solid--close]" />
						</button>
						{children}
					</div>
				</div>
			</>
		);
	}
}
