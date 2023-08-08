'use client';
import React, {useState} from 'react';
import {User} from "@prisma/client";
import {useRouter} from "next/navigation";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-hot-toast";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import Button from "@/app/components/Button";

interface GroupChatModalProps {
    users: User[];
    isOpen?: boolean;
    onClose: () => void;

}


const GroupChatModal: React.FC<GroupChatModalProps> = ({onClose, isOpen, users}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: []
        }
    });
    const members = watch('members');
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/conversations', {
            ...data,
            isGroup: true
        })
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error("Bir şeyler yanlış gitti"))
            .finally(() => setIsLoading(false));
    }
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2
                            className="
                            text-base
                            font-semibold
                            leading-7
                            text-gray-900">
                            Grup sohbeti oluştur
                        </h2>
                        <p
                            className="
                            mt-1
                            text-sm
                            leading-6
                            text-gray-600">
                            2 kişiden fazla sohbet oluşturun.
                        </p>
                        <div
                            className="
                            mt-10
                            flex
                            flex-col
                            gap-y-8">
                            <Input label={"Adı"} id={"name"} register={register} errors={errors} required={"required"}
                                   disabled={isLoading}/>
                            <Select
                                disabled={isLoading}
                                label={"Üyeler"}
                                options={users.map((user) => ({
                                    value: user.id,
                                    label: user.name

                                }))}
                                onChange={(value) => setValue('members', value, {
                                    shouldValidate: true
                                })}
                                value={members}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="
                    mt-6
                    flex
                    items-center
                    justify-end
                    gap-x-6
                    ">
                    <Button
                        disabled={isLoading}
                        onClick={onClose}
                        type="button"
                        secondary>
                        İptal
                    </Button>
                    <Button
                        disabled={isLoading}
                        onClick={onClose}
                        type="submit"
                        >
                        Oluştur
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default GroupChatModal;
