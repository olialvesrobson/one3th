import { useTheme } from '@emotion/react';
import { Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';

function OneTextInput(props) {
    // eslint-disable-next-line
    const { id, label, value, defaultValue, name, onBlur, onChange, touched, inputProps, isSubmitting } = props;
    const theme = useTheme();
    return (
        <Grid item xs={12} sm={6}>
            <TextField
                fullWidth
                id={id}
                type={name}
                value={value}
                defaultValue={defaultValue}
                name={name}
                label={label}
                onBlur={onBlur}
                onChange={onChange}
                inputProps={inputProps}
                disabled={isSubmitting}
                sx={{ ...theme.typography.customInput }}
                margin="normal"
            />
            {touched}
        </Grid>
    );
}

OneTextInput.PropTypes = {
    layout: PropTypes.any,
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    items: PropTypes.any,
    touched: PropTypes.any,
    inputProps: PropTypes.any,
    isSubmitting: PropTypes.any
};

export default OneTextInput;
