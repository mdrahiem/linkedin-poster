import { Link } from "@remix-run/react";
import { getAuthorizationUrl } from "~/utils/linkedin.server";

export default function Index() {
  return (
    <div>
      <h1>LinkedIn Poster</h1>
      <Link to={getAuthorizationUrl()}>Login with LinkedIn</Link>
    </div>
  );
}
