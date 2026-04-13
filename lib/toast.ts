import { toast } from 'sonner'

export const notify = {
    success: (msg: string, sub?: string) =>
        toast.success(msg, { description: sub }),
    error: (msg: string, sub?: string) =>
        toast.error(msg, { description: sub }),
    warning: (msg: string, sub?: string) =>
        toast.warning(msg, { description: sub }),
    loading: (msg: string) =>
        toast.loading(msg),
    dismiss: (id: string | number) =>
        toast.dismiss(id),
}
