'use client';

import { Toaster } from 'react-hot-toast';

export default function CustomToast() {
  return (
    <div className="body-medium">
      <Toaster
        toastOptions={{
          duration: 3000, // 모든 토스트 공통 지속시간

          style: {
            borderRadius: '4px',
            padding: '10px 40px',
          },

          success: {
            style: {
              background: '#2c336c', // --color-tertiary
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#2c336c', // --color-tertiary
            },
          },

          error: {
            style: {
              background: '#e20c3f', // --color-error
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#e20c3f', // --color-error
            },
          },

          loading: {
            style: {
              background: '#9b9b9b', // --color-text-tertiary
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#9b9b9b', // --color-text-tertiary
            },
          },
        }}
      />
    </div>
  );
}
