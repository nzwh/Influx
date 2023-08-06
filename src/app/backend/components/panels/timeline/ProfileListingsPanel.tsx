import React from 'react';
import Panel from '@/src/app/backend/components/layouts/PanelLayout';
import { useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';
import { UserClass } from '@/libraries/structures';

interface Props {
  user: UserClass;
}

const ProfileListings: React.FC<Props> = ({ user }) => {

  return (
    <Panel classes="flex-row p-4 gap-4">
      <div className="flex flex-row gap-4 items-center">
      <h6 className="text-gray-800 font-regular text-xs leading-4">Listings by @{user.handle}</h6>
      </div>
    </Panel>
  );
};

export default ProfileListings;