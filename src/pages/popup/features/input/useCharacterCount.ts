import { useMemo } from 'react';

const useCharacterCount = (inputValue: string) => {
  return useMemo(() => Array.from(inputValue).length, [inputValue]);
};

export default useCharacterCount;
