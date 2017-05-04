import GoogleAd from 'react-google-ad';
import debounce from 'lodash/debounce';

export const BannerAd = () => (
  <div className="text-center my-4">
    {/* format="xxx" */}
    <GoogleAd client="ca-pub-9477050254721722" slot="0871459249" format="auto" />
  </div>
);

import { Component } from 'react';
import random from 'random-in-range';

// this is the backup ad page that gets filled in if adsense doesn't have anything to display

const namecheapSizes = [
  ['88', '31'],
  ['120', '60'],
  ['120', '90'],
  ['120', '240'],
  ['120', '600'],
  ['125', '125'],
  ['160', '600'],
  ['180', '150'],
  ['200', '200'],
  ['234', '60'],
  ['300', '250'],
  ['468', '60'],
  ['728', '90']
];

// const namecheapStyles = [1, 2, 3, 4, 5, 6];

const NamecheapAd = ({ w = 88, h = 31, variant = 1 }) => (
  <a rel="nofollow" href="https://affiliate.namecheap.com/?affId=66811">
    <img src={`http://files.namecheap.com/graphics/linkus/${w}x${h}-${variant}.gif`} width={w} height={h} style={{ border: 0 }} alt="Namecheap.com" />
  </a>
);

export class ResponsiveNamecheapAd extends Component {
  constructor() {
    super();
    this.state = {};
  }

  determineSize() {
    const maxWidth = this.container.getBoundingClientRect().width;
    let w;
    let h;
    const variant = random(1, 6);

    for (let i = namecheapSizes.length - 1; i >= 0; i--) {
      [w, h] = namecheapSizes[i];
      if (w <= maxWidth) {
        break;
      }
    }

    this.setState({ w, h, variant });
  }

  componentDidMount() {
    this.determineSize();
    this.resizeHandler = debounce(this.determineSize.bind(this), 100, { leading: true });
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  render() {
    return (
      <ins ref={ins => (this.container = ins)} style={{ display: 'block', textAlign: 'center' }}>
        {this.state.w ? <NamecheapAd {...this.state} /> : null}
      </ins>
    );
  }
}
