import { getCurrentIDE } from './get-current-ide';
import { callCursorAgent } from './call-cursor-agent';
import { isCopilotChatInstalled } from './is-copilot-chat-installed';
import { callCopilotAgent } from './call-copilot-agent';
import { callWindsurfAgent } from './call-windsurf-agent';
import * as vscode from 'vscode';

export async function dispatchAgentCall(prompt: string) {
  const ide = getCurrentIDE();
  switch (ide) {
    case 'CURSOR':
      return await callCursorAgent(prompt);
    case 'WINDSURF':
      return await callWindsurfAgent(prompt);
    case 'VSCODE':
      if (isCopilotChatInstalled()) return await callCopilotAgent(prompt);
      else {
        vscode.window.showErrorMessage(
          'Currently, only Copilot Chat is supported for VSCode. Please install it from the marketplace to use stagewise with VSCode.',
        );
        break;
      }
    case 'UNKNOWN':
      vscode.window.showErrorMessage(
        'Failed to call agent: IDE is not supported',
      );
  }
}
