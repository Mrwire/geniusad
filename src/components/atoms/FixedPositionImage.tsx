import React from 'react';
import Image, { ImageProps } from 'next/image';

interface FixedPositionImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  containerClassName?: string;
  imageClassName?: string;
  altText?: string;
}

/**
 * FixedPositionImage is a wrapper component that properly handles Next.js Image components
 * with fill property by ensuring the parent has the proper position CSS property.
 */
export default function FixedPositionImage({
  src,
  containerClassName = '',
  imageClassName = '',
  altText = '',
  ...restProps
}: FixedPositionImageProps) {
  // Set default fill to true if not specified
  const fillProp = restProps.fill === undefined ? true : restProps.fill;
  
  return (
    <div className={`relative ${containerClassName}`}>
      <Image
        src={src}
        alt={altText || 'Image'}
        className={imageClassName}
        fill={fillProp}
        {...restProps}
      />
    </div>
  );
} 