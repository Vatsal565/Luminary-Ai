'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SWOTData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

const SWOTAnalysis = ({ swotData }: { swotData: SWOTData }) => (
  <div className="lg:w-2/3 w-full animate-slide-in-right">
    <div className="grid md:grid-cols-2 gap-6">
      {[
        {
          title: "Strengths",
          color: "from-green-50 to-green-100",
          textColor: "text-green-800",
          items: swotData.strengths,
        },
        {
          title: "Weaknesses",
          color: "from-red-50 to-red-100",
          textColor: "text-red-800",
          items: swotData.weaknesses,
        },
        {
          title: "Opportunities",
          color: "from-blue-50 to-blue-100",
          textColor: "text-blue-800",
          items: swotData.opportunities,
        },
        {
          title: "Threats",
          color: "from-yellow-50 to-yellow-100",
          textColor: "text-yellow-800",
          items: swotData.threats,
        },
      ].map((section, index) => (
        <Card
          key={index}
          className={`transform hover:scale-105 transition-all duration-300 shadow-lg bg-gradient-to-br ${section.color} hover:shadow-xl`}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <CardHeader className="p-4">
            <CardTitle className={`text-xl font-bold flex items-center gap-3 ${section.textColor}`}>
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-center gap-2 group">
                  <div className={`w-2 h-2 rounded-full bg-${section.textColor.split("-")[1]}-500`}></div>
                  <span className={`${section.textColor} transform group-hover:translate-x-2 transition-transform`}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default SWOTAnalysis;