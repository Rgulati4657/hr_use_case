// src/components/shared/FloatingShapes.jsx
import React from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';

// Define the up-and-down floating animation
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

// A reusable component that can render different types of shapes
const Shape = ({ type = 'cube', size, top, left, animationDuration, animationDelay, rotation, opacity }) => {
  // Define styles for our two shapes
  const cubeStyles = {
    width: size,
    height: size,
    backgroundColor: 'grey.200',
    borderRadius: '15%',
  };

  const triangleStyles = {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeft: `${size / 2}px solid transparent`,
    borderRight: `${size / 2}px solid transparent`,
    borderBottom: `${size}px solid #e0e0e0`, // A slightly different grey for variety
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: top,
        left: left,
        opacity: opacity,
        transform: `rotate(${rotation}deg)`,
        animation: `${floatAnimation} ${animationDuration} ease-in-out infinite`,
        animationDelay: animationDelay,
        // Conditionally apply the correct style based on the 'type' prop
        ...(type === 'triangle' ? triangleStyles : cubeStyles),
      }}
    />
  );
};

// The main component that renders all the shapes
const FloatingShapes = () => {
  const shapes = [
    // Large, slow, background shapes
    { type: 'cube', size: 140, top: '15%', left: '10%', duration: '12s', delay: '0s', rotation: 25, opacity: 0.2 },
    { type: 'triangle', size: 100, top: '70%', left: '5%', duration: '15s', delay: '2s', rotation: 180, opacity: 0.15 }, // A large, upside-down triangle
    { type: 'cube', size: 180, top: '20%', left: '85%', duration: '14s', delay: '1s', rotation: -30, opacity: 0.25 },
    { type: 'cube', size: 90, top: '85%', left: '88%', duration: '18s', delay: '3s', rotation: -15, opacity: 0.1 },
    { type: 'triangle', size: 110, top: '5%', left: '60%', duration: '13s', delay: '4s', rotation: 35, opacity: 0.18 },

    // Medium-sized, mid-ground shapes
    { type: 'cube', size: 60, top: '80%', left: '20%', duration: '9s', delay: '1s', rotation: -25, opacity: 0.4 },
    { type: 'triangle', size: 75, top: '40%', left: '40%', duration: '10s', delay: '3s', rotation: 50, opacity: 0.5 },
    { type: 'cube', size: 55, top: '65%', left: '75%', duration: '8s', delay: '0s', rotation: -5, opacity: 0.45 },
    { type: 'cube', size: 65, top: '5%', left: '25%', duration: '11s', delay: '2s', rotation: 15, opacity: 0.35 },

    // Small, fast, foreground shapes
    { type: 'cube', size: 30, top: '50%', left: '50%', duration: '6s', delay: '0.5s', rotation: 45, opacity: 0.8 },
    { type: 'triangle', size: 25, top: '10%', left: '45%', duration: '7s', delay: '2.5s', rotation: -40, opacity: 0.7 },
    { type: 'cube', size: 40, top: '90%', left: '40%', duration: '6.5s', delay: '1.5s', rotation: 20, opacity: 0.9 },
    { type: 'cube', size: 20, top: '25%', left: '70%', duration: '5.5s', delay: '0.2s', rotation: -10, opacity: 0.75 },
    { type: 'triangle', size: 35, top: '75%', left: '60%', duration: '7.5s', delay: '1.8s', rotation: 210, opacity: 0.8 },
    { type: 'cube', size: 28, top: '55%', left: '15%', duration: '6.2s', delay: '0.8s', rotation: -20, opacity: 0.85 },
    { type: 'triangle', size: 22, top: '35%', left: '88%', duration: '5.8s', delay: '2.1s', rotation: 5, opacity: 0.7 },
    { type: 'cube', size: 45, top: '5%', left: '5%', duration: '8.5s', delay: '3.5s', rotation: -50, opacity: 0.6 },
    { type: 'triangle', size: 38, top: '95%', left: '70%', duration: '7.2s', delay: '0.4s', rotation: 28, opacity: 0.9 },
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Keep it behind everything
        overflow: 'hidden',
      }}
    >
      {shapes.map((shape, index) => (
        <Shape
          key={index}
          type={shape.type}
          size={shape.size}
          top={shape.top}
          left={shape.left}
          animationDuration={shape.duration}
          animationDelay={shape.delay}
          rotation={shape.rotation}
          opacity={shape.opacity}
        />
      ))}
    </Box>
  );
};

export default FloatingShapes;