import React from 'react';
import ItemReviews from './ItemReviews';
import styles from '../../style/productInfoComponents/ItemOverview.css';

const ItemOverview = (props) => {
  const {
    reviewInfo,
    title,
    onMouseEnter,
    onMouseLeave,
  } = props;

  return (
    <div className={styles.overview}>
      <div>
        <a href="" className={styles.brand}>
          {title.brand}
        </a>
      </div>
      <div className={styles.heading}>
        <span>
          {`${title.brand} ${title.productTier} ${title.product_name}`}
        </span>
      </div>
      <ItemReviews
        reviewInfo={reviewInfo}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      <div className={styles.divider} />
    </div>
  );
};

export default ItemOverview;
