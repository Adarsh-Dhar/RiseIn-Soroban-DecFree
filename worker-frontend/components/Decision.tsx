import React from 'react';
import Button from './Button';

type DecisionProps = {
    onOptionSelected: (option: string) => void;
};

const Decision: React.FC<DecisionProps> = ({ onOptionSelected }) => {
    const handleOptionSelected = (option: string) => {
        onOptionSelected(option);
    };

    return (
        <div>
        <div>
            <h1>Do you approve the first repository?</h1>
            <Button text='yes' onClick={() => handleOptionSelected}/>
            <Button text='no' onClick={() => handleOptionSelected}/>
        </div>
        <div>
            <h1>Do you approve the second repository?</h1>
            <Button text='yes' onClick={() => handleOptionSelected}/>
            <Button text='no' onClick={() => handleOptionSelected}/>
        </div>
        <div>
            <h1>Do you approve the third repository?</h1>
            <Button text='yes' onClick={() => handleOptionSelected}/>
            <Button text='no' onClick={() => handleOptionSelected}/>
        </div>
        </div>
    );
};

export default Decision;