import React from 'react';

export const PostCardsLoader = ({ count = 4 }: { count?: number }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className='flex flex-col gap-1 border rounded-lg p-3 animate-pulse'
        >
          <div className='flex gap-2'>
            <div className='w-24 h-[70px] bg-gray-200 rounded-lg flex-shrink-0' />
            <div className='flex-1 space-y-2'>
              <div className='h-4 bg-gray-200 rounded w-3/4' />
              <div className='h-4 bg-gray-200 rounded w-1/2' />
            </div>
          </div>
          <div className='h-3 bg-gray-200 rounded w-20 mt-2' />
        </div>
      ))}
    </div>
  );
};
