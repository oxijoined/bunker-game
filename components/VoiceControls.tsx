'use client'

import React from "react";
import { IconButton, Center } from "@chakra-ui/react";
import { FaPause, FaPlay, FaForward } from "react-icons/fa";

const VoiceControls = ({ isPlaying, handlePauseVoice, handleSkipVoice }) => (
  <Center mt={4}>
    <IconButton
      icon={isPlaying ? <FaPause /> : <FaPlay />}
      onClick={handlePauseVoice}
      colorScheme="yellow"
      aria-label={isPlaying ? "Pause" : "Play"}
      m={2}
    />
    <IconButton
      icon={<FaForward />}
      onClick={handleSkipVoice}
      colorScheme="yellow"
      aria-label="Skip"
      m={2}
    />
  </Center>
);

export default VoiceControls;