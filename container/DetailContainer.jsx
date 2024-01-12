"use client";
import Link from "next/link";
import { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FaShareAlt } from "react-icons/fa";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DetailContainer = ({ detailinfo }) => {
  const images = [detailinfo.image1, detailinfo.image2, detailinfo.image3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  const handleShare = () => {
    const shareUrl = window.location.href;
    copyToClipboard(shareUrl);
    toast.success("Bağlantı Kopyalandı");
  };

  const copyToClipboard = (text) => {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const nextImage = () => {
    setCurrentImageIndex((nextIndex) => (nextIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handlePayment = async () => {
    const { data } = await axios.post("/api/payment", {
      name: ` ${detailinfo.brand}  ${detailinfo.model}`,
      description: detailinfo.description,
      carId: detailinfo.id,
    });
    router.push(data.url);
    console.log(data);
  };

  return (
    <div className="lg:max-w-screen-xl md:max-w-screen-xs mx-auto mt-20 mb-52">
      <div className="grid grid-cols-1  md:grid-cols-3 justify-center mx-auto w-fit border-b-2 border-gray-700">
        <img
          src={detailinfo.image1}
          alt={(detailinfo.brand, " | ", detailinfo.model)}
          className="md:w-[400px]  h-[200px] hidden md:block"
        />
        <img
          src={detailinfo.image2}
          alt={(detailinfo.brand, " | ", detailinfo.model)}
          className="md:w-[400px]  h-[200px]  hidden md:block"
        />
        <img
          src={detailinfo.image3}
          alt={(detailinfo.brand, " | ", detailinfo.model)}
          className="md:w-[400px]  h-[200px] hidden md:block"
        />
        {/* Mobil resim  */}
        <img
          src={images[currentImageIndex]}
          alt={(detailinfo.brand, " | ", detailinfo.model)}
          className="md:w-[400px]  h-[200px]  md:hidden"
        />
      </div>
      <div className="flex justify-between mx-4 md:hidden">
        <button
          className="font-semibold text-xl rounded-full bg-gray-200 p-2 hover:bg-gray-300"
          onClick={previousImage}
        >
          <GrPrevious />
        </button>
        <button
          className="font-semibold text-xl rounded-full bg-gray-200 p-2 hover:bg-gray-300"
          onClick={nextImage}
        >
          <GrNext />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 mt-5 mx-auto w-full p-5 justify-center gap-y-5 border-b-2 border-gray-700">
        <div className="text-md flex flex-col gap-y-5 font-bold uppercase mx-3 md:mx-1">
          <h2>Marka</h2>
          <h2>Model</h2>
          <h2>Yakıt</h2>
          <h2>Gövde</h2>
          <h2>Vites</h2>
        </div>
        <div className="text-md flex flex-col gap-y-5">
          <span>{detailinfo.brand}</span>
          <span>{detailinfo.model}</span>
          <span>{detailinfo.fuel}</span>
          <span>{detailinfo.body}</span>
          <span>{detailinfo.gear}</span>
        </div>
        <div className="text-md flex flex-col gap-y-5 font-bold uppercase mx-3 md:mx-1">
          <h2>Renk</h2>
          <h2>Motor</h2>
          <h2>Yıl</h2>
          <h2>Max Hız</h2>
          <h2>Fiyat</h2>
        </div>
        <div className="text-md flex flex-col  gap-y-5">
          <span>{detailinfo.color}</span>
          <span>{detailinfo.engine}</span>
          <span>{detailinfo.year}</span>
          <span>{detailinfo.speed} Km/sa</span>
          <span>{detailinfo.price} ₺</span>
        </div>
      </div>
      <div className="full mt-3 mx-3 bg-zinc-300 p-3">
        <h2 className="text-md font-bold uppercase ">Açıklama</h2>
        <p>{detailinfo.description}</p>
      </div>
      <div className="flex items-center justify-between mx-5">
        <div className="flex gap-x-5">
          <button
            onClick={handleShare}
            className="font-bold flex text-white  items-center gap-x-2 p-2 mt-4 bg-slate-700 hover:bg-slate-900"
          >
            <FaShareAlt /> Paylaş
          </button>

          <Link
            href="https://wa.me/15551234567"
            className="font-bold flex text-white  items-center gap-x-2 p-2 mt-4 bg-slate-700 hover:bg-slate-800"
          >
            <BsWhatsapp /> İletişim
          </Link>
        </div>

        <button
          onClick={handlePayment}
          className="text-white bg-gradient-to-r from-cyan-500 mt-4 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Satın al
        </button>
      </div>
    </div>
  );
};

export default DetailContainer;
