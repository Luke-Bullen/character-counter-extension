import { useMemo } from 'react';

const useByteCount = (inputValue: string) => {
	return useMemo(() => new Blob([inputValue]).size, [inputValue]);
};

export default useByteCount;
