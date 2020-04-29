import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CardActionArea } from '@material-ui/core';

const CardLink = styled(CardActionArea).attrs({
  component: Link
})`
  min-width: 250px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px 0;
`;

export default CardLink;
