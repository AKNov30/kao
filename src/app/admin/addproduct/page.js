"use client";
import { useState } from "react";
import AlertSuccess from "@/app/components/alert/AlertSuccess";

export default function AddProductPage() {
  const [productName, setProductName] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [image, setImage] = useState(null);
  const [typeBet, setTypeBet] = useState("daily");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // แปลงไฟล์เป็น base64
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // อัปโหลดรูปภาพไปยัง Cloudinary
      const imageUploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });

      const { url: imageUrl } = await imageUploadRes.json();

      // บันทึกข้อมูลลงในฐานข้อมูลพร้อมกับ URL ของรูปภาพ
      const res = await fetch("/api/admin/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lottery_name: productName,
          close_time: closeTime,
          status: "open",
          image_url: imageUrl,
          type_bet: typeBet,
        }),
      });

      if (res.ok) {
        setShowSuccessAlert(true);
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the product.");
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Add Product
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {showSuccessAlert && (
          <AlertSuccess
            message="Product added successfully!"
            onClose={() => setShowSuccessAlert(false)}
          />
        )}
        {!showSuccessAlert && (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setProductName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Close time
              </label>
              <div className="mt-2">
                <input
                  type="time"
                  onChange={(e) => setCloseTime(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Type of Bet
              </label>
              <div className="mt-2">
                <select
                  onChange={(e) => setTypeBet(e.target.value)}
                  value={typeBet}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  required
                >
                  <option value="daily">รายวัน</option>
                  <option value="government">รัฐบาล</option>
                  <option value="thai">ไทย</option>
                  <option value="international">ต่างประเทศ</option>
                  <option value="stock">หุ้น</option>
                  <option value="stock_v">หุ้นวี</option>
                  <option value="other">อื่น ๆ</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Image
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-indigo-500 file:bg-indigo-600 file:text-white file:border-none file:mr-4 file:px-4 file:py-2 file:rounded file:cursor-pointer hover:file:bg-indigo-700"
                required
              />

              {image && (
                <>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 text-indigo-600 hover:underline"
                  >
                    Preview Image
                  </button>
                  {isModalOpen && (
                    <div
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                      onClick={() => setIsModalOpen(false)}
                    >
                      <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img
                          src={image}
                          alt="Preview"
                          className="h-96 w-auto object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
