"use client";
import Input from "@/components/atomic/Input/Input";
import {
	ArrowDownRight,
	ArrowUpRight,
	ChevronDown,
	ChevronUp,
	RotateCw,
	SendHorizontal,
	X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import Message from "./Message";

// const initialMessage = [
// 	{
// 		id: "1",
// 		author: "bot",
// 		text: "Hello, how can I help you? Type in what you are looking for and I will suggest something that you will really enjoy.",
// 	},
// 	{
// 		id: "2",
// 		author: "user",
// 		text: `Suggest mens fragrances`,
// 	},
// 	{
// 		id: "3",
// 		author: "bot",
// 		// text: "I've found some relevant results for you. Can you provide more details or refine your search to get more precise results?"
// 		text: "Based on your interest in dogs, I have a few product recommendations that might be perfect for your furry friend:\n\n1. **Compostable Dog Chews** - $5\n   \n   - Great for your dog's dental hygiene and your garden's soil health. These chews can be left outside in your garden or added to your compost/food waste bin to break down naturally.\n   - [Click here to buy](https://zzrl-003.dx.commercecloud.salesforce.com/on/demandware.store/Sites-acndoggo-Site/en_US/Product-Show?pid=ACNPETS_124&src=commerce-concierge)\n   - ![Compostable Dog Chews](https://zzrl-003.dx.commercecloud.salesforce.com/on/demandware.store/Sites-acndoggo-Site/en_US/Product-Show?pid=ACNPETS_124&src=commerce-concierge)\n\n2. **Care for Your Dog Treats** - $13\n   \n   - These organic dog biscuits are designed to support gut health and nutritional balance without any added nasties.\n   - [Click here to buy](https://zzrl-003.dx.commercecloud.salesforce.com/on/demandware.store/Sites-acndoggo-Site/en_US/Product-Show?pid=ACNPETS_125&src=commerce-concierge)\n   - ![Care for Your Dog Treats](https://zzrl-003.dx.commercecloud.salesforce.com/on/demandware.store/Sites-acndoggo-Site/en_US/Product-Show?pid=ACNPETS_125&src=commerce-concierge)\n\n3. **Natural Linen Dog Day Bed** - $140\n   \n   - Made from organic, locally sourced, low-impact linen, this bed offers both comfort and sustainability.\n   - [Click here to buy](https://zzrl-003.dx.commercecloud.salesforce.com/on/demandware.store/Sites-acndoggo-Site/en_US/Product-Show?pid=ACNPETS_126&src=commerce-concierge)\n   - ![Natural Linen Dog Day Bed](https://zzrl-003.dx.commercecloud.salesforce.com/on/demandware.store/Sites-acndoggo-Site/en_US/Product-Show?pid=ACNPETS_126&src=commerce-concierge)\n\nFeel free to let me know if you need more information on these products or if there's anything else you're looking for. Would you like to add any of these products to your cart?",
// 	},
// ];

// const askEinstein = async (userInput: string) => {
//     try {
//         // Step 1: Get access token
//         const tokenRes = await fetch("/api/get-access-token", { method: "POST" });
//         const { accessToken } = await tokenRes.json();

//         // Step 2: Start session
//         const sessionRes = await fetch("/api/create-session", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ accessToken }),
//         });
//         const { sessionId } = await sessionRes.json();

//         // Step 3: Send message
//         const messageRes = await fetch("/api/send-message", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ accessToken, sessionId, text: userInput }),
//         });
//         const { message } = await messageRes.json();

//         console.log("Einstein replied:", message);
//     } catch (err) {
//         console.error("Chat error:", err);
//     }
// };

type MessageType = {
	id: string;
	author: string;
	text: string;
};

async function getAccessToken() {
	const chatAccessToken = sessionStorage.getItem("ChatAccessToken");
	if (chatAccessToken) {
		return chatAccessToken;
	}

	const tokenRes = await fetch("/api/get-access-token", { method: "POST" });
	const { accessToken } = await tokenRes.json();
	sessionStorage.setItem("ChatAccessToken", accessToken);

	setTimeout(
		() => {
			sessionStorage.removeItem("ChatAccessToken");
			getAccessToken();
		},
		10 * 60 * 1000,
	);

	return accessToken;
}

async function getIntitialMessage() {
	try {
		const accessToken = await getAccessToken();

		const sessionRes = await fetch("/api/create-session", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ accessToken }),
		});
		const { message, sessionId } = await sessionRes.json();

		if (sessionStorage.getItem("ChatSessionId") !== sessionId) {
			sessionStorage.setItem("ChatSessionId", sessionId);
		}

		setTimeout(
			() => {
				sessionStorage.removeItem("ChatSessionId");
				getIntitialMessage();
			},
			10 * 60 * 1000,
		);

		return message;
	} catch (error) {
		// sessionStorage.removeItem("ChatAccessToken");
		// getIntitialMessage();
		console.error(error);
	}
}

