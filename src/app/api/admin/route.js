import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Mock admin user (Replace with DB call if needed)
const adminUser = {
  username: "admin",
  passwordHash: bcrypt.hashSync("admin123", 10), // Simulated hash
};

export async function POST(req) {
  const { username, password } = await req.json();

  if (username !== adminUser.username) {
    return new Response(JSON.stringify({ message: "Invalid username" }), {
      status: 401,
    });
  }

  const isPasswordValid = bcrypt.compareSync(password, adminUser.passwordHash);
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: "Invalid password" }), {
      status: 401,
    });
  }

  // Create JWT token
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
