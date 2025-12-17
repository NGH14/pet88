
import { betterAuth } from "better-auth";

const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  url: process.env.BETTER_AUTH_UL,
  emailAndPassword: {
    enabled: true,
  },
});

async function test() {
  try {
    // Access the API directly from the auth instance
    const user = await auth.api.signUpEmail({
      body: {
        email: "test@test.com",
        password: "password",
        name: "Test User" // Better Auth usually requires a name by default
      }
    });

    console.log("User registered:", user);
  } catch (error) {
    // Better Auth throws structured errors
    console.error("Registration failed:", error.message);
  }
}

test();