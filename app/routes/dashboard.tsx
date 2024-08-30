import { LoaderFunction, json, ActionFunction } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { requireAccessToken } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const accessToken = await requireAccessToken(request);
  return json({ accessToken });
};

export default function Dashboard() {
  const { accessToken } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>You are logged in!</p>
      <Form method="post">
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" required />
        </div>
        <div>
          <label htmlFor="hashtags">Hashtags</label>
          <input id="hashtags" name="hashtags" />
        </div>
        <button type="submit">Post to LinkedIn</button>
      </Form>
    </div>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const accessToken = await requireAccessToken(request);
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const hashtags = formData.get("hashtags");

  // Here you would use the LinkedIn API to create a post
  // You can use the accessToken to authenticate the request

  return json({ success: true });
};
