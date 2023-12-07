import { useEffect } from 'react';
import { useAlert } from '../hooks/useAlert';
import { MdInfoOutline, MdOutlineDone } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';

export default function Alert({ message }: { message: string }) {
  const {
    alert: { type },
    setAlert,
  } = useAlert();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAlert({ show: false, message: '', type: 'success' });
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [setAlert]);

  if (type === 'success') {
    return (
      <div className="bg-[#f6ffed]/30 py-2 px-4 rounded-md shadow-md fixed bottom-4 left-4 animate-mount border border-[#b7eb8f] flex gap-4 items-center backdrop-blur">
        <div className="bg-[#52c41a] w-[30px] h-[30px] rounded-[50%] flex justify-center items-center">
          <MdOutlineDone color="#fff" size={20} />
        </div>
        <div className="flex gap-2 flex-col">
          <p className="font-semibold">Success</p>
          <p className="text-neutral-900">{message}</p>
        </div>
      </div>
    );
  }

  if (type === 'informational') {
    return (
      <div className="bg-[#e6f4ff]/30 py-2 px-4 rounded-md shadow-md fixed bottom-4 left-4 animate-mount border border-[#91caff] flex gap-4 items-center backdrop-blur">
        <div className="bg-[#1677ff] w-[28px] h-[28px] rounded-[50%] flex justify-center items-center">
          <MdInfoOutline color="#fff" size={20} />
        </div>
        <div className="flex gap-2 flex-col">
          <p className="font-semibold">Information</p>
          <p className="text-neutral-900">{message}</p>
        </div>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="bg-[#fff2f0]/30 py-2 px-4 rounded-md shadow-md fixed bottom-4 left-4 animate-mount border border-[#ffccc7] flex gap-4 items-center backdrop-blur">
        <div className="bg-[#ff4d4f] w-[28px] h-[28px] rounded-[50%] flex justify-center items-center">
          <IoMdClose color="#fff" size={20} />
        </div>
        <div className="flex gap-2 flex-col">
          <p className="font-semibold">Error</p>
          <p className="text-neutral-900">{message}</p>
        </div>
      </div>
    );
  }
}
