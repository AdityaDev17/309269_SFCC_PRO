import { fetchToken } from "./graphqlRequest"


export const clearSession = () => {
  const keysToRemove = [
    "access_token",
    "id_token",
    "refresh_token",
    "expires_in",
    "refresh_token_expires_in",
    "token_type",
    "usid",
    "customer_id",
    "enc_user_id",
    "idp_access_token",
    "idp_refresh_token",
    "sfcc_token_expiry",
    "refresh_token_expiry",
    "customer_type",
    "basketId"
  ]

  keysToRemove.forEach((key) => {
    sessionStorage.removeItem(key)
  })
}


export const triggerAuthStatusChange = () => {
  window.dispatchEvent(new CustomEvent("authStatusChanged"))
}


export const handlePostLogoutTokenRefresh = async () => {
  try {
    console.log("Fetching new guest token after logout...")

    
    clearSession()

    
    const newToken = await fetchToken(false)

    if (newToken) {
      console.log("New guest token obtained successfully")
      triggerAuthStatusChange()
      return true
    } else {
      console.error("Failed to obtain new guest token")
      return false
    }
  } catch (error) {
    console.error("Error during post-logout token refresh:", error)
    return false
  }
}
