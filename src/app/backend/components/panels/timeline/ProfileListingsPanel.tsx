import React from 'react';
import Panel from '@/src/app/backend/components/layouts/PanelLayout';
import { useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';

const ProfileListings: React.FC = () => {

  const { user } = useGlobalContext();

  return (
    <Panel classes="flex-row p-4 gap-4">
      <div className="flex flex-row gap-4 items-center">
      <h6 className="text-gray-800 font-regular text-xs leading-4">Listings by @{user.handle}</h6>
      </div>
    </Panel>
  );
};

export default ProfileListings;