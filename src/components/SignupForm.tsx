import { useState } from 'preact/hooks';
import type { Lang } from '../i18n/translations';
import { translations } from '../i18n/translations';

type VibeKey = 'cool' | 'tutor' | 'creative' | 'fun';

interface SignupProps {
  lang: Lang;
}

interface FormData {
  parentEmail: string;
  parentPhone: string;
  kidName: string;
  kidAge: string;
  kidGrade: string;
  interests: string;
  language: 'vi' | 'en';
  agentName: string;
  vibe: VibeKey;
  strictness: number;
  tosAccepted: boolean;
}

const initialForm: FormData = {
  parentEmail: '',
  parentPhone: '',
  kidName: '',
  kidAge: '',
  kidGrade: '',
  interests: '',
  language: 'vi',
  agentName: '',
  vibe: 'tutor',
  strictness: 50,
  tosAccepted: false,
};

export default function SignupForm({ lang }: SignupProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const t = translations[lang].signup;
  const totalSteps = 5;

  const update = (field: keyof FormData, value: string | number | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const canProceed = () => {
    switch (step) {
      case 0: {
        const hasOne = form.parentEmail.trim() !== '' || form.parentPhone.trim() !== '';
        const emailValid = form.parentEmail.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.parentEmail.trim());
        return hasOne && emailValid;
      }
      case 1: return form.kidName.trim() !== '' && form.kidAge.trim() !== '';
      case 2: return form.agentName.trim() !== '';
      case 3: return true;
      case 4: return form.tosAccepted;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // TODO: POST to API endpoint
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    alert(lang === 'vi' ? 'Đã tạo thành công! (demo)' : 'Created successfully! (demo)');
  };

  const progress = (step / (totalSteps - 1)) * 100;

  return (
    <div class="max-w-lg mx-auto">
      {/* Progress bar */}
      <div class="mb-8">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium text-violet-600">
            {t.stepIndicator(step + 1, totalSteps)}
          </span>
          <span class="text-sm text-gray-400">{Math.round(progress)}%</span>
        </div>
        <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step 0: Parent Account */}
      {step === 0 && (
        <div class="space-y-5">
          <div>
            <h2 class="text-2xl font-bold mb-1">{t.step0.title}</h2>
            <p class="text-gray-500">{t.step0.subtitle}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{t.step0.email}</label>
            <input
              type="email"
              value={form.parentEmail}
              onInput={(e) => update('parentEmail', (e.target as HTMLInputElement).value)}
              placeholder={t.step0.emailPlaceholder}
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition"
            />
            {form.parentEmail.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.parentEmail.trim()) && (
              <p class="text-xs text-red-500 mt-1">{t.step0.invalidEmail}</p>
            )}
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{t.step0.phone}</label>
            <input
              type="tel"
              value={form.parentPhone}
              onInput={(e) => update('parentPhone', (e.target as HTMLInputElement).value)}
              placeholder={t.step0.phonePlaceholder}
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition"
            />
          </div>

          {form.parentEmail.trim() === '' && form.parentPhone.trim() === '' && (
            <p class="text-xs text-red-500">{t.step0.atLeastOne}</p>
          )}

          <p class="text-xs text-gray-400">🔒 {lang === 'vi' ? 'Thông tin chỉ dùng để gửi báo cáo và quản lý tài khoản' : 'Only used for reports and account management'}</p>
        </div>
      )}

      {/* Step 1: Kid's Profile */}
      {step === 1 && (
        <div class="space-y-5">
          <div>
            <h2 class="text-2xl font-bold mb-1">{t.step1.title}</h2>
            <p class="text-gray-500">{t.step1.subtitle}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{t.step1.kidName}</label>
            <input
              type="text"
              value={form.kidName}
              onInput={(e) => update('kidName', (e.target as HTMLInputElement).value)}
              placeholder={t.step1.kidNamePlaceholder}
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{t.step1.kidAge}</label>
              <select
                value={form.kidAge}
                onChange={(e) => update('kidAge', (e.target as HTMLSelectElement).value)}
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition appearance-none bg-white"
              >
                <option value="">{lang === 'vi' ? 'Chọn tuổi' : 'Select age'}</option>
                {[6, 7, 8, 9, 10].map((age) => (
                  <option key={age} value={String(age)}>{age}</option>
                ))}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{t.step1.kidGrade}</label>
              <input
                type="text"
                value={form.kidGrade}
                onInput={(e) => update('kidGrade', (e.target as HTMLInputElement).value)}
                placeholder={t.step1.kidGradePlaceholder}
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{t.step1.interests}</label>
            <input
              type="text"
              value={form.interests}
              onInput={(e) => update('interests', (e.target as HTMLInputElement).value)}
              placeholder={t.step1.interestsPlaceholder}
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition"
            />
            <p class="text-xs text-gray-400 mt-1">{t.step1.interestsHint}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{t.step1.language}</label>
            <div class="flex gap-3">
              {(['vi', 'en'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => update('language', l)}
                  class={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition ${
                    form.language === l
                      ? 'border-violet-500 bg-violet-50 text-violet-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {l === 'vi' ? t.step1.langVi : t.step1.langEn}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Name the Agent */}
      {step === 2 && (
        <div class="space-y-5">
          <div>
            <h2 class="text-2xl font-bold mb-1">{t.step2.title}</h2>
            <p class="text-gray-500">{t.step2.subtitle}</p>
          </div>

          <div class="bg-violet-50 rounded-2xl p-6 text-center mb-4">
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-3 text-3xl text-white font-bold">
              {form.agentName ? form.agentName.charAt(0).toUpperCase() : '?'}
            </div>
            {form.agentName && (
              <p class="text-lg font-semibold text-violet-700">{form.agentName}</p>
            )}
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{t.step2.agentName}</label>
            <input
              type="text"
              value={form.agentName}
              onInput={(e) => update('agentName', (e.target as HTMLInputElement).value)}
              placeholder={t.step2.agentNamePlaceholder}
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition text-center text-lg"
              autofocus
            />
            <p class="text-xs text-gray-400 mt-1 text-center">{t.step2.agentNameHint}</p>
          </div>
        </div>
      )}

      {/* Step 3: Personality */}
      {step === 3 && (
        <div class="space-y-5">
          <div>
            <h2 class="text-2xl font-bold mb-1">{t.step3.title}</h2>
            <p class="text-gray-500">{t.step3.subtitle}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{t.step3.vibe}</label>
            <div class="grid grid-cols-2 gap-3">
              {(Object.keys(t.step3.vibes) as VibeKey[]).map((key) => {
                const vibe = t.step3.vibes[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => update('vibe', key)}
                    class={`p-4 rounded-xl border-2 text-left transition ${
                      form.vibe === key
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span class="text-2xl">{vibe.emoji}</span>
                    <p class="font-semibold text-sm mt-1">{vibe.name}</p>
                    <p class="text-xs text-gray-500 mt-0.5">{vibe.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{t.step3.strictness}</label>
            <div class="bg-gray-50 rounded-xl p-4">
              <input
                type="range"
                min="0"
                max="100"
                value={form.strictness}
                onInput={(e) => update('strictness', Number((e.target as HTMLInputElement).value))}
                class="w-full accent-violet-500"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>{t.step3.strictnessLenient}</span>
                <span>{t.step3.strictnessFirm}</span>
              </div>
              <p class="text-xs text-gray-400 mt-2">{t.step3.strictnessHint}</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && (
        <div class="space-y-5">
          <div>
            <h2 class="text-2xl font-bold mb-1">{t.step4.title}</h2>
            <p class="text-gray-500">{t.step4.subtitle}</p>
          </div>

          <div class="bg-violet-50 rounded-2xl p-6 text-center mb-4">
            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-2 text-2xl text-white font-bold">
              {form.agentName.charAt(0).toUpperCase()}
            </div>
            <p class="text-xl font-bold text-violet-700">{form.agentName}</p>
            <p class="text-sm text-violet-500">
              {t.step3.vibes[form.vibe].emoji} {t.step3.vibes[form.vibe].name}
            </p>
          </div>

          {/* Summary cards */}
          <div class="space-y-3">
            <div class="bg-white rounded-xl border border-gray-200 p-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-semibold text-gray-700">{t.step4.account}</span>
                <button type="button" onClick={() => setStep(0)} class="text-xs text-violet-600 hover:text-violet-700 font-medium">{t.step4.editBtn}</button>
              </div>
              <div class="text-sm text-gray-600 space-y-1">
                {form.parentEmail && <p>📧 {form.parentEmail}</p>}
                {form.parentPhone && <p>📱 {form.parentPhone}</p>}
              </div>
            </div>

            <div class="bg-white rounded-xl border border-gray-200 p-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-semibold text-gray-700">{t.step4.kidProfile}</span>
                <button type="button" onClick={() => setStep(1)} class="text-xs text-violet-600 hover:text-violet-700 font-medium">{t.step4.editBtn}</button>
              </div>
              <div class="text-sm text-gray-600 space-y-1">
                <p>{form.kidName}, {form.kidAge} {form.kidGrade ? `— ${form.kidGrade}` : ''}</p>
                {form.interests && <p class="text-gray-400">{form.interests}</p>}
              </div>
            </div>

            <div class="bg-white rounded-xl border border-gray-200 p-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-semibold text-gray-700">{t.step4.agentProfile}</span>
                <button type="button" onClick={() => setStep(2)} class="text-xs text-violet-600 hover:text-violet-700 font-medium">{t.step4.editBtn}</button>
              </div>
              <p class="text-sm text-gray-600">{form.agentName}</p>
            </div>

            <div class="bg-white rounded-xl border border-gray-200 p-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-semibold text-gray-700">{t.step4.personality}</span>
                <button type="button" onClick={() => setStep(3)} class="text-xs text-violet-600 hover:text-violet-700 font-medium">{t.step4.editBtn}</button>
              </div>
              <p class="text-sm text-gray-600">
                {t.step3.vibes[form.vibe].emoji} {t.step3.vibes[form.vibe].name} — {t.step3.vibes[form.vibe].desc}
              </p>
              <p class="text-xs text-gray-400 mt-1">
                {t.step4.strictness}: {form.strictness < 33 ? t.step3.strictnessLenient : form.strictness < 66 ? '—' : t.step3.strictnessFirm}
              </p>
            </div>
          </div>

          {/* ToS checkbox */}
          <label class="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.tosAccepted}
              onChange={(e) => update('tosAccepted', (e.target as HTMLInputElement).checked)}
              class="mt-1 w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 accent-violet-600"
            />
            <span class="text-sm text-gray-600">{t.step4.tosLabel}</span>
          </label>
        </div>
      )}

      {/* Navigation buttons */}
      <div class="flex justify-between mt-8">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            class="px-6 py-3 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition"
          >
            {t.back}
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            class={`px-8 py-3 rounded-xl font-semibold transition shadow-lg ${
              canProceed()
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 shadow-violet-500/25'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            {t.next}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed() || submitting}
            class={`px-8 py-3 rounded-xl font-semibold transition shadow-lg ${
              canProceed() && !submitting
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 shadow-violet-500/25'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            {submitting ? t.step4.creating : t.step4.createBtn}
          </button>
        )}
      </div>
    </div>
  );
}
