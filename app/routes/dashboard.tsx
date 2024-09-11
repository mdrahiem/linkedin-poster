import { json, ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { requireAccessToken } from "~/utils/session.server";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { postToLinkedIn } from "~/utils/linkedin";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const accessToken = await requireAccessToken(request);
  return json({ accessToken });
};

export const action: ActionFunction = async ({ request }) => {
  const accessToken = await requireAccessToken(request);
  const formData = await request.formData();
  const description = formData.get("description") as string;
  const hashtags = formData.get("hashtags") as string;

  try {
    const result = await postToLinkedIn(accessToken, description, hashtags);
    console.log("Posted to LinkedIn:", result);
    return json({ success: true, message: "Posted successfully to LinkedIn" });
  } catch (error) {
    console.error("Error posting to LinkedIn:", error);
    return json(
      { success: false, message: "Failed to post to LinkedIn" },
      { status: 500 }
    );
  }
};

export default function Dashboard() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="container mx-auto p-8 max-w-md">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        LinkedIn Poster
      </h1>

      {actionData?.message && (
        <div
          className={`p-4 mb-6 rounded ${
            actionData.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {actionData.message}
        </div>
      )}

      <Card className="shadow-md mb-8 border border-gray-200">
        <CardHeader className="bg-gray-50 p-4">
          <CardTitle className="text-lg font-semibold text-gray-700">
            Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">You are logged in!</p>
        </CardContent>
      </Card>

      <Card className="shadow-md border border-gray-200">
        <CardHeader className="bg-gray-50 p-4">
          <CardTitle className="text-lg font-semibold text-gray-700">
            Create a New Post
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Form method="post" className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                required
                className="w-full border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="hashtags"
                className="text-sm font-medium text-gray-700"
              >
                Hashtags
              </label>
              <Input
                id="hashtags"
                name="hashtags"
                placeholder="#example #linkedin"
                className="w-full border-gray-300"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Post to LinkedIn
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
