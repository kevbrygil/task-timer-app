export interface UseTimerData {
    isTimerOn: boolean
    seconds: number
    setSeconds: React.Dispatch<React.SetStateAction<number>>
    startTimer: () => void
    pauseTimer: () => void
}
