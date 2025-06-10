export interface CountdownRequest {
  duration: number;
}

export interface CountdownState {
  secondsRemaining: number;
  active: boolean;
}
