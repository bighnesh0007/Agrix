import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceRecorderProps {
  onTextChange: (text: string) => void;
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTextChange, isRecording, setIsRecording }) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join(' ');
        onTextChange(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };
    } else {
      console.error('Speech recognition not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTextChange, setIsRecording]);

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex justify-center space-x-4 z-20">
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          onClick={startRecording}
          disabled={isRecording}
          className={`bg-green-500 hover:bg-green-600 ${isRecording ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Mic className="mr-2" />
          Start Recording
        </Button>
      </motion.div>
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          onClick={stopRecording}
          disabled={!isRecording}
          className={`bg-red-500 hover:bg-red-600 ${!isRecording ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <MicOff className="mr-2" />
          Stop Recording
        </Button>
      </motion.div>
    </div>
  );
};

export default VoiceRecorder;