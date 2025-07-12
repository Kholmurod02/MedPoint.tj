import { Card } from '@/shared/ui/card'
import { HeartPulse } from 'lucide-react'
import React from 'react'

const SpecializationCard = ({ Specialty }) => {
    return (
        <Card
            className="px-4   rounded-lg transition-all duration-300 hover:bg-slate-700 hover:text-white bg-white text-slate-700 hover:shadow-lg cursor-pointer group"
        >
            <div className="flex flex-col items-center space-y-4">
                <div className="p-3 rounded-full bg-sky-100 group-hover:bg-white/20 transition-all duration-300">
                    <HeartPulse
                        className="w-8 h-8 text-sky-500 group-hover:text-white transition-all duration-300"
                        fill="currentColor"
                    />
                </div>
                <h3 className="font-semibold text-lg"> {Specialty?.name} </h3>
            </div>
        </Card>
    )
}

export default SpecializationCard