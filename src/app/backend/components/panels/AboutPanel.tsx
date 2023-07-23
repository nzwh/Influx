import React from 'react';
import Link from 'next/link';

import Panel from '@/src/app/backend/components/template/PanelTemplate';

const About: React.FC = () => {
  return (
    <Panel classes="p-4 gap-4">
		  <h6 className="text-gray-800 font-regular text-xs">
			  <Link href="/about" className="hover:underline">About</Link> •&nbsp;
			  <Link href="/terms" className="hover:underline">Terms</Link> •&nbsp;
			  <Link href="/docs" className="hover:underline">Documentation</Link> •&nbsp;
			  <Link href="/legal" className="hover:underline">Legal</Link>
		  <br/>influx.io © 2023.  Made with Next.js.</h6>
	  </Panel>
  );
};

export default About;