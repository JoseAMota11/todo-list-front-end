import { useEffect } from 'react';
import { useAlert } from '../hooks/useAlert';
import { MdOutlineDone } from 'react-icons/md';

export default function Alert({ message }: { message: string }) {
  const { setAlert } = useAlert();
  useEffect(() => {
    setTimeout(() => {
      setAlert({ show: false, message: '' });
    }, 3000);
  }, [setAlert]);

  return (
    <div className="bg-[#b7eb8f] py-2 px-4 rounded-md shadow-md absolute bottom-4 left-4 animate-mount flex gap-2 items-center border border-[#52c41a]">
      <div className="bg-[#52c41a] w-[30px] h-[30px] rounded-[50%] flex justify-center items-center">
        <MdOutlineDone color="#fff" size={20} />
      </div>
      <p className="text-neutral-900">{message}</p>
    </div>
  );
}
