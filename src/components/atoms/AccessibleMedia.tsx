import React from 'react';
import Image from 'next/image';

type MediaType = 'image' | 'video' | 'audio';

interface AccessibleMediaProps {
  /**
   * Type of media (image, video, audio)
   */
  type: MediaType;
  /**
   * Source URL for the media
   */
  src: string;
  /**
   * Alternative text (required for images)
   */
  alt: string;
  /**
   * Caption text to display below media
   */
  caption?: string;
  /**
   * URL to transcript for audio/video content
   */
  transcriptUrl?: string;
  /**
   * URL to captions/subtitles file (for videos)
   */
  captionsUrl?: string;
  /**
   * Language of the media content
   */
  lang?: string;
  /**
   * Width of the media
   */
  width?: number;
  /**
   * Height of the media
   */
  height?: number;
  /**
   * Whether media should autoplay (audio/video)
   */
  autoPlay?: boolean;
  /**
   * Whether to show controls (audio/video)
   */
  controls?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Accessible Media component that supports images, videos, and audio
 * with proper accessibility features like alt text, captions, and transcripts
 */
export const AccessibleMedia: React.FC<AccessibleMediaProps> = ({
  type,
  src,
  alt,
  caption,
  transcriptUrl,
  captionsUrl,
  lang,
  width,
  height,
  autoPlay = false,
  controls = true,
  className = '',
}) => {
  const figureId = `media-${Math.random().toString(36).substr(2, 9)}`;
  const captionId = `${figureId}-caption`;
  const mediaId = `${figureId}-content`;
  
  // Render different media types
  const renderMedia = () => {
    switch (type) {
      case 'image':
        return (
          <Image
            id={mediaId}
            src={src}
            alt={alt}
            width={width || 800}
            height={height || 600}
            className={`max-w-full h-auto ${className}`}
            aria-describedby={caption ? captionId : undefined}
          />
        );
        
      case 'video':
        return (
          <video
            id={mediaId}
            src={src}
            className={`max-w-full ${className}`}
            width={width}
            height={height}
            controls={controls}
            autoPlay={autoPlay}
            aria-describedby={caption ? captionId : undefined}
            aria-label={alt}
          >
            {captionsUrl && (
              <track 
                kind="captions" 
                src={captionsUrl} 
                label="Captions"
                default 
              />
            )}
            <p>{alt}</p>
          </video>
        );
        
      case 'audio':
        return (
          <audio
            id={mediaId}
            src={src}
            className={className}
            controls={controls}
            autoPlay={autoPlay}
            aria-describedby={caption ? captionId : undefined}
            aria-label={alt}
          >
            <p>{alt}</p>
          </audio>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <figure id={figureId} className="relative" aria-labelledby={caption ? captionId : undefined}>
      {renderMedia()}
      
      {caption && (
        <figcaption 
          id={captionId} 
          className="mt-2 text-sm text-gray-600 italic"
        >
          {caption}
        </figcaption>
      )}
      
      {transcriptUrl && (
        <div className="mt-2">
          <a 
            href={transcriptUrl}
            className="text-primary-600 hover:text-primary-800 text-sm flex items-center"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Transcript for ${alt}`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            View transcript
          </a>
        </div>
      )}
    </figure>
  );
};

export default AccessibleMedia; 