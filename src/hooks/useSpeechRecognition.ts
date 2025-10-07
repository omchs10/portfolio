import { useState, useEffect, useCallback } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export const useSpeechRecognition = (onResult: (transcript: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!SpeechRecognition) {
      console.error('Speech Recognition is not supported by this browser.');
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.lang = 'en-US';
    rec.interimResults = false;

    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    rec.onerror = (event) => {
      console.error('Speech recognition error detected: ' + event.error);
      setIsListening(false);
    };
    rec.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      onResult(transcript);
    };

    setRecognition(rec);

    return () => {
      rec.onstart = null;
      rec.onend = null;
      rec.onerror = null;
      rec.onresult = null;
      if (isListening) {
        rec.stop();
      }
    };
  }, [onResult]);

  const toggleListening = useCallback(() => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  }, [recognition, isListening]);

  return { isListening, toggleListening, isSupported: !!recognition };
};