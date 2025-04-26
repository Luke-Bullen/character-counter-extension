import { Stack, TextField, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { useByteCount, useCharacterCount } from '../hooks'

const InputValues: FC<{ inputValue: string }> = ({ inputValue }) => {
  const inputCharacterCountValue = useCharacterCount(inputValue)
  const inputByteCountValue = useByteCount(inputValue)

  return (
    <Stack direction='column' alignItems='flex-end'>
      <Typography variant='body1'>
        Characters: {inputCharacterCountValue}
      </Typography>
      <Typography variant='body1'>Bytes: {inputByteCountValue}</Typography>
    </Stack>
  )
}

const Actions: FC = () => {
  return (
    <Stack direction='row'>
      <p>copy</p>
      <p>save</p>
    </Stack>
  )
}

const Input: FC = () => {
  const [inputValue, setInputValue] = useState('')

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
          <InputValues inputValue={inputValue} />
          <Actions />
        </Stack>
      </Stack>
    </>
  )
}

export default Input
