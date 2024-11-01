"use client";
import { useEffect, useState } from "react";
import TimeDisplay from "../components/timedisplay/TimeDisplay";
import Link from "next/link"; // นำเข้า Link

export default function HomePage() {
  const [bets, setBets] = useState({
    daily: [],
    international: [],
    stock: [],
    stock_v: [],
    other: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/home");
        const data = await response.json();

        // แยกประเภทข้อมูลตาม type_bet
        const categorizedBets = {
          daily: data.filter((bet) => bet.type_bet === "daily"),
          international: data.filter((bet) => bet.type_bet === "international"),
          stock: data.filter((bet) => bet.type_bet === "stock"),
          stock_v: data.filter((bet) => bet.type_bet === "stock_v"),
          other: data.filter((bet) => bet.type_bet === "other"),
        };

        setBets(categorizedBets);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // ฟังก์ชันสำหรับการสร้างคอมโพเนนต์รายการของประเภทต่าง ๆ
  const renderBets = (betsArray, title) => (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 4xl:grid-cols-6 gap-4">
        {betsArray.map((bet) => (
          <Link key={bet.bet_id} href={`/home/${bet.bet_id}`}>
          <div className="border-l-8 hover:border-l-[10px] border-blue-500 hover:border-green-500 rounded-lg p-3 shadow-lg bg-white cursor-pointer ">
            <div className="flex items-center mb-2">
              <img
                src={bet.image_url}
                alt={bet.lottery_name}
                className="w-[74px] h-[44px] object-cover rounded mr-2"
              />
              <div className="pl-2">
                <h3 className="text-lg font-semibold">{bet.lottery_name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString("th-TH")}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                2:36:44
              </span>
              <span
                className="text-xs font-bold py-1 px-3 rounded-full bg-red-500 text-white"
              >
                ปิดรับ <TimeDisplay time={bet.close_time} />
              </span>
            </div>
          </div>
        </Link>
        
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {renderBets(bets.daily, "รายวัน")}
      {renderBets(bets.international, "ต่างประเทศ")}
      {renderBets(bets.stock, "หุ้น")}
      {renderBets(bets.stock_v, "หุ้นวี")}
      {renderBets(bets.other, "อื่น ๆ")}
    </div>
  );
}
