// 'use server'

import React, { useState } from 'react';
import Image from 'next/image';

// Layouts
import Wrapper from '@/src/app/backend/components/layouts/WrapperLayout';

// Icons
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CarouselLayout: React.FC<{ media: string[] }> = ({ media }) => {

  const loop = (index: number, length: number) => (index < 0 ? length - 1 : index >= length ? 0 : index);

  const [index, setIndex] = useState(0);
  const handleClickLeft = () => {
    setIndex(loop(index - 1, media.length));
  }
  const handleClickRight = () => {
    setIndex(loop(index + 1, media.length));
  }
  
  return (
    <Wrapper>
      {media && media.length > 0 && (
        <div className={`h-full ${media.length > 1 ? "aspect-square ":""} flex justify-center items-center bg-black bg-opacity-80 rounded-sm relative shadow-xl hover:shadow-2xl transition-shadow duration-400`}>

          <Image className="h-full w-full object-contain rounded-sm" src={media[index]} alt="Images" width={0} height={0} sizes="100%" />

          <div className="absolute left-1/2 transform bottom-6 -translate-x-1/2 flex flex-row gap-3 bg-black bg-opacity-50 py-1 px-2 rounded-full backdrop-blur-sm items-center">
            <ChevronLeft className="cursor-pointer text-violet-300" size={14} strokeWidth={3} onClick={handleClickLeft} />
            <h6 className="text-white font-extralight leading-4 text-[0.65rem] tracking-wide">{`Showing photo ${index + 1} of ${media.length}`}</h6>
            <ChevronRight className="cursor-pointer text-violet-300" size={14} strokeWidth={3} onClick={handleClickRight} />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default CarouselLayout;