import React from 'react';
import { useFeatureFlag } from '../hooks/useFeatureFlag'
import { launchBannerFlagKey } from '../feature-flag-config'

// Problem:
//     This should be conditionally rendered based on feature flag enrolment.
// Feature flag name:
//     general-render-launch-banner
// Setup:
//     Show to users with flag value: true
const PromotionalBanner = () => (
  <div className="promotional-banner">
    <p>50% launch sale! Use code TAKEHOME</p>
  </div>
)

export const PageLayout = ({
  children,
  className,
}: {
  children: React.ReactNode
  className: string
}) => {
  const launchBannerFlag = useFeatureFlag(launchBannerFlagKey, false)

  return (
    <div className={`page-layout ${className}`}>
      {launchBannerFlag && <PromotionalBanner />}
      {children}
    </div>
  )
}