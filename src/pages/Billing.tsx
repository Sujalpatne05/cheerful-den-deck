import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Download, FileText, Plus } from "lucide-react";

const invoices = [
  { id: "INV-001", guest: "Sarah Johnson", amount: "$1,750", date: "Jul 25, 2024", status: "Paid" },
  { id: "INV-002", guest: "Mike Chen", amount: "$360", date: "Jul 23, 2024", status: "Paid" },
  { id: "INV-003", guest: "Emily Davis", amount: "$2,100", date: "Jul 28, 2024", status: "Pending" },
  { id: "INV-004", guest: "James Wilson", amount: "$240", date: "Jul 22, 2024", status: "Paid" },
  { id: "INV-005", guest: "Anna Martinez", amount: "$540", date: "Jul 26, 2024", status: "Overdue" },
  { id: "INV-006", guest: "Robert Brown", amount: "$720", date: "Jul 27, 2024", status: "Pending" },
];

const statusColors: Record<string, string> = {
  Paid: "bg-success/10 text-success border-success/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  Overdue: "bg-destructive/10 text-destructive border-destructive/20",
};

const Billing = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Billing</h1>
        <p className="text-sm text-muted-foreground">Invoices and payment tracking</p>
      </div>
      <Button className="gap-2"><Plus className="h-4 w-4" /> Create Invoice</Button>
    </div>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {[
        { label: "Total Revenue", value: "$48,290", sub: "This month" },
        { label: "Pending", value: "$2,820", sub: "3 invoices" },
        { label: "Overdue", value: "$540", sub: "1 invoice" },
      ].map((s) => (
        <Card key={s.label} className="border-none shadow-sm">
          <CardContent className="p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label} · {s.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    <Card className="border-none shadow-sm">
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="px-5 py-3 font-medium">Invoice</th>
              <th className="px-5 py-3 font-medium">Guest</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3 font-medium text-primary">{inv.id}</td>
                <td className="px-5 py-3 text-foreground">{inv.guest}</td>
                <td className="px-5 py-3 font-medium text-foreground">{inv.amount}</td>
                <td className="px-5 py-3 text-muted-foreground">{inv.date}</td>
                <td className="px-5 py-3"><Badge variant="outline" className={statusColors[inv.status]}>{inv.status}</Badge></td>
                <td className="px-5 py-3"><Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  </div>
);

export default Billing;
