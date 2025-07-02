import styles from "./Chat.module.css";

type Message = {
	id: string;
	author: string;
	text: string;
};

export default function Message({ message }: { message: Message }) {
	const sentenceArr = message.text
		.split("\n")
		.filter((sentence) => !sentence.includes("https://zzrl"));
	return (
		<span
			className={`${styles.message} ${
				message.author === "user" ? styles.userMessage : styles.botMessage
			}`}
		>
			{sentenceArr.map((sentence) => (
				<span key={sentence} className={styles.sentence}>
					{sentence}
				</span>
			))}
		</span>
	);
}
