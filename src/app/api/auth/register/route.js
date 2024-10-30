// app/api/auth/register/route
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";

export async function POST(req) {
  const { username, password, role } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  const db = await mysql.createConnection(process.env.DATABASE_URL);

  try {
    await db.execute("INSERT INTO users (username, password, user_role) VALUES (?, ?, ?)", [username, hashedPassword, role]);
    return new Response("User registered successfully", { status: 201 });
  } catch (error) {
    console.error("Error registering user:", error);
    return new Response("Error registering user", { status: 500 });
  } finally {
    db.end();
  }
}