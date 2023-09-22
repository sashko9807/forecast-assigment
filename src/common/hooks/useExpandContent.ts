import {useState} from 'react'

type TActiveToolTip = {
  [key: string] : boolean
}

export function useExpandContent(){
  const [activeTooltip, setActiveTooltip] = useState<TActiveToolTip>({"0":false})

  const handleToolTipHover = (e:any, idx: number) => {

    if(e.type === 'pointerout' && e.pointerType === 'touch') {
      return
    }

    if(e.type === 'pointerout' && activeTooltip && activeTooltip[idx]) {
    setActiveTooltip((prev: TActiveToolTip) => {
      return {
        ...prev,
        [idx]: false
      }
    })
    return      
    }

    if(activeTooltip && activeTooltip[idx] && e.type === 'pointerover' && e.pointerType === 'touch') {
    setActiveTooltip((prev: TActiveToolTip) => {
      return {
        ...prev,
        [idx]: false
      }
    })
      return
    }

    setActiveTooltip((prev: TActiveToolTip) => {
      return {
        ...prev,
        [idx]: true
      }
    })
  }

  return [activeTooltip, handleToolTipHover] as const
}