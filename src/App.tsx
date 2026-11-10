/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Clock, 
  Sun, 
  Moon, 
  Smartphone, 
  LayoutDashboard, 
  PhoneCall, 
  PlusCircle, 
  Utensils, 
  Syringe, 
  Footprints, 
  RotateCw, 
  Volume2, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  HelpCircle,
  Settings,
  Heart,
  Bell,
  Pill,
  Check,
  X,
  Mic,
  Grid
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';

interface GlucoseRecord {
  id: string;
  time: string;
  value: number;
  status: 'Good' | 'High' | 'Low';
  trend: 'stable' | 'rising' | 'falling';
  notes?: string;
  type?: 'reading' | 'meal' | 'insulin' | 'exercise' | 'fingerstick';
}

interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
  scheduleTime: string;
  type: 'scheduled' | 'post-meal';
  status: 'pending' | 'taken' | 'snoozed';
  notes: string;
}

interface PushNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'insulin' | 'medication' | 'alert';
  read: boolean;
}

const INITIAL_RECORDS: GlucoseRecord[] = [
  { id: '1', time: '08:00 AM', value: 115, status: 'Good', trend: 'stable', type: 'reading', notes: 'Fasting' },
  { id: '2', time: '10:30 AM', value: 142, status: 'Good', trend: 'rising', type: 'reading', notes: 'Post breakfast' },
  { id: '3', time: '01:15 PM', value: 128, status: 'Good', trend: 'stable', type: 'reading', notes: 'Pre lunch' },
  { id: '4', time: '03:45 PM', value: 178, status: 'High', trend: 'rising', type: 'reading', notes: 'After snack' },
  { id: '5', time: '06:30 PM', value: 134, status: 'Good', trend: 'falling', type: 'reading', notes: 'Pre dinner' },
  { id: '6', time: '09:00 PM', value: 122, status: 'Good', trend: 'stable', type: 'reading', notes: 'Evening check' },
];

const GLUCOSE_24H_DATA = [
  { time: '00:00', mgdl: 110 },
  { time: '03:00', mgdl: 105 },
  { time: '06:00', mgdl: 115 },
  { time: '09:00', mgdl: 142 },
  { time: '12:00', mgdl: 128 },
  { time: '15:00', mgdl: 178 },
  { time: '18:00', mgdl: 134 },
  { time: '21:00', mgdl: 122 },
  { time: '24:00', mgdl: 120 },
];

const INITIAL_MEDICATIONS: MedicationItem[] = [
  { id: 'm1', name: 'Rapid-Acting Insulin (Humalog)', dosage: '4 units', scheduleTime: '15 mins post-meal', type: 'post-meal', status: 'pending', notes: 'Calculated based on 45g carbohydrates logged at breakfast.' },
  { id: 'm2', name: 'Long-Acting Basal Insulin (Lantus)', dosage: '22 units', scheduleTime: '09:00 PM', type: 'scheduled', status: 'pending', notes: 'Bedtime baseline coverage.' },
  { id: 'm3', name: 'Metformin', dosage: '500 mg', scheduleTime: '08:00 AM & 06:30 PM', type: 'scheduled', status: 'taken', notes: 'Take with meals.' },
];

const INITIAL_NOTIFICATIONS: PushNotification[] = [
  { id: 'n1', title: 'Insulin Reminder', message: 'You logged Breakfast 15 minutes ago. Time for your 4 units of Rapid-Acting Insulin.', time: '10:45 AM', type: 'insulin', read: false },
  { id: 'n2', title: 'Basal Medication Alert', message: 'Upcoming bedtime Lantus insulin (22 units) scheduled for 9:00 PM.', time: '08:30 PM', type: 'medication', read: true }
];

