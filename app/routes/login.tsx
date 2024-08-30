import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, useSearchParams } from "@remix-run/react";
import { getAccessToken } from "~/utils/session.server";
import { getAuthorizationUrl } from "~/utils/linkedin.server";

export const loader: LoaderFunction = async ({ request }) => {
  const accessToken = await getAccessToken(request);
  if (accessToken) {
    // If user is already logged in, redirect to dashboard
    return redirect("/dashboard");
  }
  return null;
};

export default function Login() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  return (
    <div>
      <h1>Login</h1>
      <Link to={getAuthorizationUrl(redirectTo)}>Login with LinkedIn</Link>
    </div>
  );
}
