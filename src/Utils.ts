import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default {
  getSharedPath: (mobilization: any) => {
    const domain = publicRuntimeConfig.domainPublic || 'staging.bonde.org';

    return mobilization.custom_domain
      ? `http://${mobilization.custom_domain}`
      : `http://${mobilization.slug}.${domain}`;
  },
  imageUrl: '/static/images/check-mark-image.png'
}