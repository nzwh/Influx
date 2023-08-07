// 'use server'

import React from 'react';
import Panel from '@/src/app/backend/components/layouts/PanelLayout';

const AboutPanel: React.FC = () => {

  return (
    <Panel classes="p-4 gap-4 z-[1]">
		  <h6 className="text-gray-800 font-regular text-[0.625rem] leading-[0.8rem]">
			  <span className="hover:underline">About</span>&nbsp;&nbsp;•&nbsp;&nbsp;
			  <span className="hover:underline">Terms</span>&nbsp;&nbsp;•&nbsp;&nbsp;
			  <span className="hover:underline">Documentation</span>&nbsp;&nbsp;•&nbsp;&nbsp;
			  <span className="hover:underline">Legal</span>
		  <br/>influx.io © 2023.  Made with Next.js.</h6>
	  </Panel>
  );
};

export default AboutPanel;