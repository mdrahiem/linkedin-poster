import axios from "axios";

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID as string;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET as string;
const REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI as string;

export function getAuthorizationUrl(redirectTo: string = "/dashboard") {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    state: redirectTo,
    scope: "profile w_member_social openid email",
  });

  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
}

export async function getAccessToken(code: string) {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  const response = await axios.post(
    "https://www.linkedin.com/oauth/v2/accessToken",
    params
  );
  return response.data.access_token;
}
