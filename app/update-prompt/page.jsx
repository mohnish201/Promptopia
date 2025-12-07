import { UpdatePromptForm } from '@components/update-prompt-from'
import React, { Suspense } from 'react'

const update_propmt = () => {
  return (
    <Suspense fallback={<>...</>}>
      <UpdatePromptForm />
   </Suspense>
  )
}

export default update_propmt