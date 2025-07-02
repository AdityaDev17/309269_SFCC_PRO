"use client";
import styles from "./Chat.module.css";

type Message = {
	id: string;
	author: string;
	text: string;
};

export default function Message({ message }: { message: Message }) {
	return (
		<span
			className={`${styles.message} ${
				message.author === "user" ? styles.userMessage : styles.botMessage
			}`}
		>
			{message.text}
		</span>
	);
}
