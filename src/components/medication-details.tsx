import { useMedication } from '../mock-data'
import { RequestReviewButton } from './request-review-button'
import { useFeatureFlag } from '../hooks/useFeatureFlag'
import {
  ProfileSectionFlag,
  profileSectionFlagKey,
} from '../feature-flag-config'

// Problem:
//     This should be conditionally rendered based on feature flag enrolment.
// Feature flag name:
//     profile-render-details-section
// Setup:
//     Show to users with flag value 'variation'

export const MedicationDetails = () => {
  const medication = useMedication()
  const flag = useFeatureFlag(profileSectionFlagKey)

  if (flag !== ProfileSectionFlag.variation) {
    return null
  }

  return (
    <div>
      <ul>
        <li>Common side effects: {medication.sideEffects}</li>
        <li>Warning signs: {medication.warnings}</li>
      </ul>
      <p>Experiencing any of these? Please contact your doctor</p>
      <RequestReviewButton />
    </div>
  )
}
