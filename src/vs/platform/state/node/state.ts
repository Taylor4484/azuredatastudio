/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from 'vs/platform/instantiation/common/instantiation';

export const IStateService = createDecorator<IStateService>('stateService');

export interface IStateService {
	_serviceBrand: undefined;

	getItem<T>(key: string, defaultValue: T): T;
	getItem<T>(key: string, defaultValue?: T): T | undefined;
	setItem(key: string, data?: object | string | number | boolean | undefined | null): void;
	removeItem(key: string): void;
}