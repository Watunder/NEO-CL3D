import { Evaluator, ExpressionEvaluator } from "./evaluator";
import { Calculate } from "./nodes/actions/calculate";
import { Clear } from "./nodes/actions/clear";
import { Log } from "./nodes/actions/log";
import { Now } from "./nodes/actions/now";
import { Wait } from "./nodes/actions/wait";
import { Foreach } from "./nodes/composites/foreach";
import { Loop } from "./nodes/composites/loop";
import { Parallel } from "./nodes/composites/parallel";
import { Selector } from "./nodes/composites/selector";
import { Sequence } from "./nodes/composites/sequence";
import { Check } from "./nodes/conditions/check";
import { IsNull } from "./nodes/conditions/is-null";
import { IsStatus } from "./nodes/conditions/is-status";
import { NotNull } from "./nodes/conditions/not-null";
import { AlwaysFail } from "./nodes/decorators/always-failure";
import { AlwaysSuccess } from "./nodes/decorators/always-success";
import { Assert } from "./nodes/decorators/assert";
import { Inverter } from "./nodes/decorators/inverter";
import { Listen } from "./nodes/decorators/listen";
import { ListenTree } from "./nodes/decorators/listen-tree";
import { Once } from "./nodes/decorators/once";
import { RepeatUntilFailure } from "./nodes/decorators/repeat-until-failure";
import { RepeatUntilSuccess } from "./nodes/decorators/repeat-until-success";
import { Timeout } from "./nodes/decorators/timeout";
import { Process } from "./process";

export type Constructor<T> = new (...args: unknown[]) => T;
export type Callback<A extends unknown[] = unknown[]> = (...args: A) => void;
export type ObjectType = { [k: string]: unknown };
export type TargetType = object | string | number;

const DEFAULT_TARGET: TargetType = {};

export class Context {
    protected _processResolvers: Map<string, Process> = new Map();
    protected _evaluators: Map<string, Evaluator> = new Map();
    protected _time: number = 0;

    protected _listenerMap: Map<string, Map<TargetType, Map<Callback, object>>> = new Map();

    constructor() {
        this.registerProcess(AlwaysFail);
        this.registerProcess(AlwaysSuccess);
        this.registerProcess(Assert);
        this.registerProcess(Check);
        this.registerProcess(Calculate);
        this.registerProcess(Clear);
        this.registerProcess(Foreach);
        this.registerProcess(Inverter);
        this.registerProcess(IsNull);
        this.registerProcess(IsStatus);
        this.registerProcess(Listen);
        this.registerProcess(ListenTree);
        this.registerProcess(Log);
        this.registerProcess(Loop);
        this.registerProcess(NotNull);
        this.registerProcess(Now);
        this.registerProcess(Once);
        this.registerProcess(Parallel);
        this.registerProcess(RepeatUntilFailure);
        this.registerProcess(RepeatUntilSuccess);
        this.registerProcess(Selector);
        this.registerProcess(Sequence);
        this.registerProcess(Timeout);
        this.registerProcess(Wait);
    }

    get time() {
        return this._time;
    }

    on(event: string, callback: Callback, caller: object): void;

    on(event: string, target: TargetType, callback: Callback, caller: object): void;

    on(
        event: string,
        callbackOrTarget: TargetType | Callback,
        callerOrCallback: Callback,
        caller?: object
    ) {
        let target: TargetType;
        let callback: Callback;
        if (typeof callbackOrTarget === "function") {
            callback = callbackOrTarget as Callback;
            caller = callerOrCallback as object;
            target = DEFAULT_TARGET;
        } else {
            target = callbackOrTarget as TargetType;
            callback = callerOrCallback as Callback;
        }

        let listenerMap = this._listenerMap.get(event);
        if (!listenerMap) {
            listenerMap = new Map();
            this._listenerMap.set(event, listenerMap);
        }
        let targetListeners = listenerMap.get(target);
        if (!targetListeners) {
            targetListeners = new Map();
            listenerMap.set(target, targetListeners);
        }
        targetListeners.set(callback, caller!);
    }

    dispatch(event: string, ...args: unknown[]) {
        this.dispatchTarget(DEFAULT_TARGET, event, ...args);
    }

    dispatchTarget(target: TargetType, event: string, ...args: unknown[]) {
        const listeners = this._listenerMap.get(event)?.get(target);
        if (listeners) {
            for (const [callback, caller] of listeners) {
                callback.call(caller, ...args);
            }
        }
    }

    off(event: string, caller: object) {
        this._listenerMap.get(event)?.forEach((targetListeners, target, listeners) => {
            targetListeners.forEach((value, key) => {
                if (value === caller) {
                    targetListeners.delete(key);
                }
            });
            if (targetListeners.size === 0) {
                listeners.delete(target);
            }
        });
    }

    offCaller(caller: object) {
        this._listenerMap.forEach((listeners) => {
            listeners.forEach((targetListeners, target) => {
                targetListeners.forEach((value, key) => {
                    if (value === caller) {
                        targetListeners.delete(key);
                    }
                });
                if (targetListeners.size === 0) {
                    listeners.delete(target);
                }
            });
        });
    }

    compileCode(code: string) {
        let evaluator = this._evaluators.get(code);
        if (!evaluator) {
            const expr = new ExpressionEvaluator(code);
            evaluator = (envars: ObjectType) => expr.evaluate(envars);
            this._evaluators.set(code, evaluator);
        }
        return evaluator;
    }

    registerCode(code: string, evaluator: Evaluator) {
        this._evaluators.set(code, evaluator);
    }

    registerProcess<T extends Process>(cls: Constructor<T>) {
        const process = new cls();
        this._processResolvers.set(process.descriptor.name, process);
    }

    findProcess(name: string) {
        return this._processResolvers.get(name);
    }
}
