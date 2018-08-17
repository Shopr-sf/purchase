import React from 'react';
import styles from '../../style/productInfoComponents/ItemColors.css';

const ListItemOne = (props) => {
  const { tier, thumbnail, handlers } = props;
  const { onMouseEnter, onMouseLeave, onSelect } = handlers;

  return (
    <li>
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onSelect} data-id={null} data-tier={tier}>
        <img src={`https://s3-us-west-1.amazonaws.com/viamis/${thumbnail}`} alt={tier} />
      </div>
    </li>
  );
};

const ListItems = (props) => {
  const { object, handlers } = props;
  const { onMouseEnter, onMouseLeave, onSelect } = handlers;

  return (
    <li key={object.id}>
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onSelect} data-id={`/${object.id}/`} data-tier={object.product_tier}>
        <img src={`https://s3-us-west-1.amazonaws.com/viamis/${object.thumbnail}`} alt={object.thumbnail} />
      </div>
    </li>
  );
};

const ItemColors = (props) => {
  const { tier, related, handlers, thumbnail } = props;
  const { onMouseEnter, onMouseLeave, onSelect } = handlers;
  console.log(tier);

  return (
    <div>
      <div>
        <h4 className={styles.colorName}>
          Tier:&nbsp;
        </h4>
        <span>
          {tier}
        </span>
      </div>
      <ul className={styles.list}>
        { related.length > 0
          ? <ListItemOne handlers={handlers} thumbnail={thumbnail} tier={tier} />
          : <span /> }
        { related.map((el, idx) => <ListItems handlers={handlers} object={el} key={`item${idx + 1}`} />) }
      </ul>
    </div>
  );
};

export default ItemColors;
