'use client'

import React, { useState, useEffect, useRef } from "react";
import { Box, Heading, Text, Card, CardBody, VStack, Center } from "@chakra-ui/react";
import TimerControls from "./TimerControls";
import VoiceControls from "./VoiceControls";
import LampControls, { rgbOn, rgbOff, setLightColorAndOn } from "./LampControls";
import data from "../data.json";

const Game = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isTimerPaused, setIsTimerPaused] = useState(true); // Initially paused
  const [showTimer, setShowTimer] = useState(false);
  const [pulseStopper, setPulseStopper] = useState<() => void>(() => {});
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleLight = (color: { h: number, s: number, v: number }, speed: number) => {
    let lightOn = true;
    setLightColorAndOn(color);

    const interval = setInterval(() => {
      if (lightOn) {
        rgbOff();
      } else {
        rgbOn();
      }
      lightOn = !lightOn;
    }, speed);

    return () => clearInterval(interval); // Function to stop toggling
  };

  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
    setIsPlaying(true);
    setIsTimerPaused(true);
    setTimer(30);
    setShowTimer(false);
    startTogglingLight({ h: 60, s: 100, v: 100 }, 1000); // Yellow toggling quickly
  };

  const handlePauseVoice = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      stopTogglingLight();
      setLightColorAndOn({ h: 0, s: 0, v: 100 }); // Static white
    } else {
      audioRef.current?.play();
      startTogglingLight({ h: 60, s: 100, v: 100 }, 1000); // Yellow toggling quickly
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipVoice = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsTimerPaused(true); // Pause timer
    setTimer(30);
    setShowTimer(true);
    stopTogglingLight();
    setLightColorAndOn({ h: 0, s: 0, v: 50 }); // Dim white
  };

  const handlePauseTimer = () => {
    setIsTimerPaused((prev) => !prev);
    if (!isTimerPaused) {
      stopTogglingLight();
      setLightColorAndOn({ h: 120, s: 100, v: 100 }); // Static green
    } else {
      startTogglingLight({ h: 0, s: 0, v: 100 }, 1000); // Resume white toggling
    }
  };

  const handleResetTimer = () => {
    setTimer(30);
    setIsTimerPaused(true);
  };

  const startTogglingLight = (color: { h: number, s: number, v: number }, speed: number) => {
    if (pulseStopper) pulseStopper();
    const stopper = toggleLight(color, speed);
    setPulseStopper(() => stopper);
  };

  const stopTogglingLight = () => {
    if (pulseStopper) {
      pulseStopper();
      setPulseStopper(() => () => {});
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isTimerPaused && timer > 0 && showTimer) {
      if (timer <= 10) {
        startTogglingLight({ h: 0, s: 100, v: 100 }, 500); // Fast red toggling for last 10 seconds
      } else {
        // setLightColorAndOn({ h: 0, s: 0, v: 100 }); // Static white
        startTogglingLight({ h: 100, s: 100, v: 100 }, 1000);
      }
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowTimer(false);
      stopTogglingLight();
      setTimer(30);
      setIsTimerPaused(true);
    }
    return () => clearInterval(interval);
  }, [isTimerPaused, timer, showTimer]);

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setShowTimer(true);
    setIsTimerPaused(true); // Ensure timer is paused
    stopTogglingLight();
    setLightColorAndOn({ h: 0, s: 0, v: 50 }); // Dim white
  };

  return (
    <Box p={4} bg="gray.800" minH="100vh">
      {!selectedItem && (
        <VStack spacing={4}>
          <Heading as="h1" size="xl" mb={4} color="yellow.900" textAlign="center">
            Welcome to Bunker Game
          </Heading>
          {data.map((item) => (
            <Card key={item.id} onClick={() => handleSelectItem(item)} bg="yellow.300" w="100%">
              <CardBody>
                <Text color="yellow.900">{item.name}</Text>
              </CardBody>
            </Card>
          ))}
        </VStack>
      )}
      {selectedItem && (
        <Box>
          <Heading as="h2" size="lg" color="yellow.900" textAlign="center">
            {selectedItem.name}
          </Heading>
          <Center>
            <img src={selectedItem.picture} alt={selectedItem.name} style={{ maxWidth: '100%', height: 'auto' }} />
          </Center>
          <audio ref={audioRef} src={selectedItem.voice} autoPlay={isPlaying} onEnded={handleAudioEnded} />
          <Center mt={4}>
            {!showTimer && <VoiceControls isPlaying={isPlaying} handlePauseVoice={handlePauseVoice} handleSkipVoice={handleSkipVoice} />}
          </Center>
          {showTimer && (
            <TimerControls
              timer={timer}
              isTimerPaused={isTimerPaused}
              handlePauseTimer={handlePauseTimer}
              handleResetTimer={handleResetTimer}
            />
          )}
        </Box>
      )}
      <LampControls />
    </Box>
  );
};

export default Game;
