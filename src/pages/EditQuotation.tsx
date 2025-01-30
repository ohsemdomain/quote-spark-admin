import { QuotationForm, type QuotationFormData } from "@/components/QuotationForm";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const EditQuotation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const handleSubmit = (data: QuotationFormData) => {
    // Here we would typically send the data to a backend
    console.log("Updating quotation:", id, data);
    toast({
      title: "Success",
      description: "Quotation updated successfully.",
    });
    navigate("/admin");
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-semibold text-center">Edit Quotation</h1>
      <QuotationForm onSubmit={handleSubmit} />
    </div>
  );
};

export default EditQuotation;