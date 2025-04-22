'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Sector {
  name: string;
  icon: string;
}

interface FormData {
  companyName: string;
  companyDescription: string;
  companySector: string;
  location: string;
}

interface SeoResponse {
  company_name: string;
  seo_keywords: string[];
}

interface CompanyName {
  name: string;
  rationale: string;
}

interface TaglineResponse {
  response: {
    company_names: CompanyName[];
  };
}

interface Results {
  companyName: string;
  keywords: string[];
  taglines: CompanyName[];
}

const sectors: Sector[] = [
  { name: 'Healthcare', icon: '💉' },
  { name: 'Finance', icon: '💰' },
  { name: 'Technology', icon: '💻' },
  { name: 'Retail', icon: '🛍️' },
  { name: 'Education', icon: '📚' },
  { name: 'Real Estate', icon: '🏠' },
  { name: 'Entertainment', icon: '🎬' },
  { name: 'Hospitality', icon: '🏨' },
];

const API_BASE_URL = 'https://luminary-ai-backend.onrender.com';

const SeoGenerator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    companyDescription: '',
    companySector: '',
    location: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<Results | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSectorClick = (sectorName: string): void => {
    setFormData(prev => ({ ...prev, companySector: sectorName }));
  };

  const fetchSeoKeywords = async (): Promise<SeoResponse> => {
    const params = new URLSearchParams({
      company_description: formData.companyDescription,
      location: formData.location
    });
    
    const response = await fetch(`${API_BASE_URL}/seo?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch SEO keywords');
    }

    const data = await response.json();
    if (!data || !data.seo_keywords) {
      throw new Error('Invalid SEO response format');
    }
    return data;
  };

  const fetchTaglines = async (): Promise<CompanyName[]> => {
    const payload = {
      company_description: formData.companyDescription,
      company_sector: formData.companySector
    };

    const response = await fetch(`${API_BASE_URL}/tagline-generator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch taglines');
    }

    const data: TaglineResponse = await response.json();
    return data.response.company_names || [];
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const [seoResponse, taglines] = await Promise.all([
        fetchSeoKeywords(),
        fetchTaglines()
      ]);

      setResults({
        companyName: seoResponse.company_name || formData.companyName,
        keywords: seoResponse.seo_keywords || [],
        taglines: taglines || []
      });
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderResults = () => {
    if (!results) return null;
  
    return (
      <div className="space-y-6">
        {results.keywords && results.keywords.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-2">SEO Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {results.keywords.map((keyword, idx) => (
                <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {results.taglines && results.taglines.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-3">Suggested Taglines</h3>
            <div className="grid gap-3">
              {results.taglines.map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-orange-100 hover:border-orange-300 transition-colors">
                  <p className="text-gray-600 text-sm">{item.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl pt-24">
      <Card className="bg-white shadow-xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            SEO & Company Name Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Input Section */}
              <div className="space-y-4">
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                
                <textarea
                  name="companyDescription"
                  value={formData.companyDescription}
                  onChange={handleInputChange}
                  placeholder="Describe your company..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={3}
                  required
                />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Location (e.g., Surat)"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />

                <div className="grid grid-cols-2 gap-2">
                  {sectors.map((sector) => (
                    <button
                      key={sector.name}
                      type="button"
                      onClick={() => handleSectorClick(sector.name)}
                      className={`p-2 rounded-lg text-sm transition-all ${
                        formData.companySector === sector.name
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-xl block mb-1">{sector.icon}</span>
                      {sector.name}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.companyDescription || !formData.companySector || !formData.location}
                  className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Generating...
                    </span>
                  ) : (
                    'Generate Content'
                  )}
                </button>
              </div>

              {/* Results Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                {!error && !loading && results && renderResults()}

                {!error && !loading && !results && (
                  <div className="text-center text-gray-500 py-8">
                    Enter your company details to generate SEO keywords and company names
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeoGenerator;