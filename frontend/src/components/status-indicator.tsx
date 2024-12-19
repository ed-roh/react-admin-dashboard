import { CheckCircle } from 'lucide-react'

export function StatusIndicator() {
    // In a real application, this value would be determined by your system's overall status
    const status = "normal" // Could be "normal", "attention", or "problem"

    const getStatusColor = (status: string) => {
        switch (status) {
            case "normal":
                return "text-green-500"
            case "attention":
                return "text-yellow-500"
            case "problem":
                return "text-red-500"
            default:
                return "text-gray-500"
        }
    }

    return (
        <div className="flex items-center space-x-2">
            <CheckCircle className={`h-6 w-6 ${getStatusColor(status)}`} />
            <span className="font-medium">Sistema funcionando normalmente</span>
        </div>
    )
}

