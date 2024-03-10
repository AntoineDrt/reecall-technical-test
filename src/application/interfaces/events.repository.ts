import type TypedEventEmitter from "typed-emitter";
import { type EventMap } from "typed-emitter";

export interface IEventsRepository<T extends EventMap> extends TypedEventEmitter<T> {}