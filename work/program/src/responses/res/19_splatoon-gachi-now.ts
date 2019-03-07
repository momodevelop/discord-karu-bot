﻿import { cSplatoonHelper, eBattleTypes } from 'responses/common/cSplatoonHelper';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';

class cResponse extends cResponseBase {

	private readonly battleType: eBattleTypes = eBattleTypes.GACHI;
	private readonly title: string = "(ﾉ≧∇≦)ﾉ ﾐ GACHI!!!"
	private readonly conditions: string[][] = [
		cSplatoonHelper.CONDITION_BATTLE_TYPE[this.battleType]
	];

	public async exec(params: cCallbackParams): Promise<boolean> {
		if (!cSplatoonHelper.ConditionsProc(this.conditions, params.msg.content)) {
			return false;
		}

		await cSplatoonHelper.GetEmbedScheduleNow(params, this.title, this.battleType);

		return true;
	}
	
}

export = function () {
	return new cResponse();
}