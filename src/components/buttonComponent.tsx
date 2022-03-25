import React from 'react';
import Colors from '../constants/Colors';

interface Inputs {
    text: string,
    onClick?: () => void,
    id: string,
};

export function ButtonComponent({ text, onClick, id }: Inputs) {
    return (
        <button
            onClick={onClick}
            id={id}
            style={{ ...styles.button }}
        >
            <span>{text}</span>
        </button>
    )
};

export function ButtonTransparentComponent({ text, onClick, id }: Inputs) {
    return (
        <button
            onClick={onClick}
            id={id}
            style={{ ...styles.buttonTransparent }}
        >
            <span>{text}</span>
        </button>
    )
}

const styles = {
    button: {
        backgroundColor: Colors.dark.background,
        color: Colors.dark.text,
        padding: 10,
        borderColor: Colors.dark.text,
        borderWidth: 1,
        borderStyle: 'solid',
        fontSize: 16,
        margin: 10,
        width: 200,
    },
    buttonTransparent: {
        backgroundColor: 'transparent',
        color: Colors.palleteColor.green,
        padding: 10,
        borderWidth: 0,
        borderStyle: 'solid',
        fontSize: 14,
        margin: 10,
        width: 200,
    }
};

