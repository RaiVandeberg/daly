
interface LabelProps {
    name: string
}

export function Label({ name }: LabelProps) {
    return (
        <div
        className="flex-grow sm:flex-grow-0 py-1 px-3 bg-gray-200 rounded-full text-sm text-center text-gray-600 font-semibold hover:bg-gray-300 transition-all duration-300">
            {name}
        </div>
    )
}