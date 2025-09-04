import React from 'react';
import Image, { ImageProps } from 'next/image';

interface ResponsiveImageProps extends Omit<ImageProps, 'src'> {
  /**
   * Image source URL or object
   */
  src: string | any;
  /**
   * Alternative image source for mobile devices (< 768px)
   */
  mobileSrc?: string;
  /**
   * Alternative image source for tablet devices (768px - 1023px)
   */
  tabletSrc?: string;
  /**
   * Alternative image source for desktop devices (≥ 1024px)
   */
  desktopSrc?: string;
  /**
   * Image container className
   */
  containerClassName?: string;
  /**
   * Whether to optimize for art direction (different crops/compositions for different devices)
   */
  artDirection?: boolean;
}

/**
 * ResponsiveImage component extends Next.js Image with responsive features
 * It can use different image sources for different device sizes
 * and provide art direction when needed
 */
export default function ResponsiveImage({
  src,
  mobileSrc,
  tabletSrc,
  desktopSrc,
  containerClassName = '',
  artDirection = false,
  alt = '',
  fill = false,
  className = '',
  sizes = '100vw',
  priority = false,
  ...props
}: ResponsiveImageProps) {
  // Always add relative positioning to container when fill is used
  const containerPositionClass = fill ? 'relative' : '';
  const containerClasses = `${containerPositionClass} ${containerClassName}`.trim();

  // If we don't have different sources for breakpoints, just render a standard Image
  if (!mobileSrc && !tabletSrc && !desktopSrc) {
    return (
      <div className={containerClasses}>
        <Image
          src={src}
          alt={alt}
          fill={fill}
          className={className}
          sizes={sizes}
          priority={priority}
          {...props}
        />
      </div>
    );
  }

  // If we're using art direction (different images for different devices),
  // we'll use the picture element with source media queries
  if (artDirection) {
    // We need a non-null width and height for proper layout
    const width = props.width || 1200;
    const height = props.height || 800;
    
    return (
      <div className={containerClasses}>
        <picture>
          {/* Mobile source */}
          {mobileSrc && (
            <source
              media="(max-width: 767px)"
              srcSet={typeof mobileSrc === 'string' ? mobileSrc : ''}
            />
          )}
          
          {/* Tablet source */}
          {tabletSrc && (
            <source
              media="(min-width: 768px) and (max-width: 1023px)"
              srcSet={typeof tabletSrc === 'string' ? tabletSrc : ''}
            />
          )}
          
          {/* Desktop source */}
          {desktopSrc && (
            <source
              media="(min-width: 1024px)"
              srcSet={typeof desktopSrc === 'string' ? desktopSrc : ''}
            />
          )}
          
          {/* Fallback image */}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            sizes={sizes}
            priority={priority}
            {...props}
          />
        </picture>
      </div>
    );
  }

  // For non-art direction scenarios, use CSS to conditionally show/hide different images
  // This is better for when images have the same composition but different resolutions
  return (
    <div className={containerClasses}>
      {/* Default/desktop image */}
      <Image
        src={desktopSrc || src}
        alt={alt}
        fill={fill}
        className={`hidden lg:block ${className}`}
        sizes={sizes}
        priority={priority}
        {...props}
      />
      
      {/* Tablet image */}
      {(tabletSrc || mobileSrc) && (
        <Image
          src={tabletSrc || mobileSrc || src}
          alt={alt}
          fill={fill}
          className={`hidden md:block lg:hidden ${className}`}
          sizes={sizes}
          priority={priority}
          {...props}
        />
      )}
      
      {/* Mobile image */}
      {mobileSrc && (
        <Image
          src={mobileSrc}
          alt={alt}
          fill={fill}
          className={`block md:hidden ${className}`}
          sizes={sizes}
          priority={priority}
          {...props}
        />
      )}
    </div>
  );
} 