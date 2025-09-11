'use client'

import { useCallback, useEffect, useRef, useState } from 'react';

const useSpeech = () => {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [text, setText] = useState('');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const populateVoiceList = useCallback(() => {
    if (synthRef.current) {
      const newVoices = synthRef.current.getVoices();
      setVoices([...newVoices]);
    }
  }, []);


  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    populateVoiceList();
    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = populateVoiceList;
    }
  }, [populateVoiceList]);

  const speak = () => {
    if (!synthRef.current) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[voiceIndex];
    utterance.rate = rate;
    utterance.pitch = pitch
    synthRef.current.speak(utterance);
    setSpeaking(true);
  }

  const pause = () => {
    synthRef.current?.pause();
    setSpeaking(false)
    setIsPaused(true)
  }

  const resume = () => {
    synthRef.current?.resume();
    setSpeaking(true)
    setIsPaused(false);
  }

  const cancel = () => {
    synthRef.current?.cancel();
    setSpeaking(false)
  }

  return {
    cancel,
    resume,
    pause,
    speak,
    setText,
    voices,
    setVoiceIndex,
    speaking,
    isPaused,
    rate,
    pitch,
    setPitch,
    setRate,
    setSpeaking
  }
}

export default useSpeech;
