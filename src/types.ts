import { LogMessageSubType } from "./db/types";
import { Context, Scenes } from "telegraf";

/**
 * It is possible to extend the session object that is available to each scene.
 * This can be done by extending `SceneSessionData` and in turn passing your own
 * interface as a type variable to `SceneSession` and to `SceneContextScene`.
 */
export interface EditLogSession extends Scenes.SceneSessionData {
	// will be available under `ctx.scene.session.myWizardSessionProp`
	logId?: number;
  logSubType?: LogMessageSubType;
}

/**
 * We can define our own context object.
 *
 * We now have to set the scene object under the `scene` property. As we extend
 * the scene session, we need to pass the type in as a type variable.
 */
export interface MyContext extends Context {
	// will be available under `ctx.myContextProp`
	employeeId: string;

	// declare scene type
	scene: Scenes.SceneContextScene<MyContext, EditLogSession>;
}

