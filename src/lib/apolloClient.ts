import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { ApolloLink, HttpLink } from "@apollo/client";

const basicAuth =
  "NjgyMjQ3NDItNGU2ZC00NWUzLWFjZjctMmI3NWQ1ZDJiZGIwOjc4NlliZ1E1SF9TS2FMbXloOHctNXNUOFF6YThvNnNtQnJTWTBIOG5SRGs=";

const bearerToken =
  "eyJ2ZXIiOiIxLjAiLCJqa3UiOiJzbGFzL3Byb2QvenpybF8wMDMiLCJraWQiOiJhOWY5NjIwOC0yNzU2LTQ3NzctODM2YS0zYWNiOWE4MTUxOTAiLCJ0eXAiOiJqd3QiLCJjbHYiOiJKMi4zLjQiLCJhbGciOiJFUzI1NiJ9.eyJhdXQiOiJHVUlEIiwic2NwIjoic2ZjYy5zaG9wcGVyLW15YWNjb3VudC5iYXNrZXRzIGNfbG95YWx0eUluZm9fciBzZmNjLnNob3BwZXItZGlzY292ZXJ5LXNlYXJjaCBzZmNjLnNob3BwZXItbXlhY2NvdW50LmFkZHJlc3NlcyBzZmNjLnNob3BwZXItcHJvZHVjdHMgc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5ydyBzZmNjLnNob3BwZXItbXlhY2NvdW50LnBheW1lbnRpbnN0cnVtZW50cyBzZmNjLnNob3BwZXItY3VzdG9tZXJzLmxvZ2luIHNmY2Muc2hvcHBlci1zdG9yZXMgc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5vcmRlcnMgc2ZjYy5zaG9wcGVyLWJhc2tldHMtb3JkZXJzIHNmY2Muc2hvcHBlci1jdXN0b21lcnMucmVnaXN0ZXIgc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5hZGRyZXNzZXMucncgc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5wcm9kdWN0bGlzdHMucncgc2ZjYy5zaG9wcGVyLXByb2R1Y3RsaXN0cyBzZmNjLnNob3BwZXItcHJvbW90aW9ucyBzZmNjLnNob3BwZXItYmFza2V0cy1vcmRlcnMucncgY19jYW5jZWxvcmRlciBzZmNjLnNob3BwZXItZ2lmdC1jZXJ0aWZpY2F0ZXMgc2ZjYy5zaG9wcGVyLW15YWNjb3VudC5wYXltZW50aW5zdHJ1bWVudHMucncgc2ZjYy5zaG9wcGVyLXByb2R1Y3Qtc2VhcmNoIHNmY2Muc2hvcHBlci1teWFjY291bnQucHJvZHVjdGxpc3RzIHNmY2Muc2hvcHBlci1jYXRlZ29yaWVzIHNmY2Muc2hvcHBlci1teWFjY291bnQiLCJzdWIiOiJjYy1zbGFzOjp6enJsXzAwMzo6c2NpZDo2ODIyNDc0Mi00ZTZkLTQ1ZTMtYWNmNy0yYjc1ZDVkMmJkYjA6OnVzaWQ6NDVkN2VjZGItNDRkNy00MTkzLThiY2ItZDU5MjA2NzJlMzUyIiwiY3R4Ijoic2xhcyIsImlzcyI6InNsYXMvcHJvZC96enJsXzAwMyIsImlzdCI6MSwiZG50IjoiMCIsImF1ZCI6ImNvbW1lcmNlY2xvdWQvcHJvZC96enJsXzAwMyIsIm5iZiI6MTc0ODMzNTQwNSwic3R5IjoiVXNlciIsImlzYiI6InVpZG86c2xhczo6dXBuOkd1ZXN0Ojp1aWRuOkd1ZXN0IFVzZXI6OmdjaWQ6YWJsYnRJbDB0SHhlZ1JsYnBJbFdZWWtySVg6OmNoaWQ6YWNjUHJvIiwiZXhwIjoxNzQ4MzM3MjM1LCJpYXQiOjE3NDgzMzU0MzUsImp0aSI6IkMyQzQ5MTE2MTMxNDAtMTg4NTEzNzc3NTI3MDA5OTM1ODI2NTUyOTUwIn0.bJADHRxnwyJ7c9wUmnEWqDOSPmits71xQybNRTXqqBdw0kPkPgAnK45tQYF2IOQM6y5O6VWCvNNlBjlJAkH6ig"; // truncated for brevity

const authLink = new ApolloLink((operation, forward) => {
  const useBasicAuth = operation.operationName === "BasicAuth";

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: useBasicAuth
        ? `Basic ${basicAuth}`
        : `Bearer ${bearerToken}`,
    },
  }));

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000", 
});

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
});
