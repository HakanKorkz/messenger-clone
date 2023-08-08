'use client';
import React from 'react';
import Modal from "@/app/components/Modal";
import Image from "next/image";
interface ImageModalProps {
    src?: string | null
    isOpen?: boolean;
    onClose: ()=>void;
}
const ImageModal:React.FC<ImageModalProps> = ({isOpen,src,onClose,}) => {
    if (!src) {
        return null
    }
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <div className="w-96 h-96">
                <Image src={src} alt={"Image"} className={"object-cover"} fill={true}/>
            </div>
        </Modal>
    );
};

export default ImageModal;
