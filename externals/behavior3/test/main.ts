import { Tree, TreeRunner } from "../src/behavior3";
import { RoleContext, RoleTreeEnv } from "./role";

import * as fs from "fs";

const context = new RoleContext();

fs.writeFileSync("example/node-config.b3-setting", context.exportNodeDefs());

context.avators.push({ x: 200, y: 0, hp: 100, tree: null! });
context.avators.push({ x: 0, y: 0, hp: 100, tree: null! });

const createTreeRunner = (treePath: string) => {
    const tree = new Tree(context, JSON.parse(fs.readFileSync(treePath, "utf-8")));
    return new TreeRunner(new RoleTreeEnv(context), tree);
};

console.log("====================test hero=============================");
// -- test hero
const heroAi = createTreeRunner("./example/hero.json");
heroAi.env.owner = context.avators[1];
heroAi.env.owner.tree = heroAi;
heroAi.run();
heroAi.run();
heroAi.run();
heroAi.run();
heroAi.run();
heroAi.run();

//后摇;
heroAi.run();
heroAi.interrupt();
heroAi.run();
context.time = 20;
heroAi.run();

console.log("====================test monster=============================");
const monsterAi = createTreeRunner("./example/monster.json");
monsterAi.env.owner = context.avators[0];
monsterAi.env.owner.hp = 100;
monsterAi.env.owner.tree = monsterAi;
monsterAi.run();

monsterAi.env.owner.hp = 20;
monsterAi.run();
monsterAi.env.context.time = 40;
monsterAi.run();
monsterAi.run();

console.log("run end");

console.log("====================test api=============================");
const testTree = (
    name: string,
    loopCount: number,
    onTick?: (i: number, runner: TreeRunner<RoleTreeEnv>) => void
) => {
    const runner = createTreeRunner(`./example/${name}.json`);
    for (let i = 0; i < loopCount; i++) {
        context.time++;
        runner.run();
        if (onTick) {
            onTick(i, runner);
        }
    }
    console.log("");
};
testTree("test-parallel", 3);
testTree("test-repeat-until-success", 7);
testTree("test-repeat-until-failure", 7);
testTree("test-timeout", 5);
testTree("test-once", 5);
testTree("test-sequence", 1);
testTree("test-listen", 3, (i, runner) => {
    if (i === 0) {
        context.dispatch("hello", "world");
        context.dispatch("testOff");
        context.off("testOff", runner.env);
    } else if (i === 1) {
        context.dispatch("hello", "world");
        context.dispatch("testOff");
        context.offCaller(runner.env);
    } else {
        context.dispatch("hello", "world");
        context.dispatch("testOff");
    }
});
