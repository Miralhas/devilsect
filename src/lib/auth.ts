import { env } from "@/env";
import { Google } from "arctic";

export const google = new Google(
	env.GOOGLE_CLIENT_ID,
	env.GOOGLE_CLIENT_SECRET,
	"http://localhost:3000/api/login/google/callback"
);
