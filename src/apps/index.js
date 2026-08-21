import { AboutApp } from './AboutApp.js';
import { MusicApp } from './MusicApp.js';
import { TerminalApp } from './TerminalApp.js';
import { NotesApp } from './NotesApp.js';
import { PaintApp } from './PaintApp.js';
import { CalculatorApp } from './CalculatorApp.js';
import { BrowserApp } from './BrowserApp.js';
import { FinderApp } from './FinderApp.js';
import { GameApp } from './GameApp.js';
import { SettingsApp } from './SettingsApp.js';

export const allApps = [
  AboutApp,
  MusicApp,
  TerminalApp,
  NotesApp,
  FinderApp,
  BrowserApp,
  PaintApp,
  CalculatorApp,
  GameApp,
  SettingsApp
];

export function getAppById(id) {
  return allApps.find(a => a.id === id);
}
