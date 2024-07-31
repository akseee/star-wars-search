import React, { FC } from 'react';

type TextInput = {
  name: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const SearchBar: FC<TextInput> = ({
  name,
  placeholder,
  type,
  value,
  onChange,
  className
}) => {
  return (
    <>
      <label htmlFor={name}>{}</label>
      <input
        className={className}
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
