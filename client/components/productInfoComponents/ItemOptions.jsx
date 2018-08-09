import React from 'react';
import ItemSizing from './ItemSizing';
import ItemColors from './ItemColors';
import styles from '../../style/productInfoComponents/ItemOptions.css';

const ItemOptions = (props) => {
  const {
    related,
    tier,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onSelect,
    thumbnail,
  } = props;

  return (
    <div>
      <div className={styles.container}>
        <span className={styles.title}>
          Fit:&nbsp;
        </span>
        <a className={styles.link} href="">
          As expected (81%)
        </a>
      </div>
      <ItemSizing onClick={onClick} />
      <ItemColors
        tier={tier}
        related={related}
        thumbnail={thumbnail}
        handlers={{ onMouseEnter, onMouseLeave, onSelect }} />
    </div>
  );
};

export default ItemOptions;
