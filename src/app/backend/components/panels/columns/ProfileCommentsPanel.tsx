import React from 'react';
import Image from 'next/image';

import Panel from '@/src/app/backend/components/layouts/PanelTemplate';

const ProfileComments: React.FC = () => {
  return (
    <Panel classes="flex-col p-4 gap-4 z-[1]" title="Comments">
      <div className="flex flex-col justify-center gap-1">
        <div className="flex flex-row items-center gap-1">
          <Image className="rounded-full" src="/avatars/temp.jpg" alt="Shop Icon" width={10} height={10} />
          <h6 className="text-gray-800 font-regular text-[0.65rem] leading-3">Influx HQ</h6>
          <h6 className="text-gray-500 font-regular text-[0.65rem] leading-3">@influx.io&ensp;•&ensp;9h ago</h6>
        </div>
        <h6 className="text-gray-800 font-regular text-sm tracking-tight leading-4">Still available?</h6>
        <h6 className="text-gray-400 font-light text-[0.65rem] leading-3">Commented on @thmwlch listing  “Apple MacBook Air - Gold (Renewed)”</h6>
      </div>

      <div className="flex flex-col justify-center gap-1">
        <div className="flex flex-row items-center gap-1">
          <Image className="rounded-full" src="/avatars/temp.jpg" alt="Shop Icon" width={10} height={10} />
          <h6 className="text-gray-800 font-regular text-[0.65rem] leading-3">PledisEnt</h6>
          <h6 className="text-gray-500 font-regular text-[0.65rem] leading-3">@pledis&ensp;•&ensp;2d ago</h6>
        </div>
        <h6 className="text-gray-800 font-regular text-sm tracking-tight leading-4">I sent at DM pls repsond ^^</h6>
        <h6 className="text-gray-400 font-light text-[0.65rem] leading-3">Commented on @mingyu listing  “PBT Carbon Keycaps for Mechanical Keyboards”</h6>
      </div>
    </Panel>
  );
};

export default ProfileComments;