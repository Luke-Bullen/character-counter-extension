import { Stack, TextField } from '@mui/material'

const Input = () => {
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
      </Stack>
    </>
  )
}

export default Input
