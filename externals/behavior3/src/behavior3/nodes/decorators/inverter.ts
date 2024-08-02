import { Node, NodeDef } from "../../node";
import { Process, Status } from "../../process";
import { TreeEnv } from "../../tree-env";

export class Inverter extends Process {
    override init(node: Node): void {
        if (node.children.length === 0) {
            node.error(`${node.tree.name}#${node.id}: at least one children`);
        }
    }

    override run(node: Node, env: TreeEnv): Status {
        const isYield = node.resume(env);
        if (typeof isYield === "boolean") {
            if (env.status === "running") {
                node.error(`unexpected status error`);
            }
            return this._invert(env.status);
        }
        const status = node.children[0].run(env);
        if (status === "running") {
            return node.yield(env);
        }
        return this._invert(status);
    }

    private _invert(status: Status): Status {
        return status === "failure" ? "success" : "failure";
    }

    override get descriptor(): NodeDef {
        return {
            name: "Inverter",
            type: "Decorator",
            desc: "反转子节点运行结果",
            doc: `
                + 只能有一个子节点，多个仅执行第一个
                + 当子节点返回「成功」时返回「失败」
                + 当子节点返回「失败」时返回「成功」
                + 其余返回「运行中」`,
        };
    }
}
