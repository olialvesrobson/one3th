import React from 'react';
import { Container } from 'react-bootstrap';
import Colors from '../constants/Colors';

interface Inputs {
    label: string, 
    action: (text: any) => any,
    id: string,
    type?: string,
    styling?: object
};

export function InputTextComponent({label, action, id, type='text', styling} : Inputs) {
    return (
        <input 
                type={type}
                placeholder={label}
                onChange={action}
                id={id}
                style={{...styles.inputText}} />
        
        
    );
};

const styles = {
    inputText: {
        backgroundColor: Colors.dark.background,
        color: Colors.dark.text,
        padding: 10,
        margin: 10,
        borderColor: Colors.dark.text,
        borderWidth: 1,
        borderStyle: 'solid',
        fontSize: 16,
        marginTop: 10,
        width: '70vw',
        minWidth: '300px'
    }
};