import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import type { Quotation } from "@/components/QuotationForm";

const ViewQuotation = () => {
  const { id } = useParams();
  const [quotation, setQuotation] = useState<Quotation | undefined>(undefined);

  useEffect(() => {
    const savedQuotations = localStorage.getItem('quotations');
    if (savedQuotations) {
      const quotations = JSON.parse(savedQuotations);
      const found = quotations.find((q: Quotation) => q.id === id);
      setQuotation(found);
    }
  }, [id]);

  if (!quotation) {
    return <div className="container mx-auto py-8">Quotation not found</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-6">Quotation #{id}</h1>
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">Client Details</h2>
            <p>Name: {quotation.clientName}</p>
            <p>Email: {quotation.clientEmail}</p>
          </div>
          <div>
            <h2 className="font-semibold">Items</h2>
            {quotation.items.map((item, index) => (
              <div key={index} className="border-b py-2">
                <p>{item.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
                <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-semibold">Notes</h2>
            <p>{quotation.notes}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ViewQuotation;