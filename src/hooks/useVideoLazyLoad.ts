import { useEffect, useRef, useState, useCallback } from 'react';

interface UseVideoLazyLoadOptions {
  rootMargin?: string;
  threshold?: number;
}

/**
 * Lazy-loads a video element only when it enters (or is about to enter) the viewport.
 * Falls back to immediate loading if IntersectionObserver is not available.
 */
export function useVideoLazyLoad(options: UseVideoLazyLoadOptions = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { rootMargin = '200px', threshold = 0 } = options;

  const handleCanPlay = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // If IntersectionObserver is not supported, load immediately
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      video.load();
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Start loading the video
            if (video.preload === 'none') {
              video.preload = 'auto';
            }
            video.load();
            observerRef.current?.disconnect();
          }
        });
      },
      { rootMargin, threshold }
    );

    observerRef.current.observe(video);

    video.addEventListener('canplaythrough', handleCanPlay);

    return () => {
      observerRef.current?.disconnect();
      video.removeEventListener('canplaythrough', handleCanPlay);
    };
  }, [rootMargin, threshold, handleCanPlay]);

  return { videoRef, isVisible, isLoaded };
}

/**
 * Preloads a video in the background and returns a ready state.
 * Useful for preloading hero videos before showing the page.
 */
export function useVideoPreload(src: string) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = src;
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.style.position = 'absolute';
    video.style.opacity = '0';
    video.style.pointerEvents = 'none';
    video.style.width = '1px';
    video.style.height = '1px';
    document.body.appendChild(video);

    const onCanPlay = () => {
      setReady(true);
    };

    const onError = () => {
      setError(true);
      setReady(true); // Don't block forever on error
    };

    video.addEventListener('canplaythrough', onCanPlay, { once: true });
    video.addEventListener('error', onError, { once: true });
    video.load();

    // Fallback timeout
    const timeout = setTimeout(() => {
      setReady(true);
    }, 10000);

    return () => {
      clearTimeout(timeout);
      video.removeEventListener('canplaythrough', onCanPlay);
      video.removeEventListener('error', onError);
      video.pause();
      video.src = '';
      video.load();
      if (video.parentNode) video.parentNode.removeChild(video);
    };
  }, [src]);

  return { ready, error };
}