export default function App() {
  const [themeMode, setThemeMode] = useState<'day' | 'night'>('day');
  const [watchScreen, setWatchScreen] = useState<'home' | 'dashboard' | 'meds' | 'aiVoice' | 'caregiver' | 'log' | 'launcher' | 'notifications'>('home');
  const [currentGlucose, setCurrentGlucose] = useState<number>(128);
  const [glucoseStatus, setGlucoseStatus] = useState<'Good' | 'High' | 'Low'>('Good');
  const [glucoseTrend, setGlucoseTrend] = useState<'stable' | 'rising' | 'falling'>('stable');
  const [lastUpdated, setLastUpdated] = useState<string>('3 mins ago');
  const [records, setRecords] = useState<GlucoseRecord[]>(INITIAL_RECORDS);
  const [medications, setMedications] = useState<MedicationItem[]>(INITIAL_MEDICATIONS);
  const [notifications, setNotifications] = useState<PushNotification[]>(INITIAL_NOTIFICATIONS);
  const [aiInsight, setAiInsight] = useState<string>("Your glucose is in a steady range. Maintain hydration and regular balanced meals.");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);
  const [logModalOpen, setLogModalOpen] = useState<boolean>(false);
  const [newLogType, setNewLogType] = useState<'meal' | 'insulin' | 'exercise' | 'fingerstick'>('meal');
  const [newLogVal, setNewLogVal] = useState<string>('');
  const [newLogNotes, setNewLogNotes] = useState<string>('');

  useEffect(() => {
    if (currentGlucose < 70) {
      setGlucoseStatus('Low');
    } else if (currentGlucose > 180) {
      setGlucoseStatus('High');
    } else {
      setGlucoseStatus('Good');
    }
  }, [currentGlucose]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSpeakStatus = () => {
    const statusText = `Current glucose is ${currentGlucose} milligrams per deciliter. Status is ${glucoseStatus}. Trend is ${glucoseTrend}. AI Assistant says: ${aiInsight}`;
    speakText(statusText);
  };

  const fetchAiInsights = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          glucoseData: { current: currentGlucose, status: glucoseStatus, trend: glucoseTrend, recentRecords: records.slice(-5) },
          userPrompt: "Provide a warm, reassuring assessment and a simple tip for the user."
        })
      });
      const data = await res.json();
      if (data.insight) {
        setAiInsight(data.insight);
      }
    } catch (err) {
      console.error(err);
      setAiInsight("Your glucose is stable. Keep up with your hydration and regular schedule.");
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    fetchAiInsights();
  }, [currentGlucose]);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let val = Number(newLogVal) || currentGlucose;
    let newRec: GlucoseRecord = {
      id: Date.now().toString(),
      time: now,
      value: val,
      status: val < 70 ? 'Low' : val > 180 ? 'High' : 'Good',
      trend: 'stable',
      type: newLogType,
      notes: newLogNotes || `${newLogType} logged`
    };

    if (newLogType === 'fingerstick') {
      setCurrentGlucose(val);
    }

    setRecords([newRec, ...records]);

    if (newLogType === 'meal') {
      const newNotif: PushNotification = {
        id: Date.now().toString(),
        title: 'Insulin Dose Reminder',
        message: `Meal logged (${newLogNotes || 'Meal'}). Time for your 15-minute post-meal rapid-acting insulin dose check.`,
        time: now,
        type: 'insulin',
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
      speakText("Meal logged. Insulin reminder scheduled for 15 minutes.");
    }

    setNewLogVal('');
    setNewLogNotes('');
    setLogModalOpen(false);
  };

  const markMedicationTaken = (id: string) => {
    setMedications(medications.map(m => m.id === id ? { ...m, status: 'taken' } : m));
    speakText("Medication marked as taken.");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col items-center justify-center p-4 ${themeMode === 'day' ? 'bg-[#f7f9ff] text-[#121d26]' : 'bg-[#0b0f14] text-[#e8f2ff]'}`}>
      
      {/* Main Immersive Smartwatch Simulator Centered */}
      <main className="flex flex-col items-center justify-center my-auto">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Serene Metric Watch</h2>
          <p className={`text-xs ${themeMode === 'day' ? 'text-[#3f4941]' : 'text-[#a2afbc]'}`}>
            Tap "Apps" inside the watch to access dashboard charts, meds, AI voice, and emergency care.
          </p>
        </div>

        {/* Smartwatch Bezel & Case (454px diameter appearance) */}
        <div className={`relative w-[454px] h-[454px] rounded-full p-4 flex items-center justify-center shadow-2xl transition-all ${
          themeMode === 'day' 
            ? 'bg-gradient-to-br from-[#dfe9f7] via-[#d1dbe8] to-[#bec9bf] border-8 border-[#3f4941]' 
            : 'bg-gradient-to-br from-[#1f2933] via-[#0f1d28] to-[#0b0f14] border-8 border-[#3a4855]'
        }`}>
          
          <div 
            onClick={() => setWatchScreen(watchScreen === 'launcher' ? 'home' : 'launcher')}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-16 rounded-r-lg bg-[#3f4941] dark:bg-[#6f7a71] shadow-md cursor-pointer hover:scale-105 transition-transform flex items-center justify-center text-[10px] text-white font-bold rotate-90" 
            title="Press Crown for App Menu"
          >
            MENU
          </div>

          {/* Physical Screen Canvas (406px active area with safe circular padding) */}
          <div className={`relative w-[406px] h-[406px] rounded-full overflow-hidden flex flex-col items-center justify-between px-10 pt-10 pb-8 text-center transition-colors ${
            themeMode === 'day' ? 'bg-[#f7f9ff] text-[#121d26]' : 'bg-[#0b0f14] text-[#e8f2ff]'
          }`}>

           

            {/* WATCH SCREEN 1: APP LAUNCHER GRID */}
            {watchScreen === 'launcher' && (
              <div className="flex flex-col items-center justify-center flex-1 my-auto w-full">
                <h3 className="text-sm font-bold mb-2">SereneOS Apps</h3>
                <div className="grid grid-cols-3 gap-2 w-full max-w-[280px]">
                  <button onClick={() => setWatchScreen('home')} className="p-2 rounded-xl bg-[#006038] text-white text-[10px] font-bold flex flex-col items-center justify-center gap-1 shadow-sm">
                    <Activity className="w-3.5 h-3.5" /> Watch
                  </button>
                  <button onClick={() => setWatchScreen('dashboard')} className="p-2 rounded-xl bg-[#1f7a4d] text-white text-[10px] font-bold flex flex-col items-center justify-center gap-1 shadow-sm">
                    <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                  </button>
                  <button onClick={() => setWatchScreen('meds')} className="p-2 rounded-xl bg-[#52606d] text-white text-[10px] font-bold flex flex-col items-center justify-center gap-1 shadow-sm">
                    <Pill className="w-3.5 h-3.5" /> Meds
                  </button>
                  <button onClick={() => setWatchScreen('aiVoice')} className="p-2 rounded-xl bg-[#8a3942] text-white text-[10px] font-bold flex flex-col items-center justify-center gap-1 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" /> AI Voice
                  </button>
                  <button onClick={() => setWatchScreen('log')} className="p-2 rounded-xl bg-[#00522f] text-white text-[10px] font-bold flex flex-col items-center justify-center gap-1 shadow-sm">
                    <PlusCircle className="w-3.5 h-3.5" /> Log
                  </button>
                  <button onClick={() => setWatchScreen('caregiver')} className="p-2 rounded-xl bg-[#ba1a1a] text-white text-[10px] font-bold flex flex-col items-center justify-center gap-1 shadow-sm">
                    <PhoneCall className="w-3.5 h-3.5" /> Care
                  </button>
                </div>
              </div>
            )}

            {/* WATCH SCREEN 2: HOME */}
            {watchScreen === 'home' && (
              <div className="flex flex-col items-center justify-center flex-1 my-auto w-full">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-1 shadow-sm ${
                  glucoseStatus === 'Good' 
                    ? 'bg-[#1f7a4d] text-white' 
                    : glucoseStatus === 'High' 
                    ? 'bg-[#9a5b00] text-white' 
                    : 'bg-[#b3261e] text-white'
                }`}>
                  {glucoseStatus === 'Good' && <span>● Good</span>}
                  {glucoseStatus === 'High' && <span>▲ High</span>}
                  {glucoseStatus === 'Low' && <span>▼ Low</span>}
                  <span className="opacity-75">|</span>
                  <span>{glucoseTrend === 'rising' ? 'Going up' : glucoseTrend === 'falling' ? 'Going down' : 'Stable'}</span>
                </div>

                <div className="flex items-baseline justify-center gap-1 my-0">
                  <span className="text-[58px] font-bold leading-none tracking-tight tabular-nums">
                    {currentGlucose}
                  </span>
                  <span className="text-base font-semibold opacity-80">mg/dL</span>
                </div>

                <p className="text-xs font-medium px-2 mt-1 opacity-90">
                  {glucoseStatus === 'Good' ? 'Euglycemic state maintained.' : glucoseStatus === 'High' ? 'Elevated reading. Stay hydrated.' : 'Eat fast-acting carbs now.'}
                </p>
              </div>
            )}

            {/* WATCH SCREEN 3: DASHBOARD WITH RECHARTS LINE CHART */}
            {watchScreen === 'dashboard' && (
              <div className="flex flex-col items-center justify-center flex-1 my-auto w-full px-2">
                <h3 className="text-xs font-bold mb-1">24h Glucose Trend (Recharts)</h3>
                
                <div className="w-full h-32 my-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={GLUCOSE_24H_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <ReferenceArea y1={70} y2={180} fill={themeMode === 'day' ? '#edf4ff' : '#16222e'} opacity={0.6} />
                      <XAxis dataKey="time" stroke={themeMode === 'day' ? '#3f4941' : '#a2afbc'} fontSize={9} />
                      <YAxis domain={[50, 250]} stroke={themeMode === 'day' ? '#3f4941' : '#a2afbc'} fontSize={9} />
                      <Tooltip contentStyle={{ background: themeMode === 'day' ? '#ffffff' : '#161e26', borderRadius: '8px', fontSize: '10px' }} />
                      <Line type="monotone" dataKey="mgdl" stroke={themeMode === 'day' ? '#006038' : '#7fd1a8'} strokeWidth={2.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-between w-full text-[10px] px-2 font-semibold opacity-80">
                  <span>Range: 88% in target</span>
                  <span>Avg: 132 mg/dL</span>
                </div>
              </div>
            )}

            {/* WATCH SCREEN 4: MEDICATIONS & INSULIN */}
            {watchScreen === 'meds' && (
              <div className="flex flex-col items-center justify-center flex-1 my-auto w-full px-2">
                <Pill className="w-6 h-6 text-[#006038] dark:text-[#7fd1a8] mb-0.5" />
                <h3 className="text-xs font-bold">Medication & Insulin</h3>
                <div className="w-full text-left bg-gray-100 dark:bg-gray-800 p-2 rounded-xl my-1.5 text-[11px]">
                  <div className="font-bold">Humalog (4 units)</div>
                  <div className="opacity-75">15 mins post-meal reminder</div>
                </div>
                <button onClick={() => markMedicationTaken('m1')} className="w-full py-1.5 rounded-xl bg-[#006038] text-white font-bold text-[11px] shadow-sm">
                  Mark Taken
                </button>
              </div>
            )}

            {/* WATCH SCREEN 5: AI VOICE ASSISTANT */}
            {watchScreen === 'aiVoice' && (
              <div className="flex flex-col items-center justify-center flex-1 my-auto w-full px-2">
                <Sparkles className="w-5 h-5 text-[#006038] dark:text-[#7fd1a8] mb-0.5 animate-pulse" />
                <h3 className="text-xs font-bold">AI Voice Assistant</h3>
                <p className="text-[10px] opacity-90 line-clamp-3 my-1 px-1">
                  {aiInsight}
                </p>
                <button 
                  onClick={() => speakText(`AI Health Analysis: ${aiInsight}. Current glucose is ${currentGlucose} milligrams per deciliter, which is ${glucoseStatus}.`)}
                  className="w-full py-1.5 rounded-xl bg-[#006038] text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-md hover:opacity-90"
                >
                  <Mic className="w-3 h-3" /> Listen to AI Voice
                </button>
              </div>
            )}

            {/* WATCH SCREEN 6: QUICK LOG */}
            {watchScreen === 'log' && (
              <div className="flex flex-col items-center justify-center flex-1 my-auto w-full px-2">
                <h3 className="text-xs font-bold mb-1.5">Quick Event Log</h3>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <button onClick={() => { setNewLogType('meal'); setLogModalOpen(true); }} className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 text-[10px] font-bold flex flex-col items-center">
                    <Utensils className="w-3.5 h-3.5 text-[#006038] mb-0.5" /> Log Meal
                  </button>
                  <button onClick={() => { setNewLogType('insulin'); setLogModalOpen(true); }} className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 text-[10px] font-bold flex flex-col items-center">
                    <Syringe className="w-3.5 h-3.5 text-[#1f7a4d] mb-0.5" /> Insulin
                  </button>
                </div>
              </div>
            )}

            {/* WATCH SCREEN 7: CAREGIVER */}
            {watchScreen === 'caregiver' && (
              <div className="flex flex-col items-center justify-center flex-1 my-auto w-full px-2">
                <ShieldCheck className="w-6 h-6 text-[#006038] dark:text-[#7fd1a8] mb-0.5" />
                <h3 className="text-xs font-bold">Caregiver Alert</h3>
                <p className="text-[11px] opacity-80 mb-1.5">Sarah Johnson (Daughter)</p>
                <button onClick={() => setEmergencyModalOpen(true)} className="w-full py-1.5 rounded-xl bg-[#ba1a1a] text-white font-bold text-[11px] shadow-md">
                  Call Primary Contact
                </button>
              </div>
            )}

            {/* Watch Bottom Navigation Dots */}
            <div className="w-full flex items-center justify-center gap-1">
              {(['launcher', 'home', 'dashboard', 'meds', 'aiVoice', 'caregiver'] as const).map(scr => (
                <button 
                  key={scr}
                  onClick={() => setWatchScreen(scr)} 
                  className={`w-1.5 h-1.5 rounded-full transition-all ${watchScreen === scr ? 'bg-[#006038] dark:bg-[#7fd1a8] w-3.5' : 'bg-gray-400 opacity-50'}`} 
                  title={scr}
                />
              ))}
            </div>

          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button 
            onClick={() => setWatchScreen('launcher')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 ${themeMode === 'day' ? 'border-gray-400 hover:bg-gray-100' : 'border-gray-600 hover:bg-gray-800'}`}
          >
            <Grid className="w-3.5 h-3.5" /> App Menu
          </button>
          <button 
            onClick={() => setWatchScreen('home')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 ${themeMode === 'day' ? 'border-gray-400 hover:bg-gray-100' : 'border-gray-600 hover:bg-gray-800'}`}
          >
            <Activity className="w-3.5 h-3.5" /> Home
          </button>
        </div>
      </main>

      {/* Emergency Call Modal */}
      {emergencyModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-md p-6 rounded-2xl shadow-2xl ${themeMode === 'day' ? 'bg-white text-[#121d26]' : 'bg-[#161e26] text-[#e8f2ff]'}`}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
                <PhoneCall className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Calling Caregiver</h3>
              <p className="text-lg font-semibold text-[#ba1a1a] mb-4">Sarah Johnson (+1 555-234-5678)</p>
              <p className="text-sm opacity-75 mb-6">Transmitting current glucose telemetry (128 mg/dL - Stable) securely to emergency contact.</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setEmergencyModalOpen(false)}
                  className="flex-1 py-3 rounded-xl font-bold bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  Cancel Call
                </button>
                <button 
                  onClick={() => {
                    alert("Connected to Sarah Johnson.");
                    setEmergencyModalOpen(false);
                  }}
                  className="flex-1 py-3 rounded-xl font-bold bg-[#ba1a1a] text-white"
                >
                  End Call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Entry Modal */}
      {logModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-md p-6 rounded-2xl shadow-2xl ${themeMode === 'day' ? 'bg-white text-[#121d26]' : 'bg-[#161e26] text-[#e8f2ff]'}`}>
            <h3 className="text-xl font-bold mb-4 capitalize">Log {newLogType}</h3>
            <form onSubmit={handleAddLog} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  {newLogType === 'meal' ? 'Meal Description / Carbs' : 'Reading / Value (mg/dL or units)'}
                </label>
                <input 
                  type="text" 
                  value={newLogVal} 
                  onChange={(e) => setNewLogVal(e.target.value)} 
                  placeholder={newLogType === 'meal' ? 'e.g. Oatmeal & Fruit (45g carbs)' : 'e.g. 130'} 
                  className={`w-full p-3 rounded-xl border text-lg font-bold tabular-nums ${themeMode === 'day' ? 'border-gray-300 bg-gray-50' : 'border-gray-700 bg-gray-900'}`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Additional Notes</label>
                <input 
                  type="text" 
                  value={newLogNotes} 
                  onChange={(e) => setNewLogNotes(e.target.value)} 
                  placeholder="e.g. Post lunch walk" 
                  className={`w-full p-3 rounded-xl border text-sm ${themeMode === 'day' ? 'border-gray-300 bg-gray-50' : 'border-gray-700 bg-gray-900'}`}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setLogModalOpen(false)}
                  className="flex-1 py-3 rounded-xl font-bold bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className={`flex-1 py-3 rounded-xl font-bold ${themeMode === 'day' ? 'tactile-btn-day' : 'tactile-btn-night'}`}
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
