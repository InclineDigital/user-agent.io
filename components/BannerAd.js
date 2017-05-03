import GoogleAd from 'react-google-ad'

export const BannerAd = () => (
  <div className="text-center my-4">
    {/* format="xxx" */}
    <GoogleAd client='ca-pub-9477050254721722'
              slot='0871459249'
              format="auto"
    />
  </div>
)

