import { useMemo } from 'react'
import { detailsCtaFlagKey } from '../feature-flag-config'
import { useFeatureFlag } from '../hooks/useFeatureFlag'

// Problem:
//     This should be coloured based on FF value
// Feature flag name:
//     details-section-cta-colour
// Setup:
//     Fill background color with flag value.
export const RequestReviewButton = () => {
  const detailsCtaFlag = useFeatureFlag(detailsCtaFlagKey)

  const color = useMemo(() => detailsCtaFlag as string, [detailsCtaFlag])

  return <button style={{ background: color }}>Request doctor review</button>
}
