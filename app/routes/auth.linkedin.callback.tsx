import { LoaderFunction, redirect } from "@remix-run/node";
import { getAccessToken } from "~/utils/linkedin.server";
import { createUserSession } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state") || "/dashboard";
  if (!code) {
    return redirect("/");
  }

  try {
    const accessToken = await getAccessToken(code);
    return createUserSession(accessToken, state);
  } catch (error) {
    console.error("Error getting access token:", error);
    return redirect("/?error=auth_failed");
  }
};

export default function LinkedInCallback() {
  return <div>Processing your login...</div>;
}
