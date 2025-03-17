import Image from "next/image";
import { FaUser } from "react-icons/fa6";

interface Props {
  name: string;
  photo?: string | null;
}
export function Avatar({ name, photo }: Props) {
  return (
    <div className="flex flex-column items-center gap-2 text-gray-500 !my-4 text-sm">
      <div className="rounded-[50%] bg-slate-200 h-8 w-8 grid place-items-center relative">
        {!photo && <FaUser className="text-neutral-400" />}
        {photo && <Image src={photo} alt={name} width={32} height={32} />}
      </div>
      {name}
    </div>
  );
}
