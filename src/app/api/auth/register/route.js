// app/api/auth/register/route
import bcrypt from "bcrypt";
import db from "../../db";

export async function POST(req) {
  const { username, password, role } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.execute("INSERT INTO users (username, password, user_role) VALUES (?, ?, ?)", [username, hashedPassword, role || 'user']);
    return new Response("User registered successfully", { status: 201 });
  } catch (error) {
    console.error("Error registering user:", error);
    return new Response("Error registering user", { status: 500 });
  } finally {
    db.end();
  }
}