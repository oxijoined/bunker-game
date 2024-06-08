'use client'

import React from "react";
import { IconButton, Center, Box, Text } from "@chakra-ui/react";
import { FaPause, FaPlay, FaRedo } from "react-icons/fa";

const TimerControls = ({ timer, isTimerPaused, handlePauseTimer, handleResetTimer }) => (
  <Box mt={4} textAlign="center">
    <Text color="white.900" fontSize="5xl" mb={4}>
      00:{timer < 10 ? `0${timer}` : timer}
    </Text>
    <Center>
      <IconButton
        icon={isTimerPaused ? <FaPlay /> : <FaPause />}
        onClick={handlePauseTimer}
        colorScheme="yellow"
        aria-label={isTimerPaused ? "Resume" : "Pause"}
        m={2}
      />
      {isTimerPaused && (
        <IconButton
          icon={<FaRedo />}
          onClick={handleResetTimer}
          colorScheme="yellow"
          aria-label="Reset"
          m={2}
        />
      )}
    </Center>
  </Box>
);

export default TimerControls;
