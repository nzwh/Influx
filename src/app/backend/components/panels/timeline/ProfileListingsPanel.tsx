import React from 'react';

import Panel from '@/src/app/backend/components/layouts/PanelTemplate';

interface Props {
  handle: string;
}

const ProfileListings: React.FC<Props> = ({ handle }) => {
  return (
    <Panel classes="flex-row p-4 gap-4">
      <div className="flex flex-row gap-4 items-center">
      <h6 className="text-gray-800 font-regular text-xs leading-4">Listings by @{handle}</h6>
      </div>
    </Panel>
  );
};

export default ProfileListings;