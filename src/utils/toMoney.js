const toMoney = (value) => Number(value).toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

export default toMoney;
