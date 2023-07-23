import React from 'react';

import Panel from '@/src/app/backend/components/template/PanelTemplate';
import { RotateCcw, Star } from 'lucide-react';

interface Props {
  handle: string;
}

const Explore: React.FC<Props> = ({ handle }) => {
  return (
    <Panel classes="flex-row p-4 gap-4">
      <div className="flex flex-row gap-4 items-center">
      <h6 className="text-gray-800 font-regular text-xs leading-4">Explore page for @{handle}</h6>
      </div>

      
    </Panel>
  );
};

export default Explore;