import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getValidToken,
  graphqlSessionRequest,
  graphqlChatRequest,
  deleteSessionRequest,
} from "./chatRequest";

export const useChat = () => {
  const { data: tokenData } = useQuery({
    queryKey: ["authToken"],
    queryFn: async () => {
      const data = await getValidToken();
      sessionStorage.setItem("ChatAccessToken", data.getChatAccessTokenHandler.access_token);
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

  return { tokenData, getSession, sendMessage, deleteSession };
};
