'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AccessibleMedia } from '../atoms/AccessibleMedia';
import { Button } from '../atoms/Button';

interface VideoPlayerProps {
  /**
   * Source URL for the video
   */
  src: string;
  /**
   * Alternative text description
   */
  alt: string;
  /**
   * Caption text to display below video
   */
  caption?: string;
  /**
   * URL to transcript
   */
  transcriptUrl?: string;
  /**
   * URL to captions/subtitles file
   */
  captionsUrl?: string;
  /**
   * Video width
   */
  width?: number;
  /**
   * Video height
   */
  height?: number;
  /**
   * Poster image URL
   */
  poster?: string;
  /**
   * Whether to display custom controls
   */
  customControls?: boolean;
  /**
   * Whether video should loop
   */
  loop?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Enhanced VideoPlayer with accessibility features and custom controls
 */
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  alt,
  caption,
  transcriptUrl,
  captionsUrl,
  width = 800,
  height = 450,
  poster,
  customControls = true,
  loop = false,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcriptContent, setTranscriptContent] = useState<string>('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoId = `video-${Math.random().toString(36).substr(2, 9)}`;
  
  useEffect(() => {
    // Load transcript content if URL is provided
    if (transcriptUrl) {
      fetch(transcriptUrl)
        .then(response => response.text())
        .then(text => setTranscriptContent(text))
        .catch(error => console.error('Error loading transcript:', error));
    }
  }, [transcriptUrl]);
  
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleToggleTranscript = () => {
    setShowTranscript(!showTranscript);
  };
  
  return (
    <div className={`video-player ${className}`} role="region" aria-label={`Video player: ${alt}`}>
      {/* Video Element */}
      <div className="video-container relative">
        <video
          id={videoId}
          ref={videoRef}
          src={src}
          poster={poster}
          width={width}
          height={height}
          loop={loop}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls={!customControls}
          className="w-full rounded-lg"
          aria-describedby={`${videoId}-desc`}
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
        
        {/* Hidden descriptive element for screen readers */}
        <div id={`${videoId}-desc`} className="sr-only">
          {alt}
        </div>
        
        {/* Custom Controls */}
        {customControls && (
          <div 
            className="video-controls p-2 bg-black bg-opacity-70 rounded-b-lg absolute bottom-0 left-0 right-0 text-white"
            aria-label="Video controls"
          >
            <div className="flex items-center justify-between mb-1">
              <Button 
                onClick={handlePlayPause} 
                variant="icon" 
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                aria-pressed={isPlaying}
                className="text-white"
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </Button>
              
              <div className="flex-1 mx-2">
                <input
                  type="range"
                  value={currentTime}
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  onChange={handleSeek}
                  className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
                  aria-label="Seek video timeline"
                  aria-valuemin={0}
                  aria-valuemax={duration}
                  aria-valuenow={currentTime}
                  aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                />
              </div>
              
              <div className="flex items-center">
                <span className="text-xs mr-2" aria-live="polite">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                
                <Button 
                  onClick={handleMute} 
                  variant="icon" 
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  aria-pressed={isMuted}
                  className="text-white"
                >
                  {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                    </svg>
                  )}
                </Button>
                
                {transcriptUrl && (
                  <Button 
                    onClick={handleToggleTranscript} 
                    variant="icon" 
                    aria-label={showTranscript ? 'Hide transcript' : 'Show transcript'}
                    aria-expanded={showTranscript}
                    className="text-white ml-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Caption */}
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-600 italic">
          {caption}
        </figcaption>
      )}
      
      {/* Transcript */}
      {transcriptUrl && showTranscript && (
        <div 
          className="transcript mt-4 p-4 bg-gray-100 rounded-lg border border-gray-200 max-h-60 overflow-y-auto"
          aria-label="Video transcript"
        >
          <h4 className="font-medium mb-2">Transcript</h4>
          <div className="text-sm whitespace-pre-line">
            {transcriptContent || 'Loading transcript...'}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer; 