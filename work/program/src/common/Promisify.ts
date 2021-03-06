﻿import { promisify } from 'util';
import { writeFile, stat } from 'fs';
import Jimp from "jimp-custom";

export const statFileAsync = promisify(stat);
export const writeFileAsync = promisify(writeFile);
export const jimpWriteAsync = function (jimpObj: Jimp, outputPath: string): Promise<void> {
	return new Promise((resolve, reject) => {
		jimpObj.write(outputPath, () => {
			resolve();
		});
	});
}
