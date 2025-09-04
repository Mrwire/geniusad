'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../atoms/Button';

interface AudioPlayerProps {
  /**
   * Source URL for the audio
   */
  src: string;
  /**
   * Alternative text description
   */
  alt: string;
  /**
   * Caption text
   */
  caption?: string;
  /**
   * URL to transcript
   */
  transcriptUrl?: string;
  /**
   * Whether to display custom controls
   */
  customControls?: boolean;
  /**
   * Whether audio should autoplay
   */
  autoPlay?: boolean;
  /**
   * Whether audio should loop
   */
  loop?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Accessible AudioPlayer component with transcript support and custom controls
 */
export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  alt,
  caption,
  transcriptUrl,
  customControls = true,
  autoPlay = false,
  loop = false,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcriptContent, setTranscriptContent] = useState<string>('');
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioId = `audio-${Math.random().toString(36).substr(2, 9)}`;
  
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
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
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
  
  const jumpForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(audioRef.current.currentTime + 10, duration);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  const jumpBackward = () => {
    if (audioRef.current) {
      const newTime = Math.max(audioRef.current.currentTime - 10, 0);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  return (
    <div className={`audio-player p-4 bg-gray-100 rounded-lg ${className}`}>
      {/* Hidden audio element with accessible fallback */}
      <audio
        id={audioId}
        ref={audioRef}
        src={src}
        loop={loop}
        autoPlay={autoPlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        controls={!customControls}
        className={customControls ? 'hidden' : 'w-full'}
        aria-describedby={`${audioId}-desc`}
      >
        <p>{alt}</p>
      </audio>
      
      {/* Hidden description for screen readers */}
      <div id={`${audioId}-desc`} className="sr-only">
        {alt}
      </div>
      
      {/* Custom Audio Controls */}
      {customControls && (
        <div 
          className="flex flex-col space-y-2"
          role="region"
          aria-label="Audio controls"
        >
          <div className="flex items-center space-x-2">
            {/* Jump back 10s */}
            <Button
              onClick={jumpBackward}
              variant="icon"
              aria-label="Rewind 10 seconds"
              className="text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
              </svg>
            </Button>
            
            {/* Play/Pause */}
            <Button
              onClick={handlePlayPause}
              variant="primary"
              size="sm"
              aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
              aria-pressed={isPlaying}
              className="flex items-center space-x-1"
            >
              {isPlaying ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Play</span>
                </>
              )}
            </Button>
            
            {/* Jump forward 10s */}
            <Button
              onClick={jumpForward}
              variant="icon"
              aria-label="Forward 10 seconds"
              className="text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
            
            {/* Time display */}
            <span 
              className="text-sm text-gray-700 ml-2" 
              aria-live="polite"
              aria-label="Playback time"
            >
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            
            {/* Transcript toggle */}
            {transcriptUrl && (
              <Button 
                onClick={handleToggleTranscript} 
                variant="secondary"
                size="sm"
                aria-label={showTranscript ? 'Hide transcript' : 'Show transcript'}
                aria-expanded={showTranscript}
                className="ml-auto"
              >
                {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
              </Button>
            )}
          </div>
          
          {/* Seek bar */}
          <div className="flex items-center space-x-2">
            <input
              type="range"
              value={currentTime}
              min={0}
              max={duration || 100}
              step={0.1}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-300 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Audio timeline"
              aria-valuemin={0}
              aria-valuemax={duration}
              aria-valuenow={currentTime}
              aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
            />
          </div>
          
          {/* Volume control */}
          <div className="flex items-center space-x-2 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
            </svg>
            <input
              type="range"
              value={volume}
              min={0}
              max={1}
              step={0.01}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-gray-300 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Volume"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={volume * 100}
              aria-valuetext={`Volume ${Math.round(volume * 100)}%`}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
      
      {/* Caption */}
      {caption && (
        <div className="mt-3 text-sm text-gray-600 italic">
          {caption}
        </div>
      )}
      
      {/* Transcript */}
      {transcriptUrl && showTranscript && (
        <div 
          className="transcript mt-4 p-4 bg-white rounded-lg border border-gray-200 max-h-60 overflow-y-auto"
          aria-label="Audio transcript"
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

export default AudioPlayer; 