/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { registerSingleton } from 'vs/platform/instantiation/common/extensions';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IWebviewService, WebviewContentOptions, WebviewEditorOverlay, WebviewElement, WebviewIcons, WebviewOptions } from 'vs/workbench/contrib/webview/browser/webview';
import { IFrameWebview } from 'vs/workbench/contrib/webview/browser/webviewElement';
import { WebviewThemeDataProvider } from 'vs/workbench/contrib/webview/common/themeing';
import { DynamicWebviewEditorOverlay } from './dynamicWebviewEditorOverlay';
import { WebviewIconManager } from './webviewIconManager';

export class WebviewService implements IWebviewService {
	_serviceBrand: undefined;

	private readonly _webviewThemeDataProvider: WebviewThemeDataProvider;
	private readonly _iconManager: WebviewIconManager;

	constructor(
		@IInstantiationService private readonly _instantiationService: IInstantiationService,
	) {
		this._webviewThemeDataProvider = this._instantiationService.createInstance(WebviewThemeDataProvider);
		this._iconManager = this._instantiationService.createInstance(WebviewIconManager);
	}

	createWebview(
		id: string,
		options: WebviewOptions,
		contentOptions: WebviewContentOptions
	): WebviewElement {
		return this._instantiationService.createInstance(IFrameWebview, id, options, contentOptions, this._webviewThemeDataProvider);
	}

	createWebviewEditorOverlay(
		id: string,
		options: WebviewOptions,
		contentOptions: WebviewContentOptions,
	): WebviewEditorOverlay {
		return this._instantiationService.createInstance(DynamicWebviewEditorOverlay, id, options, contentOptions);
	}

	setIcons(id: string, iconPath: WebviewIcons | undefined): void {
		this._iconManager.setIcons(id, iconPath);
	}
}

registerSingleton(IWebviewService, WebviewService, true);
