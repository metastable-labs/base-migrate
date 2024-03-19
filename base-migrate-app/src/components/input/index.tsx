
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

        if (value.length === 0 || Number(value) === 0) {
            setValue('');
            onChange && onChange('');
            return;
        }

        // Check if the input is a valid number (without decimals)
        const isMatch = value.match(/^\d+$/);

        if (!isMatch) return;

        if (isNaN(Number(value))) return;

        setValue(value);
        onChange && onChange(value);
    };
    return (
        <div>
        </div>
 )

} 

export default Input;