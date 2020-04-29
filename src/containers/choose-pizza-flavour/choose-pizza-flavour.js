import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  Card,
  Grid,
  Typography
} from '@material-ui/core';

import { HOME_PAGE } from 'routes';
import Title from 'components/title';
import Header from 'components/content-header';
import PizzasGrid from 'components/pizzas-grid';
import Divider from 'components/divider';
import singularOrPlural from 'utils/singularOrPlural';

import pizzaFlavours from 'mocks/pizza-flavours';

const ChoosePizzaFlavour = ({ location }) => {
  if (!location.state) {
    return <Redirect to={HOME_PAGE} />;
  }

  const { flavours } = location.state;
  const { id: sizeId } = location.state;
  return (
    <>
      <Header>
        <Title variant='h4'>
          Escolha até {flavours} {singularOrPlural(flavours, 'sabor', 'sabores')}
        </Title>
      </Header>
      <PizzasGrid>
        {pizzaFlavours.map(flavour => (
          <Grid item key={flavour.id} xs>
            <Card>
              <Img src={flavour.image} alt={flavour.name} />
              <Divider />
              <Typography>{flavour.name}</Typography>
              <Typography variant='h5'>{flavour.value[sizeId]}</Typography>
            </Card>
          </Grid>
        ))}
      </PizzasGrid>
    </>
  );
};

ChoosePizzaFlavour.propTypes = {
  location: PropTypes.object.isRequired
};

const Img = styled.img`
max-width: 200px;
`;

export default ChoosePizzaFlavour;
