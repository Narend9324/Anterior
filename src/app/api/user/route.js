
import { query } from "../../../../lib/db";
export async function GET(req) {
  try {
    // Fetch the user from the database
    const result = await query("SELECT * FROM users LIMIT 1");

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ message: "No user found" }), {
        status: 404,
      });
    }

    const user = result.rows[0];
    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
