import { DELETE_SESSION, GET_MESSAGE, GET_SESSION_ID, GET_CHAT_ACCESS_TOKEN } from "@/common/schema";
import { AccessTokenResponse, SessionResponse, MessageResponse, DeleteSessionResponse } from "@/common/type";
import { request } from "graphql-request";

const endpoint = "http://localhost:4000";

export const getValidToken = () => {
    return request<AccessTokenResponse>(
          endpoint,
          GET_CHAT_ACCESS_TOKEN,
          {input: {
            grant_type: "client_credentials",
            client_id: process.env.NEXT_PUBLIC_AGENT_FORCE_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_AGENT_FORCE_CLIENT_SECRET
          }} ,
          {}
        );
}

export const graphqlSessionRequest = async <T = SessionResponse>(): Promise<T> => {
  const token = sessionStorage.getItem("ChatAccessToken");
  if (!token) {
    throw new Error("Could not retrieve access token.");
  }
 
  return request<T>(
    endpoint,
    GET_SESSION_ID,
    {},
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

export const graphqlChatRequest = async <T = MessageResponse>(text: string) : Promise<T> => {
  const token = sessionStorage.getItem("ChatAccessToken");
  const sessionId = sessionStorage.getItem("ChatSessionId");

  if (!token || !sessionId) throw new Error("Token or Session ID missing.");

  const variables = {
    message: text,
    sessionId: sessionId,
  };

  return request<T>(
    endpoint,
    GET_MESSAGE,
    variables,
    {
      Authorization: `Bearer ${token}`,
    }
  );
}

export const deleteSessionRequest  = async <T=DeleteSessionResponse>() : Promise<T> => {
  const token = sessionStorage.getItem("ChatAccessToken");
  const sessionId = sessionStorage.getItem("ChatSessionId");

  if (!token || !sessionId) throw new Error("Token or Session ID missing.");

  const variables = {
    sessionId: sessionId,
  };

  return request<T>(
    endpoint,
    DELETE_SESSION,
    variables,
    {
      Authorization: `Bearer ${token}`,
    }
  );
}