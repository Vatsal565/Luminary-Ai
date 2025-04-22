'use client';
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Briefcase, BarChart2, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CompanyData {
  company: {
    official_name: string;
    industry_type: string;
    headquarters: string;
    key_products_services: string[];
    website: string;
  };
  competitors: {
    name: string;
    industry_type: string;
    headquarters: string;
    key_products_services: string[];
  }[];
}

interface SWOTSection {
    "Official Name": string;
    "Strengths of Company": string;
    "Weakness of Company": string;
    "Opportunity of Company": string;
    "Threats to the Company": string;
  }

  
  interface SWOTData {
    companies: SWOTSection[];
  }

const CompetitorCards = ({ competitors }: { competitors: CompanyData["competitors"] }) => (
  <div className="lg:w-2/3 w-full animate-slide-in-right">
    <div className="flex flex-col">
      <div className="grid md:grid-cols-2 gap-6 flex-grow">
        {competitors.slice(0, 4).map((competitor, index) => {
          const isLevel2 = index % 1 === 0;

          return (
            <Card
              key={index}
              className={`transform hover:scale-102 transition-all duration-300 shadow-lg animate-fade-in ${
                isLevel2
                  ? "bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-orange-200"
                  : "bg-gradient-to-br from-gray-900 to-black hover:shadow-gray-800"
              }`}
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <CardHeader className="p-4">
                <CardTitle className={`text-xl font-bold flex items-center gap-3 ${
                  isLevel2 ? "text-orange-800" : "text-white"
                }`}>
                  <Building2 className={isLevel2 ? "text-orange-500" : "text-white"} />
                  {competitor.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <div className="space-y-4">
                  <div className="group">
                    <h3 className={`font-semibold text-lg mb-1 ${
                      isLevel2 ? "text-orange-800" : "text-gray-200"
                    }`}>
                      Industry Type
                    </h3>
                    <p className={`transform group-hover:translate-x-2 transition-transform ${
                      isLevel2 ? "text-orange-700" : "text-gray-300"
                    }`}>
                      {competitor.industry_type}
                    </p>
                  </div>
                  <div className="group">
                    <h3 className={`font-semibold text-lg mb-1 ${
                      isLevel2 ? "text-orange-800" : "text-gray-200"
                    }`}>
                      Headquarters
                    </h3>
                    <p className={`transform group-hover:translate-x-2 transition-transform ${
                      isLevel2 ? "text-orange-700" : "text-gray-300"
                    }`}>
                      {competitor.headquarters}
                    </p>
                  </div>
                  <div>
                    <h3 className={`font-semibold text-lg mb-1 ${
                      isLevel2 ? "text-orange-800" : "text-gray-200"
                    }`}>
                      Key Products & Services
                    </h3>
                    <ul className="space-y-2">
                      {competitor.key_products_services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className={`flex items-center gap-2 group ${
                          isLevel2 ? "text-orange-700" : "text-gray-300"
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            isLevel2 ? "bg-orange-500" : "bg-white"
                          }`}></div>
                          <span className="transform group-hover:translate-x-2 transition-transform">
                            {service}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  </div>
);

export default function CompanyInfoDisplay({ companyData }: { companyData: CompanyData }) {
  const [showSWOT, setShowSWOT] = useState(false);
  const [swotData, setSwotData] = useState<SWOTData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle SWOT analysis button click
  const handleSWOTClick = async () => {
    setIsLoading(true);
    try {
        companyData.competitors.pop();
        companyData.competitors.pop();
      // Send a POST request to the SWOT analysis endpoint
      const response = await fetch("https://luminary-ai-backend.onrender.com/companies-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData), // Send the company data as the request body
      });

      if (!response.ok) {
        console.log(companyData);
        
        throw new Error("Failed to fetch SWOT analysis");
      }

      const data: SWOTData = await response.json();
      setSwotData(data); // Update the SWOT data state
      console.log(data);
      
      setShowSWOT(true); // Show the SWOT analysis component
    } catch (error) {
      console.error("Error fetching SWOT analysis:", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(companyData);
  // Check if industry is available
  if (!companyData.company.industry_type) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <Alert className="bg-red-50 text-red-800 border-red-200">
            <AlertDescription>Company not found or industry data unavailable.</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 h-full">
          <div className="lg:w-1/3 w-full animate-slide-in-left h-full">
            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white p-6 border-b">
                <CardTitle className="text-3xl font-bold flex items-center gap-4">
                  <Building2 className="h-8 w-8 text-orange-500" />
                  {companyData.company.official_name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 h-full">
                <div className="grid gap-6 h-full">
                  <div className="flex items-start gap-4 group">
                    <Briefcase className="h-6 w-6 text-gray-700 mt-1 group-hover:text-orange-500 transition-colors" />
                    <div className="transform group-hover:translate-x-2 transition-transform">
                      <h3 className="font-semibold text-xl text-gray-900 mb-2">Industry Type</h3>
                      <p className="text-gray-600">{companyData.company.industry_type}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <MapPin className="h-6 w-6 text-gray-700 mt-1 group-hover:text-orange-500 transition-colors" />
                    <div className="transform group-hover:translate-x-2 transition-transform">
                      <h3 className="font-semibold text-xl text-gray-900 mb-2">Headquarters</h3>
                      <p className="text-gray-600">{companyData.company.headquarters}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group flex-grow">
                    <Building2 className="h-6 w-6 text-gray-700 mt-1 group-hover:text-orange-500 transition-colors" />
                    <div className="transform group-hover:translate-x-2 transition-transform">
                      <h3 className="font-semibold text-xl text-gray-900 mb-2">Key Products & Services</h3>
                      <ul className="space-y-2 text-gray-600">
                        {companyData.company.key_products_services.map((service, index) => (
                          <li key={index} className="flex items-center gap-2 group/item">
                            <div className="w-2 h-2 bg-orange-500 rounded-full group-hover/item:scale-125 transition-transform"></div>
                            <span className="group-hover/item:translate-x-1 transition-transform">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={handleSWOTClick}
                    disabled={isLoading}
                    className="mt-0 w-full group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg px-4 py-3 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-3"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="font-semibold">Loading...</span>
                      </>
                    ) : showSWOT ? (
                      <>
                        <ArrowLeft className="w-6 h-6 transition-transform group-hover:scale-110 mr-2" />
                        <span className="font-semibold">Back to Competitors</span>
                      </>
                    ) : (
                      <>
                        <BarChart2 className="w-6 h-6 transition-transform group-hover:scale-110 mr-2" />
                        <span className="font-semibold">View SWOT Analysis</span>
                        <div className="ml-2 bg-white/20 rounded-full px-2 py-0.5 text-sm">
                          Get It Now
                        </div>
                      </>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {showSWOT && swotData ? (
            <div className="lg:w-2/3 w-full animate-slide-in-right">
            <div className="grid md:grid-cols-2 gap-6">
              {swotData.companies.map((section, index) => (
                <Card
                  key={index}
                  className={`transform hover:scale-105 transition-all duration-300 shadow-lg bg-gradient-to-br hover:shadow-xl`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-xl font-bold flex items-center gap-3">
                      {section["Official Name"]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-3">
                      {Object.entries(section).map(([key, value], itemIndex) => (
                        key !== "Official Name" && (
                          <li key={itemIndex} className="flex items-center gap-2 group">
                            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                            <span className="transform group-hover:translate-x-2 transition-transform">
                              <strong>{key}:</strong> {value}
                            </span>
                          </li>
                        )
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          ) : (
            <CompetitorCards competitors={companyData.competitors} />
          )}
        </div>
      </div>
    </div>
  );
}