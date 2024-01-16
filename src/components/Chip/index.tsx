import { XMarkIcon } from "@heroicons/react/16/solid"
import Image from "next/image"
type Props = {
    title: string,
    imageUrl: string
}

const Chip= ({title, imageUrl}: Props) => {
    return (
        <div className="flex gap-1.5 select-none whitespace-nowrap items-center bg-slate-300 rounded-full pr-1">
            <div className="relative w-6 h-6 rounded-full">
                <Image className="rounded-full" fill={true} alt="avatar" src={imageUrl} />
            </div>
            <p>{title}</p>
            <button data-dismissible-target="chip" className="hover:bg-slate-400 rounded-full">
                <XMarkIcon className="w-4 h-4" />
            </button>
        </div>
    )
}

export default Chip
