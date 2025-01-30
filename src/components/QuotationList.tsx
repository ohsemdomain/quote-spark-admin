import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Share2 } from "lucide-react";
import { type Quotation } from "./QuotationForm";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface QuotationListProps {
  quotations: Quotation[];
  onDelete: (id: string) => void;
}

export function QuotationList({ quotations, onDelete }: QuotationListProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const copyShareLink = (id: string) => {
    const link = `${window.location.origin}/quotation/${id}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied",
      description: "The quotation link has been copied to your clipboard.",
    });
  };

  const statusColors = {
    draft: "bg-gray-500",
    sent: "bg-blue-500",
    accepted: "bg-green-500",
    rejected: "bg-red-500",
  };

  const getStatusDisplay = (status: string | undefined) => {
    // If status is undefined or invalid, default to 'draft'
    const validStatus = status && Object.keys(statusColors).includes(status) ? status : 'draft';
    return validStatus.charAt(0).toUpperCase() + validStatus.slice(1);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotations.map((quotation) => (
            <TableRow key={quotation.id}>
              <TableCell>{new Date(quotation.date).toLocaleDateString()}</TableCell>
              <TableCell>{quotation.clientName}</TableCell>
              <TableCell>
                ${quotation.items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)}
              </TableCell>
              <TableCell>
                <Badge 
                  variant="secondary" 
                  className={statusColors[quotation.status || 'draft']}
                >
                  {getStatusDisplay(quotation.status)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/admin/edit/${quotation.id}`)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyShareLink(quotation.id)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(quotation.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}