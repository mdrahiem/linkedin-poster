import { Link } from "@remix-run/react";
import { getAuthorizationUrl } from "~/utils/linkedin.server";
import { Linkedin } from "lucide-react";
import { Logo } from "~/components/ui/logo";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="w-full max-w-md space-y-16">
        <Logo />

        <div>
          <Link
            to={getAuthorizationUrl()}
            className="flex justify-center items-center py-4 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            <Linkedin className="mr-3 h-6 w-6" />
            Sign in with LinkedIn
          </Link>
        </div>
      </div>
    </div>
  );
}
