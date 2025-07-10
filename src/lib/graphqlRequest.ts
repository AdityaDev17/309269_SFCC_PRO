import { GET_ACCESS_TOKEN } from "@/common/schema";
import { request } from "graphql-request";
 
const endpoint = "https://i3bbw2uveg.execute-api.us-east-1.amazonaws.com/dev/graphql";
 
const AUTH_HEADER =
  "Basic NjgyMjQ3NDItNGU2ZC00NWUzLWFjZjctMmI3NWQ1ZDJiZGIwOjc4NlliZ1E1SF9TS2FMbXloOHctNXNUOFF6YThvNnNtQnJTWTBIOG5SRGs=";
 
// Token helper: fetch and store tokens
export const fetchToken = async (isRefresh = false): Promise<string | null> => {
  const input: any = {
    grantType: isRefresh ? "refresh_token" : "client_credentials",
  };
 
  if (isRefresh) {
    const refreshToken = sessionStorage.getItem("refresh_token");
    const refreshExpiry = sessionStorage.getItem("refresh_token_expiry");
    const isRefreshExpired = refreshExpiry && Date.now() >= parseInt(refreshExpiry, 10);

    if (!refreshToken || isRefreshExpired) {
      console.warn("Refresh token expired or missing.Falling back to client_credentials.");
      return fetchToken(false); // fallback
    }
    input.refreshToken = refreshToken;
  }
 
  try {
    const data = await request<any>(
      endpoint,
      GET_ACCESS_TOKEN,
      { input },
      {
        Authorization: AUTH_HEADER,
      }
    );
 
    const tokenData = data?.getAccessToken;
    if (!tokenData?.access_token) {
      console.error("Invalid token response");
      return null;
    }
 
    // Store tokens
    sessionStorage.setItem("access_token", tokenData.access_token);
    sessionStorage.setItem("id_token", tokenData.id_token);
    sessionStorage.setItem("refresh_token", tokenData.refresh_token);
    sessionStorage.setItem("expires_in", tokenData.expires_in.toString());
    sessionStorage.setItem(
      "refresh_token_expires_in",
      tokenData.refresh_token_expires_in.toString()
    );
    sessionStorage.setItem("token_type", tokenData.token_type);
    sessionStorage.setItem("usid", tokenData.usid);
    sessionStorage.setItem("customer_id", tokenData.customer_id);
    sessionStorage.setItem("enc_user_id", tokenData.enc_user_id);
    sessionStorage.setItem("idp_access_token", tokenData.idp_access_token);
    sessionStorage.setItem("idp_refresh_token", tokenData.idp_refresh_token);
 
    const expiryTime = Date.now() + tokenData.expires_in * 1000;
    const refreshExpiryTime = Date.now() + tokenData.refresh_token_expires_in * 1000;
    sessionStorage.setItem("sfcc_token_expiry", expiryTime.toString());
    sessionStorage.setItem("refresh_token_expiry", refreshExpiryTime.toString());


    const customerType = tokenData.idp_access_token ? "registered" : "guest";
    sessionStorage.setItem("customer_type", customerType);
 
    console.log("Token fetched successfully");
    // console.log(tokenData.access_token);
    return tokenData.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};
 
// Validate and return access token
  const getValidToken = async (): Promise<string | null> => {
  const expiry = sessionStorage.getItem("sfcc_token_expiry");
  const isExpired = !expiry || Date.now() >= parseInt(expiry, 10);
 
  if (isExpired) {
    console.log("Token expired or missing. Refreshing...");
    const refreshExpiry = sessionStorage.getItem("refresh_token_expiry");
    const isRefreshExpired = refreshExpiry && Date.now() >= parseInt(refreshExpiry, 10);

    if (isRefreshExpired) {
      console.warn("Refresh token also expired. Will use client_credentials.");
    }
    return await fetchToken(true);
  }
 
  const accessToken = sessionStorage.getItem("access_token");
  if (!accessToken) {
    console.warn("Access token missing in sessionStorage. Fetching a new one...");
    return await fetchToken(false);
  }

  console.log("Using valid stored access token.");
  return accessToken;
};
 
// Main request function
export const graphqlRequest = async <T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T> => {
  const token = await getValidToken();
  
  
  if (!token) {
    throw new Error("Could not retrieve access token.");
  }
 
  return request<T>(
    endpoint,
    query,
    variables,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};