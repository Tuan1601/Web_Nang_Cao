'use client';

import React from 'react';
import { Plus, Check, X, Calendar, BookOpen, AlignLeft, Flag } from 'lucide-react';
import { useDeadlineForm } from '@/features/deadlines/hooks/useDeadlineForm';
import { useAppDispatch } from '@/store/hooks';
import { addDeadline, updateDeadline } from '@/features/deadlines/deadlinesSlice';
import type { Deadline, Priority } from '@/features/deadlines/types/deadline.types';
import { Button } from '@/shared/components/Button';

interface DeadlineFormProps {
  onClose: () => void;
  editTarget?: Deadline;
}

const PRIORITY_OPTIONS: { value: Priority; label: string; emoji: string }[] = [
  { value: 'low',    label: 'Thấp',      emoji: '🟢' },
  { value: 'medium', label: 'Trung bình', emoji: '🟡' },
  { value: 'high',   label: 'Cao',        emoji: '🔴' },
];

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

function isoToInputDate(iso: string): string {
  try { return new Date(iso).toISOString().split('T')[0]; }
  catch { return ''; }
}

function FieldLabel({ icon: Icon, label, required }: { icon: React.ElementType; label: string; required?: boolean }) {
  return (
    <label className="flex items-center gap-1.5 text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
      <Icon size={12} />
      {label}
      {required && <span className="text-red-500 normal-case tracking-normal font-normal">*</span>}
    </label>
  );
}

export function DeadlineForm({ onClose, editTarget }: DeadlineFormProps) {
  const isEdit = !!editTarget;

  const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useDeadlineForm(
    editTarget
      ? {
          subject:  editTarget.subject,
          title:    editTarget.title,
          dueDate:  isoToInputDate(editTarget.dueDate),
          priority: editTarget.priority,
        }
      : undefined
  );

  const dispatch = useAppDispatch();

  const onSubmit = () => {
    handleSubmit((formValues) => {
      const dueDate = new Date(formValues.dueDate + 'T23:59:59').toISOString();

      if (isEdit && editTarget) {
        dispatch(
          updateDeadline({
            id:       editTarget.id,
            subject:  formValues.subject.trim(),
            title:    formValues.title.trim(),
            dueDate,
            priority: formValues.priority,
          })
        );
      } else {
        dispatch(
          addDeadline({
            subject:  formValues.subject.trim(),
            title:    formValues.title.trim(),
            dueDate,
            priority: formValues.priority,
          })
        );
      }
      resetForm();
      onClose();
    });
  };

  const inputCls = (hasError: boolean) =>
    `field-base ${hasError ? 'field-error' : ''}`;

  return (
    <div className="space-y-4">
      <div>
        <FieldLabel icon={BookOpen} label="Môn học" required />
        <input
          id="form-subject"
          type="text"
          value={values.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          placeholder="Ví dụ: Lập trình Web nâng cao"
          className={inputCls(!!errors.subject)}
        />
        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
      </div>

      <div>
        <FieldLabel icon={AlignLeft} label="Tên bài tập" required />
        <input
          id="form-title"
          type="text"
          value={values.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Ví dụ: Xây dựng ứng dụng Redux Toolkit"
          className={inputCls(!!errors.title)}
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
      </div>

      <div>
        <FieldLabel icon={Calendar} label="Hạn nộp" required />
        <input
          id="form-dueDate"
          type="date"
          value={values.dueDate}
          min={isEdit ? undefined : getTodayString()}
          onChange={(e) => handleChange('dueDate', e.target.value)}
          className={inputCls(!!errors.dueDate)}
        />
        {errors.dueDate && <p className="mt-1 text-xs text-red-500">{errors.dueDate}</p>}
      </div>

      <div>
        <FieldLabel icon={Flag} label="Độ ưu tiên" required />
        <div className="grid grid-cols-3 gap-2">
          {PRIORITY_OPTIONS.map(({ value, label, emoji }) => {
            const active = values.priority === value;
            const activeCls =
              value === 'low'    ? 'border-slate-400 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200' :
              value === 'medium' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' :
                                   'border-red-400 bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300';
            const idleCls = 'border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-default)]';

            return (
              <button
                key={value}
                type="button"
                onClick={() => handleChange('priority', value)}
                className={`
                  py-2 rounded-xl text-xs font-semibold border transition-all duration-150
                  ${active ? activeCls : idleCls}
                `}
                style={!active ? { background: 'var(--bg-elevated)' } : {}}
              >
                {emoji} {label}
              </button>
            );
          })}
        </div>
        {errors.priority && <p className="mt-1 text-xs text-red-500">{errors.priority}</p>}
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={() => { resetForm(); onClose(); }} className="flex-1">
          <X size={14} /> Hủy
        </Button>
        <Button type="button" variant="primary" isLoading={isSubmitting} onClick={onSubmit} className="flex-1">
          {isEdit ? <Check size={14} /> : <Plus size={14} />}
          {isEdit ? 'Lưu thay đổi' : 'Thêm deadline'}
        </Button>
      </div>
    </div>
  );
}
