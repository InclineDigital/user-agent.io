import GoogleAd from 'react-google-ad'

const BannerAd = () => (
  <div style={{textAlign: 'center'}}>
    {/* format="xxx" */}
    <GoogleAd client='ca-pub-9477050254721722'
              slot='0871459249'
              format="auto"
    />
  </div>
)

export default BannerAd;
