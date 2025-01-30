import { QuotationForm, type QuotationFormData } from "@/components/QuotationForm";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const CreateQuotation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (data: QuotationFormData) => {
    // Get existing quotations from localStorage
    const existingQuotations = JSON.parse(localStorage.getItem('quotations') || '[]');
    
    // Create a new quotation with all required fields
    const newQuotation = {
      ...data,
      id: crypto.randomUUID(), // Generate a unique ID
      createdAt: new Date().toISOString(),
      status: "draft" as const, // Set initial status to draft
    };
    
    // Add the new quotation to the array
    const updatedQuotations = [...existingQuotations, newQuotation];
    
    // Save back to localStorage
    localStorage.setItem('quotations', JSON.stringify(updatedQuotations));
    
    toast({
      title: "Success",
      description: "Quotation created successfully.",
    });
    navigate("/admin");
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-semibold text-center">Create New Quotation</h1>
      <QuotationForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateQuotation;