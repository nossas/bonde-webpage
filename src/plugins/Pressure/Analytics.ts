import AnalyticsBase from '../../AnalyticsBase';

const PRESSURE_FILLED = {
  category: 'Pressão',
  action: 'Preenchimento Iniciado',
};

const PRESSURE_SAVED = {
  category: 'Pressão',
  action: 'Dados Salvos com Sucesso',
};

const pressureIsFilled = () => AnalyticsBase.sendEvent(PRESSURE_FILLED);
const pressureSavedData = () => AnalyticsBase.sendEvent(PRESSURE_SAVED);

const Analytics = {
  pressureIsFilled,
  pressureSavedData,
};

export default Analytics;
