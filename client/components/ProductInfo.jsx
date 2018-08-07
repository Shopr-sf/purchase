import React from 'react';
import productData from './mockData';
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
      product: productData.data,
      relatedProducts: productData.related,
      productTier: 'Elite',
    };
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
    console.log(productId);
    fetch(`/products${productId}`)
      .then(response => response.json())
      .then((obj) => {
        const { data, related } = obj;
        this.setState({
          product: data,
          relatedProducts: related,
          productTier: data.product_tier,
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const {
      product, relatedProducts, sizingModalVisibility, reviewsModalVisibility,
    } = this.state;

    const { productTier } = this.state;
    const currentTier = product.product_tier;
    const isPrime = product.is_prime;
    const productOptions = product.product_options;
    const aboutProduct = product.about_product;

    const { brand, name, thumbnail } = product;
    const { reviews, questions, price } = product;
    const { onMouseEnterStars, onMouseLeaveStars, onClickSizeChart } = this;
    const { onMouseEnterImageOption, onMouseLeaveImageOption, onProductTierClick } = this;

    return (
      <div className={styles.info}>
        <ItemOverview
          title={{ brand, name, currentTier }}
          reviewInfo={{ reviews, questions }}
          onMouseEnter={onMouseEnterStars.bind(this)}
          onMouseLeave={onMouseLeaveStars.bind(this)} />
        <ItemPricing
          price={price}
          isPrime={isPrime}
          reviews={reviews}
          onMouseEnter={onMouseEnterStars.bind(this)}
          onMouseLeave={onMouseLeaveStars.bind(this)}
          visibility={reviewsModalVisibility} />
        <ItemOptions
          options={productOptions}
          tier={productTier}
          thumbnail={thumbnail}
          related={relatedProducts}
          onClick={onClickSizeChart.bind(this)}
          onMouseEnter={onMouseEnterImageOption.bind(this)}
          onMouseLeave={onMouseLeaveImageOption.bind(this)}
          onSelect={onProductTierClick.bind(this)} />
        <ItemDescription description={aboutProduct} />
        <SizingTable visibility={sizingModalVisibility} onClick={onClickSizeChart.bind(this)} />
      </div>
    );
  }
}

export default ProductInfo;
