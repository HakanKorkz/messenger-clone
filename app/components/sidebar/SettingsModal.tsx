'use client';
import React, {useState} from 'react';
import {User} from "@prisma/client";
import {useRouter} from "next/navigation";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-hot-toast";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import Image from "next/image";
import {CldUploadButton} from "next-cloudinary";
import Button from "@/app/components/Button";

interface SettingsModalProps {
    isOpen?: boolean;
    onClose: () => void;
    currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({onClose, isOpen, currentUser}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register, handleSubmit, setValue, watch, formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image
        }
    });

    const image = watch("image");

    const handleUpload = (result: any) => {
        setValue("image", result?.info?.secure_url, {
            shouldValidate: true
        });
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post("/api/settings", data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error("Bir şeyler yanlış gitti!"))
            .finally(() => setIsLoading(false));
    }

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Profil
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Herkese açık bilgilerinizi düzenleyin.
                        </p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input label={"Name"} id={"name"} errors={errors} register={register}
                                   required={"required"}/>
                            <div>
                                <label
                                    htmlFor=""
                                    className="
                                    block
                                    text-sm
                                    font-medium
                                    leading-6
                                    text-gray-900
                                    ">
                                    Fotoğraf
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image src={`${image || currentUser.image || '/images/placeholder.jpg'}`}
                                           alt={"Avatar"} width={48} height={48} className={"rounded-full"}/>
                                    <CldUploadButton
                                        options={{maxFiles: 1}}
                                        onUpload={handleUpload}
                                        uploadPreset={"ip59wx35"}
                                    >
                                        <Button
                                            disabled={isLoading}
                                            secondary
                                            type={"button"}
                                        >
                                            Değiştir
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={onClose}
                            type={"button"}
                        >
                            İptal

                        </Button>
                        <Button
                            disabled={isLoading}

                            onClick={onClose}
                            type={"submit"}
                        >
                            Kaydet
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default SettingsModal;
