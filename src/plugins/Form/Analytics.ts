import AnalyticsBase from '../../AnalyticsBase';

const FORM_FILLED = {
  category: 'Formulário',
  action: 'Preenchimento Iniciado',
};

const FORM_SAVED = {
  category: 'Formulário',
  action: 'Dados Salvos com Sucesso',
};

const formIsFilled = () => AnalyticsBase.sendEvent(FORM_FILLED);
const formSavedData = () => AnalyticsBase.sendEvent(FORM_SAVED);

const Analytics = {
  formIsFilled,
  formSavedData,
};

export default Analytics;
