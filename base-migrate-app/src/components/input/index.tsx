
import classNames from "classnames";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { InputType } from "./types";

const Input = (props: InputType) => {
    const {
        type,
        disabled,
        label,
        name,
        placeholder,
        valid,
        max,
        valueAlt,
        value,
        onChange,
        error,
    } = props;
    
    const [valueText, setValue] = useState('');

 const handleOnChange = (value: string) => {
    if (value.length === 0) {
        setValue('');
        onChange && onChange('');
        return;
    }

    // Check if the input is a valid number (without decimals)
    const isNumberMatch = value.match(/^\d+$/);

    if (isNumberMatch && isNaN(Number(value))) return;

    // Check if the input is a valid Ethereum wallet address
    const isAddressMatch = value.match(/^0x[a-fA-F0-9]{40}$/);

    if (isNumberMatch || isAddressMatch) {
        setValue(value);
        onChange && onChange(value);
        return;
    }

    // Allow any text input
    setValue(value);
    onChange && onChange(value);
};

    return (
        <div>
            
        </div>
 )

} 

export default Input;