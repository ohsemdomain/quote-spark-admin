import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { PlusCircle, MinusCircle } from "lucide-react";

interface QuotationFormProps {
  initialData?: Quotation;
  onSubmit: (data: QuotationFormData) => void;
}

export interface QuotationFormData {
  clientName: string;
  clientEmail: string;
  date: string;
  dueDate: string;
  items: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
  notes: string;
}

export interface Quotation extends QuotationFormData {
  id: string;
  createdAt: string;
  status: "draft" | "sent" | "accepted" | "rejected";
}

const emptyItem = { description: "", quantity: 1, price: 0 };

export function QuotationForm({ initialData, onSubmit }: QuotationFormProps) {
  const [formData, setFormData] = useState<QuotationFormData>({
    clientName: initialData?.clientName || "",
    clientEmail: initialData?.clientEmail || "",
    date: initialData?.date || new Date().toISOString().split("T")[0],
    dueDate: initialData?.dueDate || "",
    items: initialData?.items || [{ ...emptyItem }],
    notes: initialData?.notes || "",
  });

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { ...emptyItem }],
    });
  };

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index: number, field: keyof typeof emptyItem, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6">
      <Card className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientEmail">Client Email</Label>
            <Input
              id="clientEmail"
              type="email"
              value={formData.clientEmail}
              onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Items</Label>
            <Button type="button" variant="outline" size="sm" onClick={addItem}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
          
          {formData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr,100px,120px,40px] gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Input
                  id={`description-${index}`}
                  value={item.description}
                  onChange={(e) => updateItem(index, "description", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                <Input
                  id={`quantity-${index}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`price-${index}`}>Price</Label>
                <Input
                  id={`price-${index}`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => updateItem(index, "price", parseFloat(e.target.value))}
                  required
                />
              </div>
              {formData.items.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index)}
                  className="mb-2"
                >
                  <MinusCircle className="w-4 h-4 text-destructive" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg">
          {initialData ? "Update Quotation" : "Create Quotation"}
        </Button>
      </div>
    </form>
  );
}