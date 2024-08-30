import { ActionFunctionArgs, LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Form, redirect } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return redirect("/");
  }

  return json({ token });
};

export default function Dashboard() {
  const { token } = useLoaderData<typeof loader>();

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

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const hashtags = formData.get("hashtags");

  // Here you would use the LinkedIn API to create a post
  // You'll need to implement this part using the access token

  return json({ success: true });
};
