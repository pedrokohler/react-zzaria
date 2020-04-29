import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActionArea as MaterialCardActionArea,
  Divider as MaterialDivider,
  Grid,
  Typography
} from '@material-ui/core';

import pizzaSizes from 'mocks/pizza-sizes';

import { AuthContext } from 'contexts/auth';

const ChoosePizzaSize = () => {
  const { user } = useContext(AuthContext);
  const firstName = user.firstName;

  return (
    <>
      <Grid container direction='column' alignItems='center'>
        <Title variant='h3'>
          O que vai ser hoje, {firstName}?
        </Title>
        <Title variant='h4'>
          Escolha o tamanho da pizza:
        </Title>
      </Grid>
      <PizzasGrid>
        {pizzaSizes.map((size) => (
          <Grid item key={size.id} xs>
            <Card>
              <CardActionArea to={{
                pathname: '/sabores',
                state: size
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
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </PizzasGrid>
    </>
  );
};

const singularOrPlural = (amount, singular, plural) => amount === 1 ? singular : plural;

const Title = styled(Typography).attrs({
  gutterBottom: true,
  align: 'center'
})``;

const PizzasGrid = styled(Grid).attrs({
  container: true,
  spacing: 2
})`
  padding: 20px;
`;

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

  background: #fff;
  border-radius: 50%;
`;

const Pizza = styled.div`
  height: 200px;
  width: 200px;

  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: 1;

  border: 1px solid #ccc;
  border-radius: 50%;

  &::before,
  &::after {
    background: #ccc;
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

const CardActionArea = styled(MaterialCardActionArea).attrs({
  component: Link
})`
  min-width: 250px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px 0;
`;

const Divider = styled(MaterialDivider)`
  margin: 20px 0;
  width: 100%;
`;

export default ChoosePizzaSize;
