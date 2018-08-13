import React from 'react';
import styles from '../../style/productInfoComponents/ItemDescription.css';

const ItemDescription = (props) => {
  const { description } = props;
  return (
    <ul className={styles.description}>
      {description.split('|').map((bulletPoint, i) => <li key={`item-${i + 1}`}>{bulletPoint}</li>)}
    </ul>
  );
};

export default ItemDescription;
