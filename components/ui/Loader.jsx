import Image from "next/image";

export const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
      </div>
      <p className="mt-6 text-white text-lg">Please Wait, this might take some time...</p>
    </div>
  );
};

export const InterPageLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      <p className="mt-6 text-white text-lg">Please Wait, this might take some time...</p>
    </div>
  );
};
