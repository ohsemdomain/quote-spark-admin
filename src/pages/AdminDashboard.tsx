import { Button } from "@/components/ui/button";
import { QuotationList } from "@/components/QuotationList";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import type { Quotation } from "@/components/QuotationForm";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState<Quotation[]>([]);

  const handleDelete = (id: string) => {
    setQuotations(quotations.filter((q) => q.id !== id));
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Quotations</h1>
        <Button onClick={() => navigate("/admin/create")}>
          <PlusCircle className="w-4 h-4 mr-2" />
          New Quotation
        </Button>
      </div>
      
      <QuotationList quotations={quotations} onDelete={handleDelete} />
    </div>
  );
};

export default AdminDashboard;