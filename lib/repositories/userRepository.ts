import { User, UserPreferences, UserTrainingSettings, MeasurementEntry } from '../../types/database.types';

export interface UserRepository {
  getCurrentUser(): Promise<User>;
  getUserById(userId: string): Promise<User | undefined>;
  getUserPreferences(userId: string): Promise<UserPreferences | undefined>;
  updateUserPreferences(userId: string, patch: Partial<UserPreferences>): Promise<UserPreferences>;
  getTrainingSettings(userId: string): Promise<UserTrainingSettings | undefined>;
  updateTrainingSettings(userId: string, patch: Partial<UserTrainingSettings>): Promise<UserTrainingSettings>;
  getMeasurementHistory(userId: string): Promise<MeasurementEntry[]>;
  saveMeasurementEntry(userId: string, entry: MeasurementEntry): Promise<void>;
  deleteMeasurementEntry(userId: string, entryId: string): Promise<void>;

  // Mock DB metadata
  getSplits(): Promise<{ name: string; description: string }[]>;
  getSchedulePresets(): Promise<Record<string, string[] | null>>;
}
