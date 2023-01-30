import { useTheme } from '@emotion/react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';

function OneSelect(props) {
    // eslint-disable-next-line
    const { layout, id, label, value, name, onBlur, onChange, items, touched } = props;
    const theme = useTheme();
    return (
        <FormControl fullWidth={layout == 'fullWidth' && true} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Select
                id={id}
                key={id}
                value={value}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                defaultValue=""
                sx={{ ...theme.typography.customInput }}
            >
                {
                    // eslint-disable-next-line
                    items.map((item) => {
                        return <MenuItem value={item.value}>{item.key}</MenuItem>;
                    })
                }
            </Select>
            {touched}
        </FormControl>
    );
}

OneSelect.PropTypes = {
    layout: PropTypes.any,
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    items: PropTypes.any,
    touched: PropTypes.any
};

export default OneSelect;
