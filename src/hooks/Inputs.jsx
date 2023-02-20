import React, { useState } from 'react';

export function useInputs(initialValue) {
    [inputValue, setInputValue] = useState(initialValue);

    const onChangeHandler = (e) => {
        setInputValue(e.target.value);
    };

    return [inputValue, onChangeHandler, setInputValue];
}
