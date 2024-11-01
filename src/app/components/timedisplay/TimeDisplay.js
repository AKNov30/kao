// components/TimeDisplay.js
export default function TimeDisplay({ time }) {
    // แปลงเวลาโดยใช้ Date แต่ไม่ต้องแปลงเป็น UTC
    const formattedTime = new Date(`1970-01-01T${time}`).toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  
    return <span>{formattedTime}</span>;
  }
  