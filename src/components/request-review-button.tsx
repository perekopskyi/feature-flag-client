import React, { useMemo } from 'react';
import { useFeatureFlag } from '../hooks/useFeatureFlag';

// Problem: 
//     This should be coloured based on FF value
// Feature flag name: 
//     details-section-cta-colour
// Setup: 
//     Fill background color with flag value.
export const RequestReviewButton = () => {
  const featureFlag = useFeatureFlag('details-section-cta-colour');

  const color = useMemo(() => featureFlag, [featureFlag])

  return (
  <button style={{background: color}}>Request doctor review</button>
)}