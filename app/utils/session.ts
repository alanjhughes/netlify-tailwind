import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "reppy-session",
      httpOnly: true,
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET || "secret"],
      path: "/",
    },
  });

export async function getUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return {
    session,
    authenticated: session.has("token"),
    token: session.get("token"),
  };
}

export { getSession, commitSession, destroySession };
