'use client';

const ProgressBar = () => {
  return (
    <div className='flex flex-row justify-between gap-x-2 items-center '>
      <span className='text-[10px]'>01:00</span>
      <input
        id='progress_bar'
        type='range'
        min='1'
        max='100'
        defaultValue={50}
        step='.25'
        className='slider'
      />
      {/* <div className='flex w-full flex-row justify-between mt-1 '> */}

      <span className='text-[10px]'>20:00</span>
      {/* </div> */}
    </div>
  );
};

export default ProgressBar;
