import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";

const ViewQuotation = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-6">Quotation #{id}</h1>
        <p className="text-center text-muted-foreground">
          This is a placeholder for the public quotation view. In a real application,
          this would show the quotation details in a presentable format.
        </p>
      </Card>
    </div>
  );
};

export default ViewQuotation;