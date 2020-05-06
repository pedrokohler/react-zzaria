import React from 'react';
import styled from 'styled-components';
import {
  Card,
  Grid,
  Typography
} from '@material-ui/core';

import { FLAVOURS_PAGE } from 'routes';
import singularOrPlural from 'utils/singularOrPlural';
import Title from 'components/title';
import Header from 'components/content-header';
import PizzasGrid from 'components/pizzas-grid';
import Divider from 'components/divider';
import CardLink from 'components/card-link';
import { useAuth, useCollection } from 'hooks';

const ChoosePizzaSize = () => {
  const { user } = useAuth();
  const pizzaSizes = useCollection('pizzaSizes');

  const firstName = user.firstName;
  return (
    <>
      <Header>
        <Title variant='h3'>
          O que vai ser hoje, {firstName}?
        </Title>
        <Title variant='h4'>
          Escolha o tamanho da pizza:
        </Title>
      </Header>
      <PizzasGrid>
        {pizzaSizes.map((size) => (
          <Grid item key={size.id} xs>
            <Card>
              <CardLink to={{
                pathname: FLAVOURS_PAGE,
                state: { selectedSize: size }
              }}
              >
                <Pizza>
                  <PizzaText>{size.size}cm</PizzaText>
                </Pizza>
                <Divider />
                <Typography>{size.name}</Typography>
                <Typography>
                  {size.slices} fatias,{' '}
                  {size.flavours}{' '}
                  {singularOrPlural(size.flavours, 'sabor', 'sabores')}
                </Typography>
              </CardLink>
            </Card>
          </Grid>
        ))}
      </PizzasGrid>
    </>
  );
};

const PizzaText = styled(Typography).attrs({
  variant: 'h5'
})`
  height: 80px;
  width: 80px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  z-index: 1;

  background: ${({ theme }) => theme.palette.common.white};
  border-radius: 50%;
`;

const Pizza = styled.div`
  height: 200px;
  width: 200px;

  background: ${({ theme }) => theme.palette.common.white};

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: 1;

  border: 1px solid ${({ theme }) => theme.palette.grey.A100};
  border-radius: 50%;

  &::before,
  &::after {
    background: ${({ theme }) => theme.palette.grey.A100};
    content: '';
    position: absolute;
    transform: rotate(45deg);
  }

  &::before {
    width: 160px;
    height: 1px;
  }

  &::after {
    width: 1px;
    height: 160px;
  }
`;

export default ChoosePizzaSize;
