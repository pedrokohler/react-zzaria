import React from 'react';
import styled from 'styled-components';
import {
  Container,
  Paper,
  Typography
} from '@material-ui/core';

import Title from 'components/title';
import { useAuth } from 'hooks';
import OrderInfo from 'components/order-info';

const CheckoutConfirmation = () => {
  const { user } = useAuth();
  return (
    <>
      <Header>
        <Title variant='h4'>Oi, {user.firstName}</Title>
        <Typography>Confere, por favor, se está tudo certo com o seu pedido antes de finalizar?</Typography>
      </Header>
      <Container>
        <PaperContainer>
          <OrderInfo />
        </PaperContainer>
      </Container>
    </>

  );
};

const PaperContainer = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(3)}px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-bottom: ${({ theme }) => theme.spacing(3)}px;

  text-align: center;
`;

export default CheckoutConfirmation;
