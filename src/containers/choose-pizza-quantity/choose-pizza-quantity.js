import React from 'react';
import styled from 'styled-components';
import { Input as MaterialInput } from '@material-ui/core';
import Title from 'components/title';
import Header from 'components/content-header';

const ChoosePizzaQuantity = () => (
  <>
    <Header>
      <Title variant='h4'>
        Quantas pizzas você gostaria<br />
        de pedir com esses sabores?
      </Title>
    </Header>

    <MainContent><Input defaultValue={1} autoFocus /></MainContent>
  </>
);

const Input = styled(MaterialInput).attrs({
  type: 'number'
})`
  & input {
    width: 150px;

    padding: ${({ theme }) => theme.spacing(1)}px;

    font-size: 80px;
    text-align: center;
  }
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`;

export default ChoosePizzaQuantity;
