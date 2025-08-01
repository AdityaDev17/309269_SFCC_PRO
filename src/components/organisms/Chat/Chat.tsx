"use client";
import type { MessageType } from "@/common/type";
import Input from "@/components/atomic/Input/Input";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import {
	deleteSessionRequest,
	getValidToken,
	graphqlChatRequest,
	graphqlSessionRequest,
} from "./chatRequest";

export default function Chat() {
	const [showChat, setShowChat] = useState(false);
	const [minimizeChat, setMinimizeChat] = useState(false);
	const [fullHeight, setFullHeight] = useState(false);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<MessageType[]>([]);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const chatContainerRef = useRef<HTMLDivElement>(null);
	const { data: tokenData, isSuccess } = useQuery({
		queryKey: ["authToken"],
		queryFn: async () => {
			const data = await getValidToken();
			sessionStorage.setItem(
				"ChatAccessToken",
				data.getChatAccessTokenHandler.access_token,
			);
			return data.getChatAccessTokenHandler.access_token;
		},
		refetchInterval: 10 * 60 * 1000,
	});
	const getSession = useMutation({
		mutationFn: graphqlSessionRequest,
	});
	const sendMessage = useMutation({
		mutationFn: (text: string) => graphqlChatRequest(text),
	});
	const deleteSession = useMutation({
		mutationFn: deleteSessionRequest,
	});

	const addMessage = (title: string, author: string) => {
		if (!title) {
			return;
		}
		setMessages((prevMessage) => [
			...prevMessage,
			{
				id: crypto.randomUUID(),
				author: author,
				text: title,
			},
		]);
	};

	const setInitialMessage = () => {
		getSession.mutate(undefined, {
			onSuccess: (data) => {
				if (!data || !data.getSessionIdHandler) {
					console.error("Invalid session response", data);
					return;
				}
				const { sessionId, messages } = data.getSessionIdHandler;
				sessionStorage.setItem("ChatSessionId", sessionId);
				if (messages) addMessage(messages[0]?.message, "bot");
			},
			onError: (error) => {
				console.error("Error fetching session ID:", error);
			},
		});
	};

	const toggleChatVisibility = () => {
		if (messages.length === 0) return;
		setShowChat((prevState) => !prevState);
	};

	const toggleMinimizeChat = () => setMinimizeChat((prevState) => !prevState);

	const toggleFullHeightChat = () => setFullHeight((prevState) => !prevState);

	const resetHandler = () => {
		deleteSession.mutate(undefined, {
			onSuccess: (data) => {
				setMessages([]);
				setInitialMessage();
			},
			onError: (error) => {
				console.error("Mutation error:", error);
			},
		});
	};

	const sendMessageHandler = async (text: string) => {
		if (sendMessage.isPending) {
			return;
		}

		addMessage(text, "user");

		setInput("");
		sendMessage.mutate(text, {
			onSuccess: (data) => {
				const message = data?.getMessageHandler?.messages[0]?.message;
				addMessage(message, "bot");
			},
			onError: (error) => {
				console.error("Mutation error:", error);
			},
		});
	};

	const onKeyDownHandler = (
		e: React.KeyboardEvent<HTMLInputElement>,
		input: string,
	) => {
		if (e.key !== "Enter") return;
		sendMessageHandler(input);
	};

	const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
		messagesEndRef.current?.scrollIntoView({ behavior });
	};

	// biome-ignore lint: ''
	useEffect(() => {
		scrollToBottom("smooth");
	}, [messages]);

	// biome-ignore lint: ''
	useEffect(() => {
		scrollToBottom("auto");
	}, [showChat]);

	// biome-ignore lint: ''
	useEffect(() => {
		if(isSuccess) setInitialMessage();
	}, [isSuccess]);

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
						onClick={toggleChatVisibility}
					/>
				</div>
			) : (
				<div className={styles.chatWrapper}>
					<div className={styles.chatHeader}>
						<span>SFCC Pro AI</span>
						<div className={styles.buttons}>
							{!fullHeight &&
								(!minimizeChat ? (
									<ChevronDown
										color="#4F4B53"
										onClick={toggleMinimizeChat}
										className={styles.icon}
									/>
								) : (
									<ChevronUp
										color="#4F4B53"
										onClick={toggleMinimizeChat}
										className={styles.icon}
									/>
								))}
							{!fullHeight ? (
								<ArrowUpRight
									color="#4F4B53"
									onClick={toggleFullHeightChat}
									className={styles.icon}
								/>
							) : (
								<ArrowDownRight
									color="#4F4B53"
									onClick={toggleFullHeightChat}
									className={styles.icon}
								/>
							)}
							<X
								color="#4F4B53"
								onClick={toggleChatVisibility}
								className={styles.icon}
							/>
						</div>
					</div>
					{!minimizeChat && (
						<>
							<div
								style={{ height: `${messageBoxHeight}` }}
								className={styles.chatMessageContainer}
								ref={chatContainerRef}
							>
								{messages.map((message: MessageType) => (
									<Message key={message.id} message={message} />
								))}
								{sendMessage.isPending && (
									<div className={styles.typingBubble}>
										<div className={styles.dot} />
										<div className={styles.dot} />
										<div className={styles.dot} />
									</div>
								)}
								<div ref={messagesEndRef} />
							</div>
							<div className={styles.inputContainer}>
								<RotateCw onClick={resetHandler} className={styles.icon} />
								<Input
									placeholder="Enter text here"
									className={styles.input}
									value={input}
									onChange={(e) => setInput(e.target.value)}
									onKeyDown={(e) => onKeyDownHandler(e, input)}
								/>
								<SendHorizontal
									color={sendMessage.isPending ? "#CCCBCE" : "#000000"}
									onClick={() => sendMessageHandler(input)}
									className={styles.icon}
								/>
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);
}
