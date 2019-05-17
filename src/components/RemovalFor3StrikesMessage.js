import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';
import PropTypes from 'prop-types';

import { Button, Icon } from 'antd';

const RemovalFor3StrikesMessage = ({ state, returnDate }) => {
  const convertedReturnDate = moment(returnDate).format('DD/MM/YYYY');
  const threeStrikeRemovalMessage = `3° Aviso:\nOlá @${
    state.facebookLink
  }, tudo bem? Infelizmente, como você ignorou os 2 avisos anteriores pedindo-lhe para inserir o preço verdadeiro de seus produtos sendo vendidos, você está removido(a) do grupo. Caso queira voltar a fazer parte do grupo, você pode enviar um pedido daqui a 6 meses no dia ${convertedReturnDate} (tempo de banimento votado pelos membros do grupo). Mais uma vez, informo que as regras do grupo encontram-se neste link: https://www.facebook.com/groups/carmelitanos/permalink/1536662943114077/.\n\nEspero que compreenda. Abraço.';
      `;

  return (
    <div>
      <div style={{ marginTop: '12px' }}>
        <b>{state.name}</b>
        {' '}
was successfully removed!
      </div>
      <div style={{ marginTop: '12px' }}>
        <b>Note: </b>
        The removal message will be copied to the transfer area once you click on the Ok button.
      </div>
      <CopyToClipboard text={threeStrikeRemovalMessage}>
        <div style={{ marginTop: '12px' }}>
          <Button>
            Copy
            {' '}
            <Icon type="copy" style={{ color: '#1890ff' }} />
          </Button>
        </div>
      </CopyToClipboard>
    </div>
  );
};

RemovalFor3StrikesMessage.defaultProps = {
  state: {
    name: '',
    facebook: '',
  },
  returnDate: '',
};

RemovalFor3StrikesMessage.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string,
    facebook: PropTypes.string,
  }),
  returnDate: PropTypes.string,
};

export default RemovalFor3StrikesMessage;
