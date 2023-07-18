"use client"

import TopbarNav from '@/src/app/backend/components/navigators/TopbarNav';
import Background from '@/src/app/backend/components/panels/BackgroundPanel';

export default function Explore() {
  return (
    <main>

      {/* Templates */}
      <Background />
      <TopbarNav /> { /*// TODO: Add Create Post hook */ }

    </main>
  )
}