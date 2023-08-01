import React from 'react';
import Image from 'next/image';

import Panel from '@/src/app/backend/components/layouts/PanelTemplate';

const Media: React.FC = () => {
  return (
    <Panel classes="p-4 flex-col z-[1]" title="Media" expand={true}>
    <div className="flex flex-col">
      <div className="flex justify-center mt-2">
        <Image src="/root/temp.jpg" width={500} height={500} alt="No posts" className="w-[31%] m-1 flex-1" />
        <Image src="/root/temp.jpg" width={500} height={500} alt="No posts" className="w-[31%] m-1 flex-1" />
        <Image src="/root/temp.jpg" width={500} height={500} alt="No posts" className="w-[31%] m-1 flex-1" />
      </div>
      <div className="flex justify-center">
        <Image src="/root/temp.jpg" width={500} height={500} alt="No posts" className="w-[31%] m-1 flex-1" />
        <Image src="/root/temp.jpg" width={500} height={500} alt="No posts" className="w-[31%] m-1 flex-1" />
        <Image src="/root/temp.jpg" width={500} height={500} alt="No posts" className="w-[31%] m-1 flex-1" />
      </div>
    </div>
  </Panel>
  );
};

export default Media;