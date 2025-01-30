import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface QuotationItem {
  id: string;
  description: string;
  price: number;
}

const QuotationSettings = () => {
  const [items, setItems] = useState<QuotationItem[]>([]);
  const [newItem, setNewItem] = useState({ description: "", price: 0 });
  const [editingItem, setEditingItem] = useState<QuotationItem | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedItems = localStorage.getItem('quotationItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  const saveItems = (updatedItems: QuotationItem[]) => {
    localStorage.setItem('quotationItems', JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    if (!newItem.description) {
      toast({
        title: "Error",
        description: "Description is required",
        variant: "destructive",
      });
      return;
    }
    
    const item = {
      id: crypto.randomUUID(),
      description: newItem.description,
      price: newItem.price,
    };
    
    saveItems([...items, item]);
    setNewItem({ description: "", price: 0 });
    
    toast({
      title: "Success",
      description: "Item added successfully",
    });
  };

  const handleEditItem = (item: QuotationItem) => {
    setEditingItem(item);
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;
    
    const updatedItems = items.map((item) =>
      item.id === editingItem.id ? editingItem : item
    );
    
    saveItems(updatedItems);
    setEditingItem(null);
    
    toast({
      title: "Success",
      description: "Item updated successfully",
    });
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    saveItems(updatedItems);
    
    toast({
      title: "Success",
      description: "Item deleted successfully",
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-semibold text-center">Quotation Settings</h1>
      
      <Card className="p-6 max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Add New Item</h2>
            <div className="grid grid-cols-[1fr,120px] gap-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Item description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                />
              </div>
            </div>
            <Button onClick={handleAddItem} className="w-full">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Item List</h2>
            {items.map((item) => (
              <Card key={item.id} className="p-4">
                {editingItem?.id === item.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-[1fr,120px] gap-4">
                      <Input
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      />
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={editingItem.price}
                        onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                      />
                    </div>
                    <Button onClick={handleUpdateItem} className="w-full">Save Changes</Button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.description}</p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuotationSettings;