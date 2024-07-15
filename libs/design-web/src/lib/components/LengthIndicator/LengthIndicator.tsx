import React from 'react';

import cx from 'classnames';

import styles from './LengthIndicator.module.scss';

interface LengthIndicatorProps {
  showLengthIndicator?: boolean;
  value: string | number | null;
  maxLength?: number;
}

function LengthIndicator({
  showLengthIndicator,
  value,
  maxLength,
}: LengthIndicatorProps) {
  if (showLengthIndicator) {
    let indicator: number | string =
      typeof value === 'string' && value.length ? value.length : 0;

    if (typeof maxLength === 'number' && maxLength > 0) {
      indicator = `${indicator} / ${maxLength}`;
    }

    return (
      <span
        className={cx(styles.lengthIndicator, {
          [styles.overMaxLimit]:
            Number(typeof value === 'string' ? value?.length : 0) ===
            Number(maxLength),
        })}
      >
        {indicator}
      </span>
    );
  }

  return null;
}

export default LengthIndicator;
