import React, { useCallback } from 'react';
import TextField from './text-field';

import { useOrder } from 'hooks';

const PhoneField = () => {
  const { order: { phone }, setPhone } = useOrder();

  const phoneMask = useCallback((phone) => {
    return phone
      .replace(/\D+/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d)(\d{3})-(\d)(\d{4})/, '$1 $2$3-$4')
      .replace(/-(\d{4})\d+$/, '-$1');
  }, []);

  const handleChange = useCallback((e) => {
    setPhone(phoneMask(e.target.value));
  }, [phoneMask, setPhone]);

  return (
    <TextField
      label='Telefone'
      sm={5}
      value={phone}
      onChange={handleChange}
    />
  );
};

export default PhoneField;
