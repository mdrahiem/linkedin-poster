import { LoaderFunction, redirect } from "@remix-run/node";
import { getAccessToken } from "~/utils/linkedin.server";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return redirect("/");
  }

  try {
    const accessToken = await getAccessToken(code);

    // In a real application, you'd want to store this token securely,
    // typically in a server-side session or encrypted cookie.
    // For this example, we'll just redirect to a success page.
    console.log("Access token:", accessToken);
    return redirect("/dashboard?token=" + accessToken);
  } catch (error) {
    console.error("Error getting access token:", error);
    return redirect("/?error=auth_failed");
  }
};

export default function LinkedInCallback() {
  return <div>Processing your login...</div>;
}
