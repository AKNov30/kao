// app/api/home/route.js
import db from "../db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // ใช้ db เพื่อ query ข้อมูลจากตาราง bets
    const [rows] = await db.query("SELECT * FROM bets");

    // ส่งข้อมูลกลับในรูปแบบ JSON โดยใช้ NextResponse
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching data from bets table:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}