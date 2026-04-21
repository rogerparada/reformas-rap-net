export type MessageOptions = {
	title: string;
	text: string;
	confirmTitle?: string;
	confirmText?: string;
	action?: () => void;
};
