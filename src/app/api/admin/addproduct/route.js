// app/api/admin/addproduct/route.js
import mysql from "mysql2/promise";

export async function POST(req) {
  const { lottery_name, close_time, status, image_url, type_bet } = await req.json();
  const db = await mysql.createConnection(process.env.DATABASE_URL);

  try {
    await db.execute(
      "INSERT INTO bets (lottery_name, close_time, status, image_url, type_bet) VALUES (?, ?, ?, ?, ?)",
      [lottery_name, close_time, status, image_url, type_bet]
    );
    return new Response("Product added successfully", { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return new Response("Error adding product", { status: 500 });
  } finally {
    db.end();
  }
}
