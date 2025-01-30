import { QuotationForm, type QuotationFormData, type Quotation } from "@/components/QuotationForm";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

const EditQuotation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [quotation, setQuotation] = useState<Quotation | undefined>(undefined);

  useEffect(() => {
    const savedQuotations = localStorage.getItem('quotations');
    if (savedQuotations) {
      const quotations = JSON.parse(savedQuotations);
      const found = quotations.find((q: Quotation) => q.id === id);
      setQuotation(found);
    }
  }, [id]);

  const handleSubmit = (data: QuotationFormData) => {
    const savedQuotations = localStorage.getItem('quotations');
    if (savedQuotations) {
      const quotations = JSON.parse(savedQuotations);
      const updatedQuotations = quotations.map((q: Quotation) => 
        q.id === id ? { ...q, ...data } : q
      );
      localStorage.setItem('quotations', JSON.stringify(updatedQuotations));
    }

    toast({
      title: "Success",
      description: "Quotation updated successfully.",
    });
    navigate("/admin");
  };

  if (!quotation) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-semibold text-center">Edit Quotation</h1>
      <QuotationForm initialData={quotation} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditQuotation;