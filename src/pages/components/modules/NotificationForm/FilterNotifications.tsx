import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputAdornment from '@mui/material/InputAdornment'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
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
    const [userID, setUserID] = useState<string>(uuid());

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
              InputProps={{endAdornment: (
                <InputAdornment position="end">
                    <Tooltip title="Copy">
                        <IconButton>
                            <ContentCopyIcon onClick={() => navigator.clipboard.writeText(userID)} />
                        </IconButton>
                    </Tooltip>
                </InputAdornment>
              )}}
              label="ID"
              variant="outlined"
              defaultValue={userID}
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