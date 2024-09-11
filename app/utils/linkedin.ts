import axios from "axios";

export async function postToLinkedIn(
  accessToken: string,
  description: string,
  hashtags: string
) {
  const url = "https://api.linkedin.com/v2/ugcPosts";
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  // First, get the user's profile information
  const profileResponse = await axios.get(
    "https://api.linkedin.com/v2/userinfo",
    {
      headers,
    }
  );
  const personId = profileResponse.data.sub as string;

  const payload = {
    author: `urn:li:person:${personId}`,
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: `${description}\n\n${hashtags}`,
        },
        shareMediaCategory: "NONE",
      },
    },
  };

  try {
    const response = await axios.post(url, payload, { headers });
    return response.data;
  } catch (error) {
    console.error(
      "Error posting to LinkedIn:",
      error.response?.data || error.message
    );
    throw error;
  }
}
