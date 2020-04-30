import React from 'react';
// import { action } from '@storybook/addon-actions';
import DonationStats from '../src/plugins/Donation/components/DonationStats';

export const donationStats = () =>
  <div style={{ width: '400px' }}>
    <DonationStats
      mainColor='rgb(5, 144, 70)'
      goalDateLimit='30/04/2020'
    />
  </div>
;

export default {
  title: 'DonationPlugin',
};
