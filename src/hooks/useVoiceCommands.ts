// Add type definitions for Web Speech API
interface SpeechRecognitionErrorEvent extends Event {
  error:
    | "network"
    | "not-allowed"
    | "permission-denied"
    | "no-speech"
    | "audio-capture"
    | "aborted"
    | string;
  message?: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onstart: (event: Event) => void;
  onend: (event: Event) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onspeechend: (event: Event) => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

import { useState, useEffect, useCallback, useRef } from "react";

interface VoiceCommandsConfig {
  commands: {
    [key: string]: () => void;
  };
  continuous?: boolean;
  autoStart?: boolean;
}

export const useVoiceCommands = ({
  commands,
  continuous = true,
  autoStart = false,
}: VoiceCommandsConfig) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const shouldRestartRef = useRef(false);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 3;
  const isMobile = useRef(
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  );

  const initializeRecognition = useCallback(() => {
    // Try to use the standard SpeechRecognition interface first
    const SpeechRecognition = (window.SpeechRecognition ||
      window.webkitSpeechRecognition) as unknown as
      | SpeechRecognitionConstructor
      | undefined;

    if (!SpeechRecognition) {
      setError(
        "Speech recognition not supported in this browser. Please use Chrome or Edge."
      );
      console.error("Speech recognition not supported");
      return null;
    }

    try {
      const recognition = new SpeechRecognition();

      // Special handling for mobile
      if (isMobile.current) {
        // On mobile, set continuous to false to prevent auto-shutdown
        recognition.continuous = false;
        recognition.interimResults = false; // Set to false on mobile for better stability
      } else {
        recognition.continuous = continuous;
        recognition.interimResults = true;
      }

      recognition.lang = "en-US";

      // Add a timeout to detect if recognition fails to start
      let startTimeout: NodeJS.Timeout;

      recognition.onstart = () => {
        console.log("Voice recognition started");
        setIsListening(true);
        shouldRestartRef.current = continuous || isMobile.current;
        setError(null);
        retryCountRef.current = 0;
        // Clear the timeout since recognition started successfully
        if (startTimeout) {
          clearTimeout(startTimeout);
        }
      };

      recognition.onend = () => {
        console.log("Voice recognition ended");
        setIsListening(false);

        // For mobile, we use a different restart strategy
        if (isMobile.current && shouldRestartRef.current) {
          console.log("Mobile detected, using alternate restart strategy");
          // Use a short delay for mobile restarts
          setTimeout(() => {
            try {
              console.log("Attempting mobile restart");
              recognition.start();
            } catch (e) {
              console.error("Mobile restart failed:", e);
              setError(
                "Voice recognition stopped. Please tap the mic button again."
              );
            }
          }, 300);
          return;
        }

        // Desktop restart logic
        if (shouldRestartRef.current && continuous) {
          console.log("Restarting voice recognition...");
          const delay = Math.min(1000 * (retryCountRef.current + 1), 5000);
          setTimeout(() => {
            if (retryCountRef.current < MAX_RETRIES) {
              try {
                recognition.start();
                // Set a timeout to detect if recognition fails to start
                startTimeout = setTimeout(() => {
                  if (!isListening) {
                    console.error("Recognition failed to start");
                    setError(
                      "Failed to start voice recognition. Please check your internet connection and try again."
                    );
                    shouldRestartRef.current = false;
                  }
                }, 3000);
                retryCountRef.current++;
              } catch (e) {
                console.error("Error restarting recognition:", e);
                setError(
                  "Failed to restart voice recognition. Please try again."
                );
                shouldRestartRef.current = false;
              }
            } else {
              setError(
                "Maximum retry attempts reached. Please check your internet connection and try again."
              );
              shouldRestartRef.current = false;
            }
          }, delay);
        }
      };

      // Modify onspeechend to be more aggressive with restarts on mobile
      recognition.onspeechend = () => {
        console.log("Speech ended event triggered");

        // Only act on mobile
        if (isMobile.current && isListening) {
          console.log("Attempting quick restart after speech end on mobile");
          setTimeout(() => {
            if (isListening && recognitionRef.current) {
              try {
                recognitionRef.current.start();
              } catch (e) {
                console.error("Error restarting after speech end:", e);
              }
            }
          }, 50); // Very short timeout for quick restart
        }
      };

      // Rest of the handlers remain unchanged
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        try {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          const isFinal = event.results[current].isFinal;

          console.log(
            `Transcript (${isFinal ? "final" : "interim"}):`,
            transcript
          );

          if (isFinal) {
            setTranscript(transcript);
            const lowerTranscript = transcript.toLowerCase().trim();
            console.log("Processing command from transcript:", lowerTranscript);

            Object.entries(commands).forEach(([command, action]) => {
              const normalizedCommand = command.toLowerCase().trim();
              if (lowerTranscript.includes(normalizedCommand)) {
                console.log(
                  `Command match found: "${normalizedCommand}" in "${lowerTranscript}"`
                );
                try {
                  action();
                } catch (e) {
                  console.error(`Error executing command "${command}":`, e);
                }
              }
            });

            // For mobile: after processing a command, quickly restart
            if (isMobile.current && isListening) {
              console.log(
                "Command processed on mobile, restarting recognition"
              );
              setTimeout(() => {
                try {
                  recognition.start();
                } catch (e) {
                  console.error("Error restarting after command:", e);
                }
              }, 300);
            }
          }
        } catch (e) {
          console.error("Error processing speech result:", e);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Voice recognition error:", event.error, event);

        switch (event.error) {
          case "network":
            setError(
              "Network error. Please check your internet connection and firewall settings."
            );
            // For network errors, we'll try to restart with exponential backoff
            if (retryCountRef.current < MAX_RETRIES) {
              const delay = Math.min(
                1000 * Math.pow(2, retryCountRef.current),
                5000
              );
              setTimeout(() => {
                if (shouldRestartRef.current) {
                  try {
                    recognition.start();
                    startTimeout = setTimeout(() => {
                      if (!isListening) {
                        console.error(
                          "Recognition failed to start after network error"
                        );
                        setError(
                          "Failed to reconnect. Please check your internet connection and try again."
                        );
                        shouldRestartRef.current = false;
                      }
                    }, 3000);
                    retryCountRef.current++;
                  } catch (e) {
                    console.error("Error restarting after network error:", e);
                    shouldRestartRef.current = false;
                  }
                }
              }, delay);
            } else {
              setError(
                "Network issues persist. Please check that:\n1. You have a stable internet connection\n2. Your firewall isn't blocking access\n3. You're using Chrome or Edge browser"
              );
              shouldRestartRef.current = false;
            }
            break;
          case "not-allowed":
          case "permission-denied":
            setError(
              "Microphone access denied. Please allow microphone access and try again."
            );
            shouldRestartRef.current = false;
            break;
          case "no-speech":
            console.log("No speech detected, continuing to listen...");
            shouldRestartRef.current = continuous;
            break;
          case "audio-capture":
            setError(
              "No microphone detected. Please connect a microphone and try again."
            );
            shouldRestartRef.current = false;
            break;
          case "aborted":
            // Don't show error for user-initiated stops
            shouldRestartRef.current = false;
            break;
          default:
            setError(`Error: ${event.error}. Please try again.`);
            shouldRestartRef.current = false;
        }
      };

      return recognition;
    } catch (e) {
      console.error("Error initializing speech recognition:", e);
      setError(
        "Failed to initialize speech recognition. Please try reloading the page."
      );
      return null;
    }
  }, [commands, continuous, isListening]);

