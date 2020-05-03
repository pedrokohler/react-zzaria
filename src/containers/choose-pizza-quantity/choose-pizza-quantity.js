import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Input as MaterialInput,
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { SIZE_PAGE } from 'routes';
import Title from 'components/title';
import Header from 'components/content-header';
import { usePizza } from 'hooks';

const ChoosePizzaQuantity = ({ handleButtonClick }) => {
  const { pizza, setPizza } = usePizza();
  const [quantity, setQuantity] = useState(1);

  const validateNumber = (value) => value > 0 && value <= 30 && Number.isInteger(Number(value));

  const handleChange = (e) => {
    const { value } = e.target;

    if (validateNumber(value) || value === '') {
      const numberValue = Number(value);
      setPizza({ ...pizza, quantity: numberValue });
      setQuantity(numberValue);
    }
  };

  return (
    <>
      <Header>
        <Title variant='h4'>
          Quantas pizzas você gostaria<br />
          de pedir com esses sabores?
        </Title>
      </Header>

      <MainContent>
        <Input value={quantity} onChange={handleChange} autoFocus />
        <ButtonAddAnotherPizza
          to={SIZE_PAGE}
          onClick={handleButtonClick}
        >
          Adicionar e <br />
          montar outra
        </ButtonAddAnotherPizza>
      </MainContent>
    </>
  );
};

ChoosePizzaQuantity.propTypes = {
  handleButtonClick: PropTypes.func.isRequired
};

const ButtonAddAnotherPizza = styled(Button).attrs({
  variant: 'contained',
  color: 'secondary',
  component: Link
})`
  text-align: center;
`;

const Input = styled(MaterialInput)`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;

  & input {
    width: 150px;

    padding: ${({ theme }) => theme.spacing(1)}px;

    font-size: 80px;
    text-align: center;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`;

export default ChoosePizzaQuantity;
