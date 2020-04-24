import *  as React from 'react'
import { connect } from 'react-redux';
import {
  asyncFilterMobilization,
  asyncFilterBlock,
  asyncFilterWidget
} from 'bonde-webpages';


interface FetchMobilizationProps {
  customDomain: string;
  dispatch: Function;
  children: any
}

const FetchMobilization: React.FC<FetchMobilizationProps> = ({ children, customDomain, dispatch }) => {
  React.useEffect(() => {
    fetchData(customDomain);
  }, [customDomain])

  const fetchData = async (customDomain: string) => {
    const query = { custom_domain: customDomain }

    await dispatch(asyncFilterMobilization(query))
    await dispatch(asyncFilterBlock(query))
    await dispatch(asyncFilterWidget(query))
  }

  return children
}

export default connect()(FetchMobilization);