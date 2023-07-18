import React, { useState, useRef } from 'react';
import Link from 'next/link';

export default function RegisterCompletePopup() {
  return (
    <main className="text-gray-800 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-sm p-6 w-96 flex flex-col gap-2 z-[50]">
				<Link href="/auth/login">sadd</Link>
      </div>
    </main>
  );
};