export default function Chat() {
	const [showChat, setShowChat] = useState(false);
	const [minimizeChat, setMinimizeChat] = useState(false);
	const [fullHeight, setFullHeight] = useState(false);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<MessageType[]>([]);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState(false);

	const addMessage = (title: string, author: string) => {
		if (!title) {
			return;
		}
		setMessages((prevMessage) => [
			...prevMessage,
			{
				id: Date.now().toString(),
				author: author,
				text: title,
			},
		]);
	};
	const displayChatHandler = async () => {
		if (messages.length === 0) {
			const text = await getIntitialMessage();
			if (!text) return;
			addMessage(text, "bot");
		}
		setShowChat((prevState) => !prevState);
	};

	const minimizeChatHandler = () => {
		setMinimizeChat((prevState) => !prevState);
	};

	const displayFullHeightHandler = () => {
		setFullHeight((prevState) => !prevState);
	};

	const resetHandler = () => {};

	const sendMessageHandler = async (text: string) => {
		if (isLoading) {
			return;
		}
		const accessToken = sessionStorage.getItem("ChatAccessToken");
		const sessionId = sessionStorage.getItem("ChatSessionId");

		addMessage(text, "user");

		setIsLoading(true);
		setInput("");
		const messageRes = await fetch("/api/send-message", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ accessToken, sessionId, text }),
		});
		const { message } = await messageRes.json();

		addMessage(message, "bot");
		setIsLoading(false);
	};

	const scrollToBottom = useCallback(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	// biome-ignore lint: ''
	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const messageBoxHeight = fullHeight ? "400px" : "238px";

	const bottomMargin = minimizeChat ? "0px" : "10px";

	return (
		<div className={styles.chatContainer} style={{ bottom: bottomMargin }}>
			{!showChat ? (
				<div className={styles.chatIconWrapper}>
					<Image
						src="/images/AI-Chatbot.svg"
						alt="AI Chatbot"
						width={48}
						height={48}
						onClick={displayChatHandler}
					/>
				</div>
			) : (
				<div className={styles.chatWrapper}>
					<div className={styles.chatHeader}>
						<span>SFCC Pro AI</span>
						<div className={styles.buttons}>
							{!fullHeight &&
								(!minimizeChat ? (
									<ChevronDown color="#4F4B53" onClick={minimizeChatHandler} />
								) : (
									<ChevronUp color="#4F4B53" onClick={minimizeChatHandler} />
								))}
							{!fullHeight ? (
								<ArrowUpRight
									color="#4F4B53"
									onClick={displayFullHeightHandler}
								/>
							) : (
								<ArrowDownRight
									color="#4F4B53"
									onClick={displayFullHeightHandler}
								/>
							)}
							<X color="#4F4B53" onClick={displayChatHandler} />
						</div>
					</div>
					{!minimizeChat && (
						<div
							style={{ height: `${messageBoxHeight}` }}
							className={styles.chatMessageContainer}
						>
							{messages.map((message: MessageType) => (
								<Message key={message.id} message={message} />
							))}
							<div ref={messagesEndRef} />
						</div>
					)}
					{!minimizeChat && (
						<div className={styles.inputContainer}>
							<RotateCw onClick={resetHandler} />
							<Input
								placeholder="Enter text here"
								className={styles.input}
								value={input}
								onChange={(e) => setInput(e.target.value)}
							/>
							<SendHorizontal
								color={isLoading ? "#CCCBCE" : "#000000"}
								onClick={() => sendMessageHandler(input)}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
