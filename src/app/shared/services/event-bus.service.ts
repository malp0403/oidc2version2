

import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

type EventType = AuthEvent;

/**
 * @example
 * this.eventBusService.on(ApplicationEvents.EventNameHere, (exampleEventObj) => yourCallBackFunctionHere )
 * this.eventBusService.stream(ApplicationEvents.EventNameHere).subscribe(...)
 * this.eventBusService.emit(new EmitEvent(ApplicationEvents.EventNameHere, EventObjectData))
 *
 * @see 'EmitEvent'
 *
 * @export
 * @class EventBusService
 */
@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  private subject$ = new Subject<any>();

  /**
   * @example
   * this.eventBusService.on(ApplicationEvents.EventNameHere, (exampleEventObj) => yourCallBackFunctionHere )
   *
   * @param {EventType} event
   * @param {*} action
   * @returns {Subscription}
   * @memberof EventBusService
   */
  on(event: EventType, action: any): Subscription {
    return this.stream(event).subscribe(action);
  }

  /**
   * @example
   * this.eventBusService.stream(ApplicationEvents.EventNameHere).subscribe(...)
   *
   * @param {EventType} event
   * @returns Subject
   * @memberof EventBusService
   */
  stream(event: EventType) {
    return this.subject$.pipe(
      filter((e: EmitEvent) => e.name === event),
      map(e => e.value)
    )
  }

  /**
   * Emit event to communicate between components
   * @example
   * this.eventBusService.emit(new EmitEvent(ApplicationEvents.EventNameHere, EventObjectData));
   *
   * @param {EmitEvent} event
   * @memberof EventBusService
   */
  emit(event: EmitEvent) {
    this.subject$.next(event);
  }
}

export class EmitEvent {

  /**
 * @description
 * Simple class that has an event enum and data that can be used for communication between components.
 *
 * @usage
 * Use this class in order to create and emit a new event with data via the **EventBusService**
 *
 * @example
 * this.eventBusService.emit(new EmitEvent(ApplicationEvents.PropertyUnitUpdated, propertyDetailsEvent));
 *
 */
  constructor(public name: any, public value?: any) { }

}








export enum AuthEvent {
  loadUserData,
}


