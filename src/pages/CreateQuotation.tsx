import { QuotationForm, type QuotationFormData } from "@/components/QuotationForm";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const CreateQuotation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (data: QuotationFormData) => {
    // Here we would typically send the data to a backend
    console.log("Creating quotation:", data);
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