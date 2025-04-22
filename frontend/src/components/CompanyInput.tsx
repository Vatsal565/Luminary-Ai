'use client';
import { useState } from "react";
import { Building2, MapPin, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MultiStepLoader } from "./MultiStepLoader";
import CompanyInfoDisplay from "./Analysis";

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

const encodeURL = (str: string): string => {
  return encodeURI(str).replace(/'/g, '%27').replace(/,/g, '%2C');
};

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: ""
  });
  const [errors, setErrors] = useState<{ companyName?: string; companyAddress?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);

  const loadingStates = [
    { text: "Validating company information..." },
    { text: "Processing company details..." },
    { text: "Finalizing registration..." }
  ];

  const validateForm = (): boolean => {
    const newErrors: { companyName?: string; companyAddress?: string } = {};
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!formData.companyAddress.trim()) {
      newErrors.companyAddress = "Company address is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const encodedCompanyName = encodeURL(formData.companyName);
      const encodedCompanyAddress = encodeURL(formData.companyAddress);

      const response = await fetch(
        `https://luminary-ai-backend.onrender.com/company?company=${encodedCompanyName}&location=${encodedCompanyAddress}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: CompanyData = await response.json();
      setCompanyData(data);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <>
      {submitSuccess && companyData ? (
        <div className="min-h-screen flex flex-col">
          <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto">
              <h1 className="text-xl font-bold text-gray-800">Company Dashboard</h1>
            </div>
          </nav>
          <div className="flex-1 flex items-center justify-center p-4">
            <CompanyInfoDisplay companyData={companyData} />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl mx-auto p-4 pt-28">
          <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 p-6">
              <CardTitle className="text-2xl font-bold text-gray-800">Company Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
                      <div className="bg-orange-500 p-2 rounded-full">
                        <Building2 className="h-4 w-4 text-white" />
                      </div>
                      <span>Company Name</span>
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      type="text"
                      placeholder="Enter company name"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${
                        errors.companyName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyAddress" className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
                      <div className="bg-black p-2 rounded-full">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <span>Company Address</span>
                    </Label>
                    <Input
                      id="companyAddress"
                      name="companyAddress"
                      type="text"
                      placeholder="Enter company address"
                      value={formData.companyAddress}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 ${
                        errors.companyAddress ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.companyAddress && <p className="text-red-500 text-sm mt-1">{errors.companyAddress}</p>}
                  </div>
                </div>

                {submitSuccess && (
                  <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
                    <AlertDescription>Company details successfully submitted!</AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-end mt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      <MultiStepLoader loadingStates={loadingStates} loading={isSubmitting} duration={2000} loop={true} />
    </>
  );
};

export default CompanyForm;