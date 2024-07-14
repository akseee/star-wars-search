import React, { FC } from 'react';

type TextInput = {
  name: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBar: FC<TextInput> = ({
  name,
  placeholder,
  type,
  value,
  onChange
}) => {
  return (
    <>
      <label htmlFor={name}>{}</label>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
