import { XMarkIcon } from "@heroicons/react/16/solid"
import Image from "next/image"
type Props = {
    title: string,
    imageUrl: string,
    id: string,
    selected: boolean,
    onClose: (id: string) => void
}

const Chip= ({id, title, imageUrl, selected, onClose}: Props) => {
    return (
        <div data-id={id} 
        className={` ${selected && 'border-2 border-sky-600'} flex gap-1.5 select-none whitespace-nowrap items-center bg-slate-300 rounded-full pr-1`}
        >
            <div className="relative w-6 h-6 rounded-full">
                <Image className="rounded-full" fill={true} alt="avatar" src={imageUrl} />
            </div>
            <p>{title}</p>
            <button onClick={() => onClose(id)} className="hover:bg-slate-400 rounded-full">
                <XMarkIcon className="w-4 h-4" />
            </button>
        </div>
    )
}

export default Chip