  useEffect(() => {
    recognitionRef.current = initializeRecognition();

    if (autoStart && recognitionRef.current) {
      recognitionRef.current.start();
    }

    return () => {
      if (recognitionRef.current) {
        shouldRestartRef.current = false;
        recognitionRef.current.stop();
      }
    };
  }, [initializeRecognition, autoStart]);

  useEffect(() => {
    if (isListening && isMobile.current) {
      console.log("Setting up mobile polling for microphone");
      // Try to restart the microphone more frequently on mobile (every 3 seconds)
      const interval = setInterval(() => {
        try {
          if (recognitionRef.current) {
            console.log("Mobile poll restart - stopping");
            recognitionRef.current.stop();

            setTimeout(() => {
              if (recognitionRef.current) {
                console.log("Mobile poll restart - starting");
                recognitionRef.current.start();
              }
            }, 100); // Very quick restart
          }
        } catch (e) {
          console.error("Error in mobile microphone poll restart:", e);
        }
      }, 3000); // More frequent polling

      return () => {
        console.log("Clearing mobile polling interval");
        clearInterval(interval);
      };
    }
  }, [isListening]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      console.log("Recognition not initialized, creating new instance");
      recognitionRef.current = initializeRecognition();
    }

    if (recognitionRef.current && !isListening) {
      console.log(
        "Starting voice recognition...",
        isMobile.current ? "(on mobile)" : ""
      );
      retryCountRef.current = 0;
      shouldRestartRef.current = isMobile.current ? true : continuous;
      setError(null);

      try {
        recognitionRef.current.start();

        // On mobile, set a backup check to verify the microphone actually started
        if (isMobile.current) {
          setTimeout(() => {
            if (!isListening) {
              console.log("Mobile microphone failed to start, retrying");
              try {
                if (recognitionRef.current) {
                  recognitionRef.current.start();
                }
              } catch (e) {
                console.error("Mobile retry failed:", e);
                setError("Could not start microphone. Please try again.");
              }
            }
          }, 500);
        }
      } catch (e) {
        console.error("Error starting recognition:", e);
        setError("Failed to start voice recognition. Please try again.");
      }
    }
  }, [isListening, continuous, initializeRecognition]);

  const stopListening = useCallback(() => {
    console.log("Stopping voice recognition...");
    shouldRestartRef.current = false; // Prevent auto-restart
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error("Error stopping recognition:", e);
      }
      retryCountRef.current = 0;
    }
    setIsListening(false); // Ensure the state is updated
  }, []);

  const toggleListening = useCallback(() => {
    console.log("Toggling voice recognition...", { isListening });
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    toggleListening,
  };
};
