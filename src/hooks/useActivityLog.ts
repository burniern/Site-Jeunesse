import { useState, useEffect } from 'react';

interface ActivityLog {
  id: string;
  action: string;
  userId: string;
  details: any;
  timestamp: number;
}

export const useActivityLog = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  // Charger les logs au démarrage
  useEffect(() => {
    const storedLogs = localStorage.getItem('activity_logs');
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  // Sauvegarder les logs à chaque modification
  useEffect(() => {
    localStorage.setItem('activity_logs', JSON.stringify(logs));
  }, [logs]);

  const logActivity = (action: string, userId: string, details: any = {}) => {
    const newLog: ActivityLog = {
      id: crypto.randomUUID(),
      action,
      userId,
      details,
      timestamp: Date.now()
    };

    setLogs(prevLogs => {
      // Garder seulement les 1000 derniers logs
      const updatedLogs = [newLog, ...prevLogs].slice(0, 1000);
      return updatedLogs;
    });

    // Envoyer au serveur si nécessaire
    // await api.post('/logs', newLog);
  };

  const getLogs = (filters: Partial<ActivityLog> = {}) => {
    return logs.filter(log => {
      return Object.entries(filters).every(([key, value]) => {
        return log[key as keyof ActivityLog] === value;
      });
    });
  };

  const clearLogs = () => {
    setLogs([]);
    localStorage.removeItem('activity_logs');
  };

  return {
    logActivity,
    getLogs,
    clearLogs
  };
};