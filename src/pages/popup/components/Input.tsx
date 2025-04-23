import { Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useCharacterCount } from '../hooks'

const Input = () => {
  const [inputValue, setInputValue] = useState('')

  const inputCharacterCountValue = useCharacterCount(inputValue)

  return (
    <>
      <Stack>
        <TextField
          variant='outlined'
          multiline
          maxRows={4}
          sx={{ background: 'white', width: '95%' }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          slotProps={{ htmlInput: { maxLength: 5000 } }}
        />
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Stack direction='column' alignItems='flex-end'>
            <Typography variant='body1'>
              Characters: ${inputCharacterCountValue}
            </Typography>
            <Typography variant='body1'>Bytes: </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default Input
