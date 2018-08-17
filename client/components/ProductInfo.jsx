import React from 'react';
import ItemOverview from './productInfoComponents/ItemOverview';
import ItemPricing from './productInfoComponents/ItemPricing';
import ItemOptions from './productInfoComponents/ItemOptions';
import ItemDescription from './productInfoComponents/ItemDescription';
import SizingTable from './productInfoComponents/SizingTable';
import styles from '../style/ProductInfo.css';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    // variable tracking whether mouse is over star meter or reviews modal
    this.reviewsModalVisibility = false;

    this.state = {
      productId: window.location.pathname,
      sizingModalVisibility: false,
      reviewsModalVisibility: false,
      product: {
        reviews: [],
        about_product: '',
        sale_price: 0,
      },
      relatedProducts: [],
      productTier: 'Elite',
    };
    this.onMouseEnterStars = this.onMouseEnterStars.bind(this);
    this.onMouseLeaveStars = this.onMouseLeaveStars.bind(this);
    this.onClickSizeChart = this.onClickSizeChart.bind(this);
    this.onMouseEnterImageOption = this.onMouseEnterImageOption.bind(this);
    this.onMouseLeaveImageOption = this.onMouseLeaveImageOption.bind(this);
    this.onProductTierClick = this.onProductTierClick.bind(this);
  }

  componentDidMount() {
    this.get();
  }

  onClickSizeChart(e) {
    e.preventDefault();
    const { sizingModalVisibility } = this.state;
    if (e.target.getAttribute('data-target')) {
      this.setState({
        sizingModalVisibility: !sizingModalVisibility,
      });
    }
  }

  onMouseEnterStars(e) {
    e.preventDefault();
    this.reviewsModalVisibility = true;
    setTimeout(this.delayedVis.bind(this), 400);
  }

  onMouseLeaveStars(e) {
    e.preventDefault();
    this.reviewsModalVisibility = false;
    setTimeout(this.delayedVis.bind(this), 400);
  }

  onProductTierClick(e) {
    e.preventDefault();
    const id = e.target.parentNode.getAttribute('data-id');
    if (id) {
      this.setState({
        productId: id,
      });
      window.location.assign(`http://${window.location.host}${id}`);
    }
  }

  onMouseEnterImageOption(e) {
    e.preventDefault();
    const tier = e.target.getAttribute('data-tier');
    this.setState({
      productTier: tier,
    });
  }

  onMouseLeaveImageOption(e) {
    e.preventDefault();
    const { product } = this.state;
    this.setState({
      productTier: product.product_tier,
    });
  }

  // after delay, check to see if mouse is hovering over revieiws modal or star meter
  delayedVis() {
    if (this.reviewsModalVisibility) {
      this.setState({
        reviewsModalVisibility: true,
      });
    } else {
      this.setState({
        reviewsModalVisibility: false,
      });
    }
  }

  get() {
    const { productId } = this.state;
    // receive product id from state
    console.log(productId);
    fetch(`/api${productId}`)
      .then(response => response.json())
      .then((data) => {
        // const { data, related } = obj;
        console.log(data);
        this.setState({
          product: data[0],
          relatedProducts: data.slice(1),
          productTier: data[0].product_tier,
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const {
      product: {
        isPrime,
        about_product,
        brand,
        product_name,
        thumbnail,
        reviews,
        questions,
        sale_price,
      },
      productTier,
      relatedProducts,
      sizingModalVisibility,
      reviewsModalVisibility,
    } = this.state;
    const {
      onMouseEnterStars,
      onMouseLeaveStars,
      onClickSizeChart,
      onMouseEnterImageOption,
      onMouseLeaveImageOption,
      onProductTierClick,
    } = this;

    return (
      <div className={styles.info}>
        <ItemOverview
          title={{ brand, product_name, productTier }}
          reviewInfo={{ reviews, questions }}
          onMouseEnter={onMouseEnterStars}
          onMouseLeave={onMouseLeaveStars}
        />
        <ItemPricing
          price={sale_price}
          isPrime={isPrime}
          reviews={reviews}
          onMouseEnter={onMouseEnterStars}
          onMouseLeave={onMouseLeaveStars}
          visibility={reviewsModalVisibility}
        />
        <ItemOptions
          tier={productTier}
          thumbnail={thumbnail}
          related={relatedProducts}
          onClick={onClickSizeChart}
          onMouseEnter={onMouseEnterImageOption}
          onMouseLeave={onMouseLeaveImageOption}
          onSelect={onProductTierClick}
        />
        <ItemDescription description={about_product} />
        <SizingTable visibility={sizingModalVisibility} onClick={onClickSizeChart} />
      </div>
    );
  }
}

export default ProductInfo;
