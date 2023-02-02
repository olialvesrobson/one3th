import { useTheme } from '@emotion/react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import PropTypes from 'prop-types';

function OneOutlinedTextInput(props) {
    // eslint-disable-next-line
    const { layout, error, id, label, value, name, onBlur, onChange, touched, inputProps, isSubmitting } = props;
    const theme = useTheme();
    return (
        <FormControl
            fullWidth={layout == 'fullWidth' && true}
            error={error}
            item={layout == 'twoColoumns' && true}
            sx={layout == 'twoColoumns' ? 12 : { ...theme.typography.customInput }}
            sm={layout == 'twoColoumns' ? 6 : 12}
        >
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <OutlinedInput
                id={id}
                type={name}
                value={value}
                defaultValue=""
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                inputProps={inputProps}
                disabled={isSubmitting}
            />
            {touched}
        </FormControl>
    );
}

OneOutlinedTextInput.PropTypes = {
    layout: PropTypes.any,
    error: PropTypes.any,
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    items: PropTypes.any,
    touched: PropTypes.any,
    inputProps: PropTypes.any,
    isSubmitting: PropTypes.any
};

export default OneOutlinedTextInput;
