import React, { useState, useEffect, useCallback, useReducer, useRef } from 'react';
import {
  Grid,
  CircularProgress
} from '@material-ui/core';

import TextField from './text-field';

const cepMask = (value) => value
  .replace(/\D+/g, '')
  .replace(/(\d{5})(\d)/, '$1-$2')
  .replace(/(-\d{3})\d+$/, '$1');

const FormAddress = () => {
  const [cep, setCep] = useState('');
  const [addressState, dispatch] = useReducer(reducer, initialState);
  const [fetchingCep, setFetchingCep] = useState(false);
  const numberField = useRef();

  useEffect(() => {
    const fetchAddress = async (cep) => {
      if (cep.length < 9) {
        return;
      }

      setFetchingCep(true);
      try {
      const response = await fetch(`https://ws.apicep.com/cep/${cep}.json`);
      const data = await response.json();
        if (data.ok) {
      setFetchingCep(false);
      numberField.current.focus();
      dispatch({ type: 'SET_FULL_ADDRESS', payload: data });
        } else {
          dispatch({ type: 'FAIL', payload: { error: data.message } });
        }
      } catch (error) {
        dispatch({ type: 'FAIL', payload: { error: error.message } });
      }
      setFetchingCep(false);
    };

    fetchAddress(cep);
  }, [cep]);

  const handleChangeField = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', payload: { name, value } });
  }, []);

  const handleChangeCep = useCallback((e) => {
    setCep(cepMask(e.target.value));
  }, []);

  const fields = [
    {
      label: 'Rua',
      sm: 9,
      name: 'address'
    },
    {
      label: 'Número',
      sm: 3,
      name: 'number',
      inputRef: numberField
    },
    {
      label: 'Complemento',
      sm: 12,
      name: 'complement'
    },
    {
      label: 'Cidade',
      sm: 9,
      name: 'city'
    },
    {
      label: 'Estado',
      sm: 3,
      name: 'state'
    }
  ];

  const error = addressState.error;

  return (
    <Grid container spacing={1} alignItems='center'>
      <TextField
        label='CEP'
        sm={5}
        autoFocus
        value={cep}
        onChange={handleChangeCep}
        error={!!error}
      />
      <Grid item sm={7}>
        {(fetchingCep && <CircularProgress size={20} />) ||
        (error && <Typography color='secondary'>{error}</Typography>)}
      </Grid>

      {fields.map(field =>
        <TextField
          {...field}
          key={field.name}
          value={addressState[field.name]}
          onChange={handleChangeField}
          disabled={fetchingCep}
        />
      )}
    </Grid>
  );
};

const reducer = (state, action) => {
  if (action.type === 'SET_FULL_ADDRESS') {
    return {
      ...state,
      ...action.payload,
      error: null
    };
  }

  if (action.type === 'UPDATE_FIELD') {
    return {
      ...state,
      [action.payload.name]: action.payload.value
    };
  }

  if (action.type === 'FAIL') {
    return {
      ...initialState,
      error: action.payload.error
    };
  }
  return state;
};

const initialState = {
  address: '',
  city: '',
  district: '',
  state: '',
  number: '',
  complement: '',
  error: null
};

export default FormAddress;
