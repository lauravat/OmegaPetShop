import { useState } from 'react'

export function useModal () {
  const [Open, setOpen] = useState(false)

  const ToggleState = () => {
    setOpen(!Open)
  }

  return { Open, ToggleState }
}
