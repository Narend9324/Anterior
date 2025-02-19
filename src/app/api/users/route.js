import { query } from "../../../../lib/db";

export async function GET(req) {
  try {
    // Fetch the total number of users from the database
    const totalUsersResult = await query("SELECT COUNT(*) FROM users");
    const totalUsers = totalUsersResult.rows[0].count;

    // Fetch user data (you can modify the query as per your needs)
    const userResult = await query("SELECT * FROM users LIMIT 1");

    if (userResult.rows.length === 0) {
      return new Response(
        JSON.stringify({
          message: "No user found",
          totalUsers,
        }),
        { status: 404 }
      );
    }

    const user = userResult.rows;

    // Return both total users count and user data
    return new Response(
      JSON.stringify({
        totalUsers,
        user,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
