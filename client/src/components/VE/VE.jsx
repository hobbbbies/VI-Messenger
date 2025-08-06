import { useEffect, useRef, useState } from 'react';
import styles from './VE.module.css'

export default function VE() {
  const veAgentRef = useRef(null); 
  const [isMounted, setIsMounted] = useState(false); 
  const [isStarted, setIsStarted] = useState(false);

  // Initialize videoEngager to window object 
  useEffect(() => {
    setIsMounted(true);
    (async () => {
      veAgentRef.current = await import('https://cdn.jsdelivr.net/npm/videoengager-agent-sdk@0.0.23/dist/index.min.mjs');
      await veAgentRef.current.init({
        authMethod: 'generic',
        apiKey: import.meta.env.VITE_VIDEOENGAGER_API_KEY,
        domain: 'dev.videoengager.com', 
        agentEmail: 'mobiledev@videoengager.com',
        options: {
          containerId: 'video-container',
        }
      });
    })();

    return setIsMounted(true);
  }, [])

  const handleVideo = async () => {
    // Can add contactId - Why though?
      if (!isStarted) {
        try {
          await veAgentRef.current.call();
          setIsStarted(true);
        } catch (error) {
          console.error('Error starting call:', error);
        }
      } else {
        try {
          setIsStarted(false);
          await veAgentRef.current.endCall();
        } catch (error) {
          console.error('Error ending call:', error);
        }
      }

  }
  // Use veAgentRef.current to interact with the SDK
  return (
    <>
    <button className={styles.videoButton} onClick={handleVideo}>{isStarted ? <span>End Video</span> : <span>Start Video</span>}</button>
    <div className={styles.veContainer}>
        <div  id='video-container' className={styles.videoDiv}></div>
    </div>
    </>
  )
}