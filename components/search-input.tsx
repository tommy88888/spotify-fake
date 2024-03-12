'use client';

import qs from 'query-string';
import useDebounce from '@/hooks/use-debounce';

import { useEffect, useState } from 'react';
import InputField from './ui/input-field';
import { useRouter } from 'next/navigation';

type SearchInputProps = {};

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/search',
      query: query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <InputField
      placeholder='What do u want to listen to?'
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
