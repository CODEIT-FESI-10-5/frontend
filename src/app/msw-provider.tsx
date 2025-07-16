'use client';

import { useEffect, useState } from 'react';

export function MswProvider() {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' &&
      typeof window !== 'undefined'
    ) {
      import('../shared/mocks/browser').then(({ worker }) => {
        worker
          .start({
            onUnhandledRequest: 'bypass',
          })
          .then(() => setMswReady(true));
      });
    } else {
      setMswReady(true);
    }
  }, []);

  if (!mswReady) {
    return <div>Loading...</div>;
  }

  return null;
}
