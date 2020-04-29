export default {
  getSharedPath: (mobilization: any) => {
    const domain = 'staging.bonde.org'

    return mobilization.custom_domain
      ? `http://${mobilization.custom_domain}`
      : `http://${mobilization.slug}.${domain}`
  },
  imageUrl: '/static/images/check-mark-image.png'
}