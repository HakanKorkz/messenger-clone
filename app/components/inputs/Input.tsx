'use client'
import clsx from "clsx";
import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import React from "react";

interface InputProps {
    label: string,
    id: string | number,
    name?: string
    type?: string,
    required?: string
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled?: boolean
}

const Input: React.FC<InputProps> = (
    {
        label,
        id,
        name,
        type,
        required,
        register,
        errors,
        disabled

    }
) => {
    if (name === undefined) {
        // @ts-ignore
        name = id
    }

    return (
        <div>
            <label
                className="
                block
                text-sm
                font-medium
                leading-6
               "
                // @ts-ignore
                htmlFor={id}>

                {
                    label
                }
            </label>
            <input
                // @ts-ignore
                id={id}
                // @ts-ignore
                name={"aa"}
                type={type}
                // @ts-ignore
                autoComplete={id}
                disabled={disabled}
                // @ts-ignore
                {...register(name, {required})}
                className={clsx(`
                form-input
                block
                w-full
                rounded-md
                border-0
                py-1.5
                text-gray-900
                shadow-sm
                ring-1
                ring-inset
                ring-gray-300
                placeholder:text-gray-400
                focus:ring-2
                focus:ring-inset
                focus:ring-sky-600
                sm:text-sm
                sm:leading-6                
                `,
                    errors[id] && "focus:ring-red-500",
                    disabled && "opacity-50 cursor-default"
                )}
            />
        </div>
    );
};

export default Input;
