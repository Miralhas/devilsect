'use client'

import { useCallback, useEffect, useState } from 'react';

const synth = window.speechSynthesis;

const useSpeech = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [text, setText] = useState('');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [speaking, setSpeaking] = useState(synth.speaking);
  const [isPaused, setIsPaused] = useState(false);

  const populateVoiceList = useCallback(() => {
    const newVoices = synth.getVoices();
    setVoices([...newVoices])
  }, []);

  useEffect(() => {
    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
    }
  }, [populateVoiceList]);

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[voiceIndex];
    utterance.rate = rate;
    utterance.pitch = pitch
    synth.speak(utterance);
    setSpeaking(true);
  }

  const pause = () => {
    synth.pause();
    setSpeaking(false)
    setIsPaused(true)
  }

  const resume = () => {
    synth.resume();
    setSpeaking(true)
    setIsPaused(false);
  }

  const cancel = () => {
    synth.cancel();
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
