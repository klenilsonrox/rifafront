// components/Loading.js
import React from 'react';

const Loading = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-20">
    <div className="flex items-center justify-center space-x-2">
      <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-[#1f1e1e]" />
      <p className="text-white text-xl">Carregando...</p>
    </div>
  </div>
);

export default Loading;
