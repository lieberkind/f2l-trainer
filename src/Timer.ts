enum TimerStatus {
  Initial = "Initial",
  Ready = "Ready",
  Running = "Running",
  Stopped = "Stopped"
}

type Initial = { status: TimerStatus.Initial };
type Ready = { status: TimerStatus.Ready };
type Running = { status: TimerStatus.Running; time: number };
type Stopped = { status: TimerStatus.Stopped; time: number };

export type Timer = Initial | Ready | Running | Stopped;

export const initial = (): Timer => {
  return { status: TimerStatus.Initial };
};

export const stop = (timer: Running): Timer => {
  return { ...timer, status: TimerStatus.Stopped };
};

export const start = (timer: Ready): Timer => {
  return { status: TimerStatus.Running, time: 0 };
};

export const getReady = (timer: Stopped | Initial): Timer => {
  return { status: TimerStatus.Ready };
};

export const increase = (timer: Running): Timer => {
  return { ...timer, time: timer.time + 1 };
};

export const isInitial = (timer: Timer): timer is Initial => {
  return timer.status === TimerStatus.Initial;
};

export const isReady = (timer: Timer): timer is Ready => {
  return timer.status === TimerStatus.Ready;
};

export const isRunning = (timer: Timer): timer is Running => {
  return timer.status === TimerStatus.Running;
};

export const isStopped = (timer: Timer): timer is Stopped => {
  return timer.status === TimerStatus.Stopped;
};

export const getTime = (timer: Timer): number => {
  if (isRunning(timer) || isStopped(timer)) {
    return timer.time;
  }

  return 0;
};
