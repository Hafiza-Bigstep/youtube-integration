import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  onClick,
  style,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      style={style}
    />
  );
};

export default Image;
