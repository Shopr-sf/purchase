import React from 'react';
import styles from '../../style/productInfoComponents/ItemPricing.css';
import ReviewsModal from './ReviewsModal';

const ItemPricing = (props) => {
  const {
    onMouseEnter,
    onMouseLeave,
    visibility,
    price,
    isPrime,
    reviews,
  } = props;
  console.log(price);

  return (
    <div className={styles.container}>
      <ReviewsModal
        reviews={reviews}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        visibility={visibility}
      />
      <table>
        <tbody>
          <tr>
            <td className={styles.leftColumn}>
              <span>
                Price:
              </span>
            </td>
            <td>
              <span className={styles.price}>
                {`$${price}`}
              </span>
              <span className={styles.prime}>
                {isPrime ? <span className={styles.check}>&#x2713;</span> : ''}
                {isPrime ? 'prime' : ''}
              </span>
              <div>
                <a href="" className={styles.returns}>
                  Free Returns on some sizes and colors
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ItemPricing;
