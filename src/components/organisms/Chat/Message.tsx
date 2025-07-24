import type { MessageType } from "@/common/type";
import { useMemo } from "react";
import styles from "./Chat.module.css";

export default function Message({ message }: { message: MessageType }) {
	const sentenceArr = useMemo(() => {
		return message.text
			.split("\n")
			.filter((sentence) => !sentence.includes("https://"));
	}, [message.text]);
	return (
		<span
			className={`${styles.message} ${
				message.author === "user" ? styles.userMessage : styles.botMessage
			}`}
		>
			{sentenceArr.map((sentence, i) => (
				<span key={crypto.randomUUID()} className={styles.sentence}>
					{sentence}
				</span>
			))}
		</span>
	);
}
