import React from 'react';
import { CircularProgress } from '@nextui-org/react';

const PercentageCircle = ({ percentage }) => {
  return (
    <div>
      <CircularProgress
        classNames={{
          svg: 'w-24 h-24 drop-shadow-md',
          indicator: 'stroke-[#132C45]',
          track: 'stroke-[#132C45]/10',
          value: 'text-xl font-semibold text-[#132C45]',
        }}
        value={percentage}
        strokeWidth={4}
        showValueLabel={true}
      />
    </div>
  );
};

export default PercentageCircle;
