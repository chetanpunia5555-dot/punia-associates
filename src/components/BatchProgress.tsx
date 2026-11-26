import React from 'react';
import { RefreshCw, CheckCircle2, Upload, FolderArchive, FileText, Database, HardDrive, Pause, Play, XCircle } from 'lucide-react';

export interface BatchProgressProps {
  stage: 'IDLE' | 'UPLOADING' | 'EXTRACTING' | 'VALIDATING' | 'METADATA_EXTRACTION' | 'PREVIEW_READY' | 'COMMITTING' | 'PAUSED' | 'COMPLETED';
  percent: number;
  fileName?: string;
  totalFiles?: number;
  processedFiles?: number;
  errorMessage?: string | null;
  onPause?: () => void;
  onResume?: () => void;
  onCancel?: () => void;
}

export const BatchProgress: React.FC<BatchProgressProps> = ({
  stage,
  percent,
  fileName,
  totalFiles = 0,
  processedFiles = 0,
  errorMessage,
  onPause,
  onResume,
  onCancel
}) => {
  const getStageStepNumber = (s: string) => {
    switch (s) {
      case 'UPLOADING': return 1;
      case 'EXTRACTING': return 2;
      case 'VALIDATING': return 3;
      case 'METADATA_EXTRACTION': return 4;
      case 'COMMITTING': return 5;
      case 'PREVIEW_READY':
      case 'COMPLETED': return 6;
      default: return 0;
    }
  };

  const currentStep = getStageStepNumber(stage);

  return (
    <div className="p-6 bg-slate-950 border border-amber-500/40 rounded-3xl space-y-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            {stage === 'UPLOADING' ? (
              <Upload className="w-5 h-5 animate-bounce" />
            ) : stage === 'EXTRACTING' ? (
              <FolderArchive className="w-5 h-5 animate-pulse" />
            ) : stage === 'VALIDATING' ? (
              <FileText className="w-5 h-5 animate-pulse" />
            ) : stage === 'COMMITTING' ? (
              <Database className="w-5 h-5 animate-spin" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Batch Stage: {stage.replace(/_/g, ' ')}
              </h4>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
                {percent}%
              </span>
            </div>
            {fileName && (
              <p className="text-xs text-slate-400 font-mono mt-0.5 truncate max-w-md">
                Target: {fileName} {totalFiles > 0 ? `(${processedFiles}/${totalFiles} items)` : ''}
              </p>
            )}
          </div>
        </div>

        {/* Controls: Pause, Resume, Cancel */}
        <div className="flex items-center gap-2">
          {stage === 'PAUSED' ? (
            onResume && (
              <button
                type="button"
                onClick={onResume}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            )
          ) : (
            onPause && percent < 100 && (
              <button
                type="button"
                onClick={onPause}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </button>
            )
          )}

          {onCancel && percent < 100 && (
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1.5 bg-slate-900 hover:bg-red-950/60 text-red-400 hover:text-red-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-800"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden p-0.5 border border-slate-800">
        <div
          className="bg-gradient-to-r from-amber-500 via-cyan-400 to-emerald-400 h-full transition-all duration-300 rounded-full shadow-lg"
          style={{ width: `${Math.max(percent, 5)}%` }}
        />
      </div>

      {/* 5-Stage Detailed Progress Tracker */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center text-[10px] uppercase font-extrabold tracking-wider">
        <div className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition ${
          currentStep >= 1 ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow' : 'bg-slate-900/80 border-slate-800 text-slate-500'
        }`}>
          <Upload className="w-3.5 h-3.5 mb-0.5" />
          <span>1. Uploading</span>
          <span className="font-mono text-[9px] opacity-80">{percent >= 20 ? '100%' : `${Math.min(percent * 5, 100)}%`}</span>
        </div>

        <div className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition ${
          currentStep >= 2 ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow' : 'bg-slate-900/80 border-slate-800 text-slate-500'
        }`}>
          <FolderArchive className="w-3.5 h-3.5 mb-0.5" />
          <span>2. Extraction</span>
          <span className="font-mono text-[9px] opacity-80">{currentStep >= 2 ? 'Complete' : 'Pending'}</span>
        </div>

        <div className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition ${
          currentStep >= 3 ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow' : 'bg-slate-900/80 border-slate-800 text-slate-500'
        }`}>
          <FileText className="w-3.5 h-3.5 mb-0.5" />
          <span>3. Validation</span>
          <span className="font-mono text-[9px] opacity-80">{currentStep >= 3 ? 'Verified' : 'Pending'}</span>
        </div>

        <div className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition ${
          currentStep >= 4 ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow' : 'bg-slate-900/80 border-slate-800 text-slate-500'
        }`}>
          <HardDrive className="w-3.5 h-3.5 mb-0.5" />
          <span>4. Storage</span>
          <span className="font-mono text-[9px] opacity-80">{currentStep >= 4 ? 'Saved' : 'Pending'}</span>
        </div>

        <div className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition ${
          currentStep >= 5 ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow' : 'bg-slate-900/80 border-slate-800 text-slate-500'
        }`}>
          <Database className="w-3.5 h-3.5 mb-0.5" />
          <span>5. Database</span>
          <span className="font-mono text-[9px] opacity-80">{currentStep >= 5 ? 'Committed' : 'Pending'}</span>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs font-mono">
          ⚠️ {errorMessage}
        </div>
      )}
    </div>
  );
};
