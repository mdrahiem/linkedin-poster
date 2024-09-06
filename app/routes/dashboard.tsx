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
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const hashtags = formData.get("hashtags") as string;

  try {
    const result = await postToLinkedIn(
      accessToken,
      title,
      description,
      hashtags
    );
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">LinkedIn Poster</h1>

      {actionData?.message && (
        <div
          className={`p-4 mb-4 rounded ${
            actionData.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {actionData.message}
        </div>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">You are logged in!</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input id="title" name="title" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea id="description" name="description" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="hashtags" className="text-sm font-medium">
                Hashtags
              </label>
              <Input
                id="hashtags"
                name="hashtags"
                placeholder="#example #linkedin"
              />
            </div>

            <Button type="submit" className="w-full">
              Post to LinkedIn
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
