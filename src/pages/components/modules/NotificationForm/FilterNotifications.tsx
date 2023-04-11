import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { uuid } from 'uuidv4';

interface IAcceptedNotifications{
    error: boolean;
    warning: boolean;
    info: boolean;
    success: boolean;
}

function FilterNotifications() {
    const [acceptedNotifications, setAcceptedNotifications] = useState<IAcceptedNotifications>({
        error: true,
        warning: true,
        info: true,
        success: true
    });

    const handleChange = (type: string) => {
        setAcceptedNotifications((accepted) => ({...accepted, [type]: !accepted[type as keyof IAcceptedNotifications]}))
    }

    const anyChecked = () => (
        Object.values(acceptedNotifications).filter(value => (value)).length > 0
    )

    const allChecked = () => (
        Object.values(acceptedNotifications).filter(value => (value)).length == Object.values(acceptedNotifications).length
    )

    const selectAll = () => {
        var value = false;
        if(anyChecked() && !allChecked()) value = true;
        if(allChecked()) value = false;
        if(!allChecked() && !anyChecked()) value = true;

        let newAccepted = acceptedNotifications
        Object.keys(newAccepted).forEach(key => {
            newAccepted[key as keyof IAcceptedNotifications] = value
        });
        setAcceptedNotifications({...newAccepted})
        

    }

    return ( 
        <Box
            sx={{
              padding: '30px'
            }}
          >
            <FormControlLabel
                label="All"
                control={
                    <Checkbox
                    checked={anyChecked()}
                    indeterminate={anyChecked() && !allChecked()}
                    onChange={() => selectAll()}
                    />
                }
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', ml: 3 }}>
                <FormControlLabel
                    label="Error"
                    control={<Checkbox checked={acceptedNotifications.error} onChange={() => handleChange('error')} />}
                />
                <FormControlLabel
                    label="Warning"
                    control={<Checkbox checked={acceptedNotifications.warning} onChange={() => handleChange('warning')} />}
                />
                 <FormControlLabel
                    label="Info"
                    control={<Checkbox checked={acceptedNotifications.info} onChange={() => handleChange('info')} />}
                />
                <FormControlLabel
                    label="Success"
                    control={<Checkbox checked={acceptedNotifications.success} onChange={() => handleChange('success')} />}
                />
            </Box>
            <TextField
              label="ID"
              variant="outlined"
              defaultValue={uuid()}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              label="Listen for ID"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Box>
     );
}

export default FilterNotifications;