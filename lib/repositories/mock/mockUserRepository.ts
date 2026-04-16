import { UserRepository } from '../userRepository';
import { User, UserPreferences, UserTrainingSettings, MeasurementEntry } from '../../../types/database.types';


import usersSeed from '@/data/mock/users.json';
import prefsSeed from '@/data/mock/user-preferences.json';
import trainSeed from '@/data/mock/user-training-settings.json';
import measSeed from '@/data/mock/measurement-entries.json';
import splitsSeed from '@/data/mock/splits.json';
import schedulePresetsSeed from '@/data/mock/schedule-presets.json';

const USERS_KEY = 'mockdb_users';
const PREFS_KEY = 'mockdb_user_preferences';
const TRAIN_KEY = 'mockdb_user_training_settings';
const MEAS_KEY = 'mockdb_measurement_entries';

function loadJson<T>(key: string, seed: T): T {
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem(key);
    if (local) return JSON.parse(local);
  }
  return seed;
}

function saveJson<T>(key: string, data: T) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export const mockUserRepository: UserRepository & {
  getSplits: () => Promise<{ name: string; description: string }[]>;
  getSchedulePresets: () => Promise<Record<string, string[] | null>>;
} = {
    async getSplits() {
      return splitsSeed;
    },
    async getSchedulePresets() {
      return schedulePresetsSeed;
    },
  async getCurrentUser() {
    const users: User[] = loadJson(USERS_KEY, usersSeed);
    return users[0];
  },
  async getUserById(userId) {
    const users: User[] = loadJson(USERS_KEY, usersSeed);
    return users.find(u => u.id === userId);
  },
  async getUserPreferences(userId) {
    const prefs: UserPreferences[] = loadJson(PREFS_KEY, prefsSeed);
    return prefs.find(p => p.userId === userId);
  },
  async updateUserPreferences(userId, patch) {
    let prefs: UserPreferences[] = loadJson(PREFS_KEY, prefsSeed);
    let pref = prefs.find(p => p.userId === userId);
    if (!pref) {
      pref = { id: `pref-${userId}`, userId, ...patch } as UserPreferences;
      prefs.push(pref);
    } else {
      Object.assign(pref, patch);
    }
    saveJson(PREFS_KEY, prefs);
    return pref;
  },
  async getTrainingSettings(userId) {
    const train: UserTrainingSettings[] = loadJson(TRAIN_KEY, trainSeed);
    return train.find(t => t.userId === userId);
  },
  async updateTrainingSettings(userId, patch) {
    let train: UserTrainingSettings[] = loadJson(TRAIN_KEY, trainSeed);
    let t = train.find(t => t.userId === userId);
    if (!t) {
      t = { id: `train-${userId}`, userId, ...patch } as UserTrainingSettings;
      train.push(t);
    } else {
      Object.assign(t, patch);
    }
    saveJson(TRAIN_KEY, train);
    return t;
  },
  async getMeasurementHistory(userId) {
    const entries: MeasurementEntry[] = loadJson(MEAS_KEY, measSeed);
    return entries.filter(e => e.userId === userId);
  },
  async saveMeasurementEntry(userId, entry) {
    let entries: MeasurementEntry[] = loadJson(MEAS_KEY, measSeed);
    const idx = entries.findIndex(e => e.id === entry.id);
    if (idx >= 0) {
      entries[idx] = entry;
    } else {
      entries.push(entry);
    }
    saveJson(MEAS_KEY, entries);
  },
  async deleteMeasurementEntry(userId, entryId) {
    let entries: MeasurementEntry[] = loadJson(MEAS_KEY, measSeed);
    entries = entries.filter(e => !(e.userId === userId && e.id === entryId));
    saveJson(MEAS_KEY, entries);
  },
};
