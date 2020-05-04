import React from 'react';
import styled from 'styled-components';
import {
  Container,
  Divider as MaterialDivider,
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
      <Container maxWidth='sm'>
        <PaperContainer>
          <Typography variant='h6'>Seu pedido:</Typography>
          <OrderInfo />
          <Divider />
          <Typography variant='h6'>Endereço para entrega:</Typography>
          <Typography>
            Rua tal, 10, compl., Bairro, CEP: 10100-10 - Cidade/UF
          </Typography>

          <Divider />
          <Typography variant='h6'>Telefone para contato:</Typography>
          <Typography>
            (31) 3485-1929
          </Typography>
        </PaperContainer>
      </Container>
    </>

  );
};

const Divider = styled(MaterialDivider)`
  margin: ${({ theme }) => theme.spacing(3, 0)};
`;

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
