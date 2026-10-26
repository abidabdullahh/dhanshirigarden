import { site } from '../data/site'

const REQUEST_TIMEOUT_MS = 60000
const STATUSES = ['healthy', 'mild', 'moderate', 'severe']
const CONFIDENCES = ['high', 'medium', 'low']

export class PlantDoctorError extends Error {
  constructor(kind) {
    super(kind)
    this.kind = kind // 'network' | 'server' | 'timeout'
  }
}

const text = (value) => (typeof value === 'string' ? value.trim() : '')
const list = (value) =>
  (Array.isArray(value) ? value : []).map(text).filter(Boolean).slice(0, 12)

/** Defensive normalisation: the model/worker output is never trusted to be perfectly shaped. */
export function normalizeReport(raw) {
  const data = raw && typeof raw === 'object' ? raw : {}
  const status = STATUSES.includes(data.status) ? data.status : 'mild'
  const treatment = data.treatment && typeof data.treatment === 'object' ? data.treatment : {}
  const schedule = (Array.isArray(data.schedule) ? data.schedule : [])
    .map((row) => ({ day: text(row?.day), action: text(row?.action) }))
    .filter((row) => row.day && row.action)
    .slice(0, 10)

  return {
    isPlant: data.isPlant !== false,
    plantName: text(data.plantName),
    status,
    diagnosis: text(data.diagnosis),
    confidence: CONFIDENCES.includes(data.confidence) ? data.confidence : 'medium',
    summary: text(data.summary),
    causes: list(data.causes),
    urgency: text(data.urgency),
    treatment: {
      organic: list(treatment.organic),
      chemical: list(treatment.chemical),
      tools: list(treatment.tools),
    },
    schedule,
    prevention: list(data.prevention),
    needsExpert: data.needsExpert === true || status === 'severe',
  }
}

/** POSTs the (already resized) photo to the Plant Doctor worker and returns a normalised report. */
export async function analyzePlant({ base64, mediaType, lang, context, signal }) {
  if (!site.plantDoctorEndpoint) throw new PlantDoctorError('server')

  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort('timeout'), REQUEST_TIMEOUT_MS)
  const onAbort = () => controller.abort('cancelled')
  signal?.addEventListener('abort', onAbort)

  try {
    const response = await fetch(site.plantDoctorEndpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ image: base64, mediaType, lang, context }),
      signal: controller.signal,
    })
    if (!response.ok) throw new PlantDoctorError('server')
    const data = await response.json()
    if (!data || typeof data !== 'object' || data.error) throw new PlantDoctorError('server')
    return normalizeReport(data)
  } catch (error) {
    if (error instanceof PlantDoctorError) throw error
    if (controller.signal.aborted) {
      if (controller.signal.reason === 'cancelled') throw error
      throw new PlantDoctorError('timeout')
    }
    throw new PlantDoctorError('network')
  } finally {
    window.clearTimeout(timer)
    signal?.removeEventListener('abort', onAbort)
  }
}
