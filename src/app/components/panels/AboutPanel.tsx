import React from 'react';
import Link from 'next/link';

const AboutPanel: React.FC = () => {
  return (
    <aside className="bg-white flex flex-col w-full rounded-sm p-4">
			<h6 className="text-gray-800 font-regular text-xs">
				<Link href="/about" className="hover:underline">About</Link> •&nbsp;
				<Link href="/terms" className="hover:underline">Terms</Link> •&nbsp;
				<Link href="/docs" className="hover:underline">Documentation</Link> •&nbsp;
				<Link href="/legal" className="hover:underline">Legal</Link>
			<br/>influx.io © 2023.  Made with Next.js.</h6>
		</aside>
  );
};

export default AboutPanel;