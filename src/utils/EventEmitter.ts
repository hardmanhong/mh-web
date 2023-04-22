type Callback = (...args: any[]) => void

interface EventMap {
  [eventName: string]: Callback[]
}

class EventEmitter {
  private events: EventMap = {}

  public on(eventName: string, callback: Callback): void {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(callback)
  }

  public off(eventName: string, callback: Callback): void {
    if (this.events[eventName]) {
      const index = this.events[eventName].indexOf(callback)
      if (index >= 0) {
        this.events[eventName].splice(index, 1)
      }
    }
  }

  public emit(eventName: string, ...args: any[]): void {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => callback(...args))
    }
  }
}
export const EVENT = {
  REQUEST_ERROR: 'REQUEST_ERROR'
}
export default new EventEmitter()
