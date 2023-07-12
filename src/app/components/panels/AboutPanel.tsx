import React from 'react';

const AboutPanel: React.FC = () => {
  return (
    <aside className="bg-white flex flex-col w-full rounded-sm p-4">
			<h6 className="text-gray-800 font-regular text-xs">
				<a href="/about" className="hover:underline">About</a> •&nbsp;
				<a href="/terms" className="hover:underline">Terms</a> •&nbsp;
				<a href="/docs" className="hover:underline">Documentation</a> •&nbsp;
				<a href="/legal" className="hover:underline">Legal</a>
			<br/>influx.io © 2023.  Made with Next.js.</h6>
		</aside>
  );
};

export default AboutPanel;