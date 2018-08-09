import React from 'react';
import styles from '../../style/productInfoComponents/ItemSizing.css';

const ItemSizing = (props) => {
  const { onClick } = props;
  const sizes = [
    'S',
    'M',
    'L',
    'XL',
  ];

  return (
    <div>
      <h4 className={styles.title}>
        Size:
      </h4>
      <div className={styles.container}>
        <div className={styles.dropdown} />
        <select className={styles.select}>
          <option className={styles.first}>
            Select
          </option>
          {sizes.map(el => <option className={styles.option} key={el}>{el}</option>)}
        </select>
        <a className={styles.link} href="" onClick={onClick} data-target="sizing-modal">
          Size Chart
        </a>
      </div>
    </div>
  );
};

export default ItemSizing;
