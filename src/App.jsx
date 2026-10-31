import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard, Users, Package, Repeat2, ReceiptText, CreditCard,
  BadgePercent, ChartNoAxesCombined, Settings, Search, Plus, Bell,
  ChevronDown, ArrowUpRight, ArrowDownRight, MoreHorizontal, CalendarDays,
  CircleCheck, Clock3, AlertCircle, X, Menu, Download, Eye, Pause, Play,
  RefreshCw, FileText, Trash2, WalletCards, TrendingUp, ShieldCheck
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell
} from "recharts";

const initialCustomers = [
  { id: "CUS-1001", name: "Northstar Studio", email: "finance@northstar.example", company: "Northstar Studio", joined: "2026-08-12", status: "Active" },
  { id: "CUS-1002", name: "Maya Patel", email: "maya.patel@example.com", company: "Patel Creative", joined: "2026-09-03", status: "Active" },
  { id: "CUS-1003", name: "Greenfield Labs", email: "accounts@greenfield.example", company: "Greenfield Labs", joined: "2026-09-18", status: "Active" },
  { id: "CUS-1004", name: "Summit Retail", email: "billing@summit.example", company: "Summit Retail", joined: "2026-10-02", status: "Active" },
  { id: "CUS-1005", name: "Orbit Works", email: "hello@orbit.example", company: "Orbit Works", joined: "2026-10-09", status: "Inactive" }
];
const initialProducts = [
  { id: "PRD-101", name: "Brightloop Workspace", type: "Software", price: 1499, cost: 450, variant: "Standard", notes: "Team collaboration workspace" },
  { id: "PRD-102", name: "Analytics Pro", type: "Add-on", price: 899, cost: 250, variant: "Pro", notes: "Advanced reporting tools" },
  { id: "PRD-103", name: "Cloud Storage", type: "Software", price: 499, cost: 120, variant: "100 GB", notes: "Secure cloud storage" }
];
const initialPlans = [
  { id: "PLN-101", name: "Starter Monthly", product: "Brightloop Workspace", cycle: "Monthly", price: 1499, minQty: 1, status: "Active" },
  { id: "PLN-102", name: "Growth Yearly", product: "Brightloop Workspace", cycle: "Yearly", price: 14990, minQty: 5, status: "Active" },
  { id: "PLN-103", name: "Analytics Monthly", product: "Analytics Pro", cycle: "Monthly", price: 899, minQty: 1, status: "Active" },
  { id: "PLN-104", name: "Storage Weekly", product: "Cloud Storage", cycle: "Weekly", price: 499, minQty: 1, status: "Active" }
];
const initialSubs = [
  { id: "SUB-2001", customerId: "CUS-1001", customer: "Northstar Studio", planId: "PLN-102", plan: "Growth Yearly", start: "2026-08-12", end: "2027-08-11", qty: 10, status: "Active", amount: 149900 },
  { id: "SUB-2002", customerId: "CUS-1002", customer: "Maya Patel", planId: "PLN-101", plan: "Starter Monthly", start: "2026-10-03", end: "2026-11-02", qty: 1, status: "Active", amount: 1499 },
  { id: "SUB-2003", customerId: "CUS-1003", customer: "Greenfield Labs", planId: "PLN-103", plan: "Analytics Monthly", start: "2026-10-18", end: "2026-11-17", qty: 4, status: "Active", amount: 3596 },
  { id: "SUB-2004", customerId: "CUS-1004", customer: "Summit Retail", planId: "PLN-101", plan: "Starter Monthly", start: "2026-10-02", end: "2026-11-01", qty: 3, status: "Paused", amount: 4497 },
  { id: "SUB-2005", customerId: "CUS-1005", customer: "Orbit Works", planId: "PLN-104", plan: "Storage Weekly", start: "2026-10-09", end: "2026-10-30", qty: 2, status: "Closed", amount: 998 }
];
const initialInvoices = [
  { id: "INV-3001", customerId: "CUS-1001", customer: "Northstar Studio", subId: "SUB-2001", issue: "2026-10-01", due: "2026-10-08", subtotal: 149900, tax: 26982, discount: 0, total: 176882, status: "Paid" },
  { id: "INV-3002", customerId: "CUS-1002", customer: "Maya Patel", subId: "SUB-2002", issue: "2026-10-03", due: "2026-10-10", subtotal: 1499, tax: 269.82, discount: 0, total: 1769, status: "Paid" },
  { id: "INV-3003", customerId: "CUS-1003", customer: "Greenfield Labs", subId: "SUB-2003", issue: "2026-10-18", due: "2026-10-25", subtotal: 3596, tax: 647.28, discount: 200, total: 4043, status: "Overdue" },
  { id: "INV-3004", customerId: "CUS-1004", customer: "Summit Retail", subId: "SUB-2004", issue: "2026-10-20", due: "2026-10-27", subtotal: 4497, tax: 809.46, discount: 0, total: 5306, status: "Sent" }
];
const initialPayments = [
  { id: "PAY-4001", invoiceId: "INV-3001", customer: "Northstar Studio", method: "Bank transfer", amount: 176882, date: "2026-10-04", note: "Monthly settlement" },
  { id: "PAY-4002", invoiceId: "INV-3002", customer: "Maya Patel", method: "Card", amount: 1769, date: "2026-10-05", note: "Online payment" }
];
const initialDiscounts = [
  { id: "DSC-501", name: "Growth launch offer", type: "Percentage", value: 10, minQty: 5, start: "2026-10-01", end: "2026-12-31", limit: 100, used: 12, status: "Active" },
  { id: "DSC-502", name: "Welcome credit", type: "Fixed", value: 200, minQty: 1, start: "2026-09-01", end: "2026-11-30", limit: 50, used: 23, status: "Active" }
];
const revenueData = [
  { month: "May", revenue: 84000 }, { month: "Jun", revenue: 92000 },
  { month: "Jul", revenue: 88000 }, { month: "Aug", revenue: 113000 },
  { month: "Sep", revenue: 126000 }, { month: "Oct", revenue: 142500 }
];
const nav = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Customers", icon: Users },
  { label: "Products & Plans", icon: Package },
  { label: "Subscriptions", icon: Repeat2 },
  { label: "Invoices", icon: ReceiptText },
  { label: "Payments", icon: CreditCard },
  { label: "Discounts", icon: BadgePercent },
  { label: "Reports", icon: ChartNoAxesCombined }
];
const seed = {
  customers: initialCustomers, products: initialProducts, plans: initialPlans,
  subscriptions: initialSubs, invoices: initialInvoices, payments: initialPayments,
  discounts: initialDiscounts
};
const money = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value || 0));
const dateLabel = (value) => value ? new Date(value + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const nextId = (prefix, items) => `${prefix}-${String(Math.max(0, ...items.map(x => Number(String(x.id).split("-").at(-1)) || 0)) + 1).padStart(4, "0")}`;
function loadState() {
  try {
    const saved = localStorage.getItem("brightloop-demo-v1");
    return saved ? { ...seed, ...JSON.parse(saved) } : seed;
  } catch { return seed; }
}
function loadSettings() {
  const defaults = { tax: 18, company: "Brightloop Software", currency: "INR" };
  try {
    const saved = localStorage.getItem("brightloop-settings-v1");
    return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
  } catch { return defaults; }
}
function Status({ value }) {
  const key = String(value || "").toLowerCase();
  const icon = key === "paid" || key === "active" || key === "confirmed" ? <CircleCheck size={13}/> : key === "overdue" || key === "closed" || key === "inactive" ? <AlertCircle size={13}/> : <Clock3 size={13}/>;
  return <span className={`status status-${key.replaceAll(" ", "-")}`}>{icon}{value}</span>;
}
function Button({ children, onClick, variant = "primary", size = "", disabled = false }) {
  return <button type={variant === "primary" ? "submit" : "button"} className={`btn ${variant} ${size}`} onClick={onClick} disabled={disabled}>{children}</button>;
}
function Field({ label, children }) { return <label className="field"><span>{label}</span>{children}</label>; }
function Modal({ title, onClose, children, onSubmit, submitLabel = "Save changes" }) {
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <form className="modal" onSubmit={onSubmit}>
      <div className="modal-head"><div><h2>{title}</h2><p>Enter the details below.</p></div><button type="button" className="icon-btn" onClick={onClose}><X size={19}/></button></div>
      <div className="modal-body">{children}</div>
      <div className="modal-foot"><Button variant="ghost" onClick={onClose}>Cancel</Button><Button>{submitLabel}</Button></div>
    </form>
  </div>;
}
function Empty({ text }) { return <div className="empty"><Package size={28}/><strong>No records found</strong><span>{text}</span></div>; }
function Table({ columns, rows, emptyText = "Try changing your search or add a new record." }) {
  if (!rows.length) return <Empty text={emptyText}/>;
  return <div className="table-scroll"><table><thead><tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={r.id || i}>{columns.map(c => <td key={c.key}>{c.render ? c.render(r) : r[c.key] ?? "—"}</td>)}</tr>)}</tbody></table></div>;
}
function App() {
  const [data, setData] = useState(loadState);
  const [page, setPage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [detail, setDetail] = useState(null);
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => { localStorage.setItem("brightloop-demo-v1", JSON.stringify(data)); }, [data]);
  useEffect(() => { localStorage.setItem("brightloop-settings-v1", JSON.stringify(settings)); }, [settings]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const notify = (message) => setToast(message);
  const update = (key, value) => setData(prev => ({ ...prev, [key]: value }));
  const allSubs = data.subscriptions;
  const activeSubs = allSubs.filter(s => s.status === "Active");
  const paidInvoices = data.invoices.filter(i => i.status === "Paid");
  const paidRevenue = data.payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const outstanding = data.invoices.filter(i => i.status !== "Paid" && i.status !== "Cancelled").reduce((sum, i) => sum + Number(i.total), 0);
  const overdue = data.invoices.filter(i => i.status === "Overdue").length;
  const recurring = activeSubs.reduce((sum, s) => {
    const plan = data.plans.find(p => p.id === s.planId);
    const cycle = (plan?.cycle || "Monthly").toLowerCase();
    const monthly = cycle === "yearly" ? s.amount / 12 : cycle === "weekly" ? s.amount * 4.33 : cycle === "daily" ? s.amount * 30 : s.amount;
    return sum + monthly;
  }, 0);
  const pageTitle = page === "Overview" ? "Overview" : page;
  const pageDescription = {
    Overview: "Here’s what’s happening with your subscriptions today.",
    Customers: "Manage your customer accounts and billing contacts.",
    "Products & Plans": "Configure products, variants, pricing and billing plans.",
    Subscriptions: "Track subscription lifecycle, renewals and customer plans.",
    Invoices: "Create invoices, track due dates and manage collection.",
    Payments: "Review recorded payments and their associated invoices.",
    Discounts: "Manage promotional rules and discount eligibility.",
    Reports: "Understand recurring revenue, collections and subscription health."
  }[page] || "Manage your Brightloop workspace.";
  const filtered = (items, searchable, statusField = "status") => items.filter(item => {
    const query = search.toLowerCase();
    const matches = !query || searchable(item).some(v => String(v ?? "").toLowerCase().includes(query));
    return matches && (filter === "All" || item[statusField] === filter);
  });
  const resetFilters = () => { setSearch(""); setFilter("All"); };
  const openAdd = (type) => setModal({ type });
  const deleteRecord = (key, id) => {
    if (!window.confirm("Delete this record? This demo does not support undo.")) return;
    update(key, data[key].filter(x => x.id !== id));
    notify("Record deleted");
  };

  function submitForm(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const v = Object.fromEntries(form.entries());
    const type = modal.type;
    if (type === "customer") {
      if (!v.name?.trim() || !v.email?.trim()) return notify("Name and email are required");
      if (data.customers.some(c => c.email.toLowerCase() === v.email.toLowerCase())) return notify("That email is already registered");
      update("customers", [{ id: nextId("CUS", data.customers), name: v.name.trim(), company: v.company || v.name.trim(), email: v.email.trim(), joined: new Date().toISOString().slice(0,10), status: "Active" }, ...data.customers]);
    } else if (type === "product") {
      if (!v.name?.trim() || Number(v.price) < 0 || Number(v.cost) < 0) return notify("Enter a product name and valid prices");
      update("products", [{ id: nextId("PRD", data.products), name: v.name.trim(), type: v.productType, price: Number(v.price), cost: Number(v.cost), variant: v.variant || "Standard", notes: v.notes || "" }, ...data.products]);
    } else if (type === "plan") {
      if (!v.name?.trim() || !v.productId) return notify("Plan name and product are required");
      const product = data.products.find(p => p.id === v.productId);
      update("plans", [{ id: nextId("PLN", data.plans), name: v.name.trim(), product: product.name, productId: product.id, cycle: v.cycle, price: Number(v.price), minQty: Number(v.minQty || 1), status: "Active" }, ...data.plans]);
    } else if (type === "subscription") {
      const customer = data.customers.find(c => c.id === v.customerId);
      const plan = data.plans.find(p => p.id === v.planId);
      if (!customer || !plan) return notify("Select a valid customer and plan");
      const qty = Math.max(Number(v.qty || 1), plan.minQty || 1);
      const start = v.start || new Date().toISOString().slice(0,10);
      const end = v.end || "";
      update("subscriptions", [{ id: nextId("SUB", data.subscriptions), customerId: customer.id, customer: customer.name, planId: plan.id, plan: plan.name, start, end, qty, status: "Active", amount: plan.price * qty }, ...data.subscriptions]);
    } else if (type === "invoice") {
      const sub = data.subscriptions.find(s => s.id === v.subId);
      if (!sub) return notify("Select a valid subscription");
      if (data.invoices.some(i => i.subId === sub.id && i.issue === (v.issue || new Date().toISOString().slice(0,10)) && i.status !== "Cancelled")) return notify("An invoice already exists for this subscription and issue date");
      const subtotal = Number(sub.amount);
      const discount = Math.max(0, Number(v.discount || 0));
      const tax = Math.max(0, (subtotal - discount) * Number(settings.tax) / 100);
      const total = Math.round(subtotal - discount + tax);
      const issue = v.issue || new Date().toISOString().slice(0,10);
      const invoice = { id: nextId("INV", data.invoices), customerId: sub.customerId, customer: sub.customer, subId: sub.id, issue, due: v.due || issue, subtotal, tax, discount, total, status: "Sent" };
      update("invoices", [invoice, ...data.invoices]);
    } else if (type === "payment") {
      const invoice = data.invoices.find(i => i.id === v.invoiceId);
      const amount = Number(v.amount);
      if (!invoice || amount <= 0) return notify("Select an invoice and enter a positive amount");
      if (invoice.status === "Paid") return notify("This invoice is already marked paid");
      if (amount < invoice.total) return notify("For this demo, record the full outstanding invoice amount");
      update("payments", [{ id: nextId("PAY", data.payments), invoiceId: invoice.id, customer: invoice.customer, method: v.method, amount: invoice.total, date: v.date || new Date().toISOString().slice(0,10), note: v.note || "" }, ...data.payments]);
      update("invoices", data.invoices.map(i => i.id === invoice.id ? { ...i, status: "Paid" } : i));
    } else if (type === "discount") {
      if (!v.name?.trim() || Number(v.value) <= 0) return notify("Enter a name and positive discount value");
      update("discounts", [{ id: nextId("DSC", data.discounts), name: v.name.trim(), type: v.discountType, value: Number(v.value), minQty: Number(v.minQty || 1), start: v.start, end: v.end, limit: Number(v.limit || 1), used: 0, status: "Active" }, ...data.discounts]);
    }
    setModal(null);
    notify("Saved successfully");
  }

  const toggleSub = (sub, status) => {
    update("subscriptions", data.subscriptions.map(s => s.id === sub.id ? { ...s, status } : s));
    notify(`${sub.id} marked ${status.toLowerCase()}`);
  };
  const makeInvoice = (sub) => {
    const issue = new Date().toISOString().slice(0,10);
    if (data.invoices.some(i => i.subId === sub.id && i.issue === issue && i.status !== "Cancelled")) return notify("Invoice already exists for this subscription today");
    const subtotal = sub.amount;
    const tax = Math.round(subtotal * Number(settings.tax) / 100);
    const invoice = { id: nextId("INV", data.invoices), customerId: sub.customerId, customer: sub.customer, subId: sub.id, issue, due: issue, subtotal, tax, discount: 0, total: subtotal + tax, status: "Sent" };
    update("invoices", [invoice, ...data.invoices]);
    notify(`Created invoice ${invoice.id}`);
  };
  const exportCsv = (rows, filename) => {
    if (!rows.length) return notify("There are no rows to export");
    const keys = Object.keys(rows[0]);
    const csv = [keys.join(","), ...rows.map(row => keys.map(k => `"${String(row[k] ?? "").replaceAll('"','""')}"`).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
    notify("CSV export downloaded");
  };
  const exportReportSummary = () => {
    const rows = [
      { report: "Summary", metric: "Recorded collections", count: "", value: paidRevenue },
      { report: "Summary", metric: "Invoice value", count: data.invoices.length, value: data.invoices.reduce((sum, invoice) => sum + Number(invoice.total), 0) },
      { report: "Summary", metric: "Overdue invoices", count: overdue, value: data.invoices.filter(invoice => invoice.status === "Overdue").reduce((sum, invoice) => sum + Number(invoice.total), 0) },
      { report: "Summary", metric: "Total customers", count: data.customers.length, value: "" },
      ...["Paid", "Sent", "Overdue", "Cancelled"].map(status => ({ report: "Invoice status", metric: status, count: data.invoices.filter(invoice => invoice.status === status).length, value: data.invoices.filter(invoice => invoice.status === status).reduce((sum, invoice) => sum + Number(invoice.total), 0) })),
      ...revenueData.map(({ month, revenue }) => ({ report: "Illustrative revenue trend", metric: month, count: "", value: revenue }))
    ];
    exportCsv(rows, "brightloop-report-summary.csv");
  };

  const renderDashboard = () => (
    <>
      <div className="welcome-strip"><div><div className="eyebrow">SATURDAY, OCTOBER 31, 2026 · DEMO WORKSPACE</div><h2>Good afternoon 👋</h2><p>Here’s your subscription business at a glance.</p></div><Button onClick={() => openAdd("invoice")}><Plus size={16}/> Create invoice</Button></div>
      <div className="stats-grid">
        <Stat icon={Repeat2} label="Active subscriptions" value={activeSubs.length.toLocaleString("en-IN")} delta={`${allSubs.length} total subscriptions`} color="purple"/>
        <Stat icon={TrendingUp} label="Monthly recurring revenue" value={money(recurring)} delta="Estimated from active plans" color="green"/>
        <Stat icon={WalletCards} label="Payments collected" value={money(paidRevenue)} delta={`${data.payments.length} recorded payments`} color="blue"/>
        <Stat icon={Clock3} label="Outstanding invoices" value={money(outstanding)} delta={`${overdue} overdue invoice(s)`} color="orange"/>
      </div>
      <div className="dashboard-grid">
        <section className="panel revenue-panel"><div className="panel-head"><div><h3>Revenue overview</h3><p>Illustrative monthly revenue trend</p></div><span className="select-like">Last 6 months <ChevronDown size={14}/></span></div><div className="chart-area"><ResponsiveContainer width="100%" height="100%"><AreaChart data={revenueData} margin={{top:10,right:8,left:0,bottom:0}}><defs><linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7667f7" stopOpacity={0.22}/><stop offset="100%" stopColor="#7667f7" stopOpacity={0.01}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0f5"/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:"#9299a8",fontSize:12}}/><YAxis axisLine={false} tickLine={false} tick={{fill:"#9299a8",fontSize:11}} tickFormatter={v=>`${Math.round(v/1000)}k`} width={36}/><Tooltip formatter={v=>money(v)} contentStyle={{borderRadius:12,border:"1px solid #edf0f5",fontSize:12}}/><Area type="monotone" dataKey="revenue" stroke="#7566f5" strokeWidth={3} fill="url(#revFill)" activeDot={{r:5}}/></AreaChart></ResponsiveContainer></div></section>
        <section className="panel"><div className="panel-head"><div><h3>Subscription health</h3><p>Current lifecycle breakdown</p></div></div><div className="health-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{name:"Active",value:allSubs.filter(s=>s.status==="Active").length},{name:"Paused",value:allSubs.filter(s=>s.status==="Paused").length},{name:"Closed",value:allSubs.filter(s=>s.status==="Closed").length}]} dataKey="value" nameKey="name" innerRadius={52} outerRadius={75} paddingAngle={4}><Cell fill="#7465f5"/><Cell fill="#f5a623"/><Cell fill="#d7dce5"/></Pie><Tooltip/></PieChart></ResponsiveContainer><div className="donut-center"><strong>{allSubs.length}</strong><span>Subscriptions</span></div></div><div className="legend"><span><i style={{background:"#7465f5"}}/>Active <b>{activeSubs.length}</b></span><span><i style={{background:"#f5a623"}}/>Paused <b>{allSubs.filter(s=>s.status==="Paused").length}</b></span><span><i style={{background:"#d7dce5"}}/>Closed <b>{allSubs.filter(s=>s.status==="Closed").length}</b></span></div></section>
      </div>
      <section className="panel"><div className="panel-head"><div><h3>Recent invoices</h3><p>Latest billing activity</p></div><Button variant="outline" onClick={() => setPage("Invoices")}>View all <ArrowUpRight size={15}/></Button></div><Table columns={[
        {key:"id",label:"INVOICE"}, {key:"customer",label:"CUSTOMER"}, {key:"issue",label:"ISSUE DATE",render:r=>dateLabel(r.issue)},
        {key:"total",label:"AMOUNT",render:r=><strong>{money(r.total)}</strong>}, {key:"status",label:"STATUS",render:r=><Status value={r.status}/>}
      ]} rows={data.invoices.slice(0,4)}/></section>
    </>
  );

  const renderCustomers = () => <section className="panel"><div className="panel-head"><div><h3>All customers <span className="count">{data.customers.length}</span></h3><p>Customer records and billing contacts</p></div><div className="head-actions"><Button variant="outline" onClick={() => exportCsv(data.customers,"brightloop-customers.csv")}><Download size={15}/> Export</Button><Button onClick={() => openAdd("customer")}><Plus size={16}/> Add customer</Button></div></div><Table columns={[
    {key:"name",label:"CUSTOMER",render:r=><div className="person-cell"><Avatar name={r.name}/><div><strong>{r.name}</strong><small>{r.company}</small></div></div>},
    {key:"email",label:"EMAIL"}, {key:"joined",label:"JOINED",render:r=>dateLabel(r.joined)}, {key:"status",label:"STATUS",render:r=><Status value={r.status}/>},
    {key:"actions",label:"ACTIONS",render:r=><div className="row-actions"><button className="icon-btn" title="View customer" onClick={()=>setDetail({type:"Customer",item:r})}><Eye size={16}/></button><button className="icon-btn danger-icon" title="Delete customer" onClick={()=>deleteRecord("customers",r.id)}><Trash2 size={16}/></button></div>}
  ]} rows={filtered(data.customers,r=>[r.id,r.name,r.email,r.company,r.status])}/></section>;

  const renderProductsPlans = () => <div className="stacked-panels"><section className="panel"><div className="panel-head"><div><h3>Products <span className="count">{data.products.length}</span></h3><p>Product catalogue and variants</p></div><Button onClick={()=>openAdd("product")}><Plus size={16}/> Add product</Button></div><Table columns={[
    {key:"name",label:"PRODUCT",render:r=><div className="product-cell"><div className="product-icon"><Package size={18}/></div><div><strong>{r.name}</strong><small>{r.id} · {r.variant}</small></div></div>},
    {key:"type",label:"TYPE"}, {key:"price",label:"SALES PRICE",render:r=><strong>{money(r.price)}</strong>}, {key:"cost",label:"COST PRICE",render:r=>money(r.cost)},
    {key:"notes",label:"NOTES"}, {key:"actions",label:"ACTIONS",render:r=><button className="icon-btn danger-icon" onClick={()=>deleteRecord("products",r.id)}><Trash2 size={16}/></button>}
  ]} rows={filtered(data.products,r=>[r.id,r.name,r.type,r.variant,r.notes])}/></section><section className="panel"><div className="panel-head"><div><h3>Subscription plans <span className="count">{data.plans.length}</span></h3><p>Pricing and billing frequency</p></div><Button onClick={()=>openAdd("plan")}><Plus size={16}/> Add plan</Button></div><Table columns={[
    {key:"name",label:"PLAN",render:r=><div><strong>{r.name}</strong><small className="subline">{r.id}</small></div>}, {key:"product",label:"PRODUCT"}, {key:"cycle",label:"BILLING CYCLE"},
    {key:"price",label:"PRICE",render:r=><strong>{money(r.price)}</strong>}, {key:"minQty",label:"MIN. QTY"}, {key:"status",label:"STATUS",render:r=><Status value={r.status}/>}
  ]} rows={filtered(data.plans,r=>[r.id,r.name,r.product,r.cycle,r.status])}/></section></div>;

  const renderSubscriptions = () => <section className="panel"><div className="panel-head"><div><h3>Subscriptions <span className="count">{data.subscriptions.length}</span></h3><p>Monitor plans, terms and lifecycle status</p></div><div className="head-actions"><Button variant="outline" onClick={()=>exportCsv(data.subscriptions,"brightloop-subscriptions.csv")}><Download size={15}/> Export</Button><Button onClick={()=>openAdd("subscription")}><Plus size={16}/> New subscription</Button></div></div><Table columns={[
    {key:"id",label:"SUBSCRIPTION",render:r=><div><strong>{r.id}</strong><small className="subline">{dateLabel(r.start)} – {dateLabel(r.end)}</small></div>},
    {key:"customer",label:"CUSTOMER"}, {key:"plan",label:"PLAN"}, {key:"qty",label:"QTY"}, {key:"amount",label:"VALUE",render:r=><strong>{money(r.amount)}</strong>},
    {key:"status",label:"STATUS",render:r=><Status value={r.status}/>}, {key:"actions",label:"ACTIONS",render:r=><div className="row-actions">{r.status==="Active"&&<><button className="icon-btn" title="Generate invoice" aria-label="Generate invoice" onClick={()=>makeInvoice(r)}><ReceiptText size={16}/></button><button className="icon-btn" title="Pause subscription" aria-label="Pause subscription" onClick={()=>toggleSub(r,"Paused")}><Pause size={16}/></button><button className="icon-btn danger-icon" title="Close subscription" aria-label="Close subscription" onClick={()=>toggleSub(r,"Closed")}><X size={16}/></button></>}{r.status==="Paused"&&<><button className="icon-btn" title="Resume subscription" aria-label="Resume subscription" onClick={()=>toggleSub(r,"Active")}><Play size={16}/></button><button className="icon-btn danger-icon" title="Close subscription" aria-label="Close subscription" onClick={()=>toggleSub(r,"Closed")}><X size={16}/></button></>}{r.status==="Closed"&&<button className="icon-btn" title="Reactivate subscription" aria-label="Reactivate subscription" onClick={()=>toggleSub(r,"Active")}><RefreshCw size={16}/></button>}</div>}
  ]} rows={filtered(data.subscriptions,r=>[r.id,r.customer,r.plan,r.status])}/></section>;

  const renderInvoices = () => <section className="panel"><div className="panel-head"><div><h3>Invoices <span className="count">{data.invoices.length}</span></h3><p>Review billing, due dates and collections</p></div><div className="head-actions"><Button variant="outline" onClick={()=>exportCsv(data.invoices,"brightloop-invoices.csv")}><Download size={15}/> Export</Button><Button onClick={()=>openAdd("invoice")}><Plus size={16}/> Create invoice</Button></div></div><Table columns={[
    {key:"id",label:"INVOICE",render:r=><div><strong>{r.id}</strong><small className="subline">{dateLabel(r.issue)}</small></div>}, {key:"customer",label:"CUSTOMER"},
    {key:"due",label:"DUE DATE",render:r=><span className={r.status==="Overdue"?"overdue-text":""}>{dateLabel(r.due)}</span>},
    {key:"subtotal",label:"SUBTOTAL",render:r=>money(r.subtotal)}, {key:"total",label:"TOTAL",render:r=><strong>{money(r.total)}</strong>},
    {key:"status",label:"STATUS",render:r=><Status value={r.status}/>},
    {key:"actions",label:"ACTIONS",render:r=><div className="row-actions"><button className="icon-btn" title="View invoice" onClick={()=>setDetail({type:"Invoice",item:r})}><Eye size={16}/></button>{r.status!=="Paid"&&r.status!=="Cancelled"?<button className="icon-btn" title="Record payment" onClick={()=>setModal({type:"payment",invoiceId:r.id})}><CreditCard size={16}/></button>:null}</div>}
  ]} rows={filtered(data.invoices,r=>[r.id,r.customer,r.status,r.subId])}/></section>;

  const renderPayments = () => <section className="panel"><div className="panel-head"><div><h3>Payments <span className="count">{data.payments.length}</span></h3><p>Recorded transactions linked to invoices</p></div><div className="head-actions"><Button variant="outline" onClick={()=>exportCsv(data.payments,"brightloop-payments.csv")}><Download size={15}/> Export</Button><Button onClick={()=>openAdd("payment")}><Plus size={16}/> Record payment</Button></div></div><Table columns={[
    {key:"id",label:"PAYMENT",render:r=><div className="product-cell"><div className="product-icon green-icon"><CreditCard size={17}/></div><div><strong>{r.id}</strong><small>{r.method}</small></div></div>},
    {key:"customer",label:"CUSTOMER"}, {key:"invoiceId",label:"INVOICE"}, {key:"date",label:"DATE",render:r=>dateLabel(r.date)},
    {key:"amount",label:"AMOUNT",render:r=><strong>{money(r.amount)}</strong>}, {key:"note",label:"NOTE"}
  ]} rows={filtered(data.payments,r=>[r.id,r.customer,r.invoiceId,r.method,r.note])}/></section>;

  const renderDiscounts = () => <section className="panel"><div className="panel-head"><div><h3>Discount rules <span className="count">{data.discounts.length}</span></h3><p>Promotions, eligibility and usage limits</p></div><Button onClick={()=>openAdd("discount")}><Plus size={16}/> Create discount</Button></div><Table columns={[
    {key:"name",label:"DISCOUNT",render:r=><div><strong>{r.name}</strong><small className="subline">{r.id}</small></div>},
    {key:"type",label:"TYPE"}, {key:"value",label:"VALUE",render:r=><strong>{r.type==="Percentage"?`${r.value}%`:money(r.value)}</strong>},
    {key:"minQty",label:"MIN. QTY"}, {key:"start",label:"VALID FROM",render:r=>dateLabel(r.start)}, {key:"end",label:"VALID UNTIL",render:r=>dateLabel(r.end)},
    {key:"used",label:"USAGE",render:r=><div className="usage"><span>{r.used} / {r.limit}</span><div><i style={{width:`${Math.min(100,r.used/Math.max(1,r.limit)*100)}%`}}/></div></div>},
    {key:"status",label:"STATUS",render:r=><Status value={r.status}/>}
  ]} rows={filtered(data.discounts,r=>[r.id,r.name,r.type,r.status])}/></section>;

  const renderReports = () => <div className="stacked-panels"><div className="stats-grid report-stats"><Stat icon={TrendingUp} label="Recorded collections" value={money(paidRevenue)} delta="From payment records" color="green"/><Stat icon={ReceiptText} label="Invoice value" value={money(data.invoices.reduce((s,i)=>s+i.total,0))} delta={`${data.invoices.length} invoices`} color="blue"/><Stat icon={AlertCircle} label="Overdue invoices" value={overdue} delta={money(data.invoices.filter(i=>i.status==="Overdue").reduce((s,i)=>s+i.total,0))+" overdue"} color="orange"/><Stat icon={Users} label="Total customers" value={data.customers.length} delta="Customer records" color="purple"/></div><section className="panel"><div className="panel-head"><div><h3>Revenue trend</h3><p>Illustrative chart data; not calculated from the invoice ledger</p></div><Button variant="outline" onClick={()=>exportCsv(revenueData,"brightloop-revenue-demo.csv")}><Download size={15}/> Export chart data</Button></div><div className="report-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={revenueData}><defs><linearGradient id="reportFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7566f5" stopOpacity={0.2}/><stop offset="100%" stopColor="#7566f5" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0f5"/><XAxis dataKey="month" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false} tickFormatter={v=>`${Math.round(v/1000)}k`}/><Tooltip formatter={v=>money(v)}/><Area dataKey="revenue" stroke="#7566f5" fill="url(#reportFill)" strokeWidth={3}/></AreaChart></ResponsiveContainer></div></section><section className="panel"><div className="panel-head"><div><h3>Invoice status report</h3><p>Live summary from invoice records</p></div></div><Table columns={[{key:"status",label:"STATUS",render:r=><Status value={r.status}/>},{key:"count",label:"INVOICES"},{key:"total",label:"TOTAL VALUE",render:r=><strong>{money(r.total)}</strong>}]} rows={["Paid","Sent","Overdue","Cancelled"].map(status=>({id:status,status,count:data.invoices.filter(i=>i.status===status).length,total:data.invoices.filter(i=>i.status===status).reduce((s,i)=>s+i.total,0)}))}/></section></div>;

  const renderSettings = () => <section className="panel settings-panel"><div className="panel-head"><div><h3>Workspace settings</h3><p>Configure basic demo workspace preferences</p></div></div><form onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);setSettings({company:f.get("company"),tax:Number(f.get("tax")),currency:"INR"});notify("Settings updated. Tax applies to newly created invoices.");}}><Field label="Company name"><input name="company" defaultValue={settings.company} required/></Field><Field label="Default tax rate (%)"><input name="tax" type="number" min="0" max="100" step="0.01" defaultValue={settings.tax} required/></Field><Field label="Currency"><input value="INR — Indian Rupee" readOnly/></Field><div className="settings-note"><ShieldCheck size={18}/><div><strong>Demo mode</strong><p>This prototype stores records in this browser's local storage. It does not have multi-user authentication, a server database, or live payment processing.</p></div></div><Button><Settings size={16}/> Save settings</Button></form><div className="danger-zone"><div><strong>Reset demo data</strong><p>Restore the original sample records in this browser.</p></div><Button variant="danger" onClick={()=>{if(window.confirm("Reset all local Brightloop demo records? Your changes will be lost.")){localStorage.removeItem("brightloop-demo-v1");setData(seed);setSettings({tax:18,company:"Brightloop Software",currency:"INR"});resetFilters();notify("Demo data reset");}}}>Reset data</Button></div></section>;

  const renderPage = () => {
    if (page === "Overview") return renderDashboard();
    if (page === "Customers") return renderCustomers();
    if (page === "Products & Plans") return renderProductsPlans();
    if (page === "Subscriptions") return renderSubscriptions();
    if (page === "Invoices") return renderInvoices();
    if (page === "Payments") return renderPayments();
    if (page === "Discounts") return renderDiscounts();
    if (page === "Reports") return renderReports();
    return renderSettings();
  };

  const renderModal = () => {
    if (!modal) return null;
    const type = modal.type;
    const titles = { customer:"Add customer", product:"Add product", plan:"Create subscription plan", subscription:"New subscription", invoice:"Create invoice", payment:"Record payment", discount:"Create discount rule" };
    const today = new Date().toISOString().slice(0,10);
    return <Modal title={titles[type] || "Add record"} onClose={()=>setModal(null)} onSubmit={submitForm} submitLabel={type==="payment"?"Record payment":type==="invoice"?"Create invoice":"Save record"}>
      {type==="customer" && <><Field label="Full name *"><input name="name" placeholder="e.g. Aanya Sharma" required/></Field><Field label="Email address *"><input name="email" type="email" placeholder="name@company.com" required/></Field><Field label="Company"><input name="company" placeholder="Company name"/></Field></>}
      {type==="product" && <><Field label="Product name *"><input name="name" required placeholder="e.g. Workspace Pro"/></Field><div className="form-grid"><Field label="Product type"><select name="productType"><option>Software</option><option>Add-on</option><option>Service</option></select></Field><Field label="Variant"><input name="variant" placeholder="Standard"/></Field><Field label="Sales price (₹)"><input name="price" type="number" min="0" step="0.01" required/></Field><Field label="Cost price (₹)"><input name="cost" type="number" min="0" step="0.01" defaultValue="0" required/></Field></div><Field label="Notes"><textarea name="notes" rows="2" placeholder="Product details"/></Field></>}
      {type==="plan" && <><Field label="Plan name *"><input name="name" required placeholder="e.g. Pro Monthly"/></Field><Field label="Product *"><select name="productId" required defaultValue=""><option value="" disabled>Select product</option>{data.products.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></Field><div className="form-grid"><Field label="Billing cycle"><select name="cycle"><option>Daily</option><option>Weekly</option><option selected>Monthly</option><option>Yearly</option></select></Field><Field label="Price per cycle (₹)"><input name="price" type="number" min="0" required/></Field><Field label="Minimum quantity"><input name="minQty" type="number" min="1" defaultValue="1" required/></Field></div></>}
      {type==="subscription" && <><Field label="Customer *"><select name="customerId" required defaultValue=""><option value="" disabled>Select customer</option>{data.customers.filter(c=>c.status==="Active").map(c=><option key={c.id} value={c.id}>{c.name} — {c.id}</option>)}</select></Field><Field label="Plan *"><select name="planId" required defaultValue=""><option value="" disabled>Select plan</option>{data.plans.filter(p=>p.status==="Active").map(p=><option key={p.id} value={p.id}>{p.name} — {money(p.price)} / {p.cycle.toLowerCase()}</option>)}</select></Field><div className="form-grid"><Field label="Quantity"><input name="qty" type="number" min="1" defaultValue="1" required/></Field><Field label="Start date"><input name="start" type="date" defaultValue={today} required/></Field><Field label="Expiry date (optional)"><input name="end" type="date"/></Field></div><p className="form-hint">The quantity will be raised to the plan's minimum quantity if needed.</p></>}
      {type==="invoice" && <><Field label="Subscription *"><select name="subId" required defaultValue=""><option value="" disabled>Select subscription</option>{data.subscriptions.filter(s=>s.status==="Active").map(s=><option key={s.id} value={s.id}>{s.id} — {s.customer} — {money(s.amount)}</option>)}</select></Field><div className="form-grid"><Field label="Issue date"><input name="issue" type="date" defaultValue={today} required/></Field><Field label="Due date"><input name="due" type="date" defaultValue={today} required/></Field><Field label="Discount amount (₹)"><input name="discount" type="number" min="0" defaultValue="0"/></Field></div><p className="form-hint">Tax is calculated using the current {settings.tax}% default rate. Duplicate invoices for the same subscription and issue date are blocked.</p></>}
      {type==="payment" && <><Field label="Invoice *"><select name="invoiceId" required defaultValue={modal.invoiceId || ""} onChange={e=>{const inv=data.invoices.find(i=>i.id===e.target.value);const amountField=e.currentTarget.form?.elements.namedItem("amount");if(amountField&&inv)amountField.value=inv.total;}}><option value="" disabled>Select unpaid invoice</option>{data.invoices.filter(i=>i.status!=="Paid"&&i.status!=="Cancelled").map(i=><option key={i.id} value={i.id}>{i.id} — {i.customer} — {money(i.total)}</option>)}</select></Field><div className="form-grid"><Field label="Amount (₹)"><input name="amount" type="number" min="1" required defaultValue={modal.invoiceId ? data.invoices.find(i=>i.id===modal.invoiceId)?.total : ""}/></Field><Field label="Payment date"><input name="date" type="date" defaultValue={today} required/></Field></div><Field label="Payment method"><select name="method"><option>Bank transfer</option><option>Card</option><option>UPI</option><option>Cash</option><option>Other</option></select></Field><Field label="Note"><input name="note" placeholder="Optional payment reference"/></Field><p className="form-hint">Demo only: recording the full invoice amount marks that invoice as Paid. No real money is moved.</p></>}
      {type==="discount" && <><Field label="Discount name *"><input name="name" required placeholder="e.g. Early access offer"/></Field><div className="form-grid"><Field label="Discount type"><select name="discountType"><option>Percentage</option><option>Fixed</option></select></Field><Field label="Value"><input name="value" type="number" min="0.01" step="0.01" required/></Field><Field label="Minimum quantity"><input name="minQty" type="number" min="1" defaultValue="1"/></Field><Field label="Usage limit"><input name="limit" type="number" min="1" defaultValue="100"/></Field><Field label="Start date"><input name="start" type="date" defaultValue={today} required/></Field><Field label="End date"><input name="end" type="date" required/></Field></div><p className="form-hint">This creates a discount rule record. Automatic application to subscriptions is not yet implemented.</p></>}
    </Modal>;
  };

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav?"mobile-open":""}`}>
      <div className="brand"><div className="brand-mark"><span/><span/><span/><span/></div><div><strong>brightloop</strong><small>SUBSCRIPTION CLOUD</small></div><button className="mobile-close icon-btn" onClick={()=>setMobileNav(false)}><X size={18}/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <div className="workspace-switch"><div className="workspace-avatar">{settings.company.slice(0,1).toUpperCase()}</div><div><strong>{settings.company}</strong><small>Business workspace</small></div><ChevronDown size={15}/></div>
      <div className="nav-label">MENU</div>
      <nav>{nav.map(item=><button key={item.label} className={`nav-item ${page===item.label?"selected":""}`} onClick={()=>{setPage(item.label);resetFilters();setMobileNav(false);}}><item.icon size={18}/><span>{item.label}</span>{item.label==="Invoices"&&overdue>0?<em>{overdue}</em>:null}</button>)}</nav>
      <div className="nav-label settings-label">PREFERENCES</div><button className={`nav-item ${page==="Settings"?"selected":""}`} onClick={()=>{setPage("Settings");resetFilters();setMobileNav(false);}}><Settings size={18}/><span>Settings</span></button>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><ShieldCheck size={17}/></div><strong>Need a hand?</strong><p>Explore your workspace and test the demo workflows.</p><button onClick={()=>notify("This is the Brightloop hackathon demo workspace.")}>Learn more <ArrowUpRight size={13}/></button></div><div className="profile-row"><div className="profile-avatar">AD</div><div><strong>Admin Demo</strong><small>Administrator · Demo</small></div><MoreHorizontal size={18}/></div></div>
    </aside>
    {mobileNav && <div className="mobile-scrim" onClick={()=>setMobileNav(false)}/>}
    <main className="main">
      <header className="topbar"><div className="top-left"><button className="menu-toggle icon-btn" onClick={()=>setMobileNav(true)}><Menu size={20}/></button><div className="breadcrumbs">Workspace <span>/</span> <strong>{page}</strong></div></div><div className="top-actions"><div className="top-search"><Search size={16}/><input aria-label="Search current page" placeholder="Search records..." value={search} onChange={e=>setSearch(e.target.value)}/><kbd>⌘ K</kbd></div><button className="notification-btn" onClick={()=>notify(`${overdue} overdue invoice(s) need attention.`)} aria-label="Notifications"><Bell size={18}/>{overdue>0&&<i/>}</button><div className="top-divider"/><div className="top-user"><div className="profile-avatar">AD</div><div><strong>Admin Demo</strong><small>Administrator</small></div><ChevronDown size={14}/></div></div></header>
      <div className="content"><div className="page-heading"><div><div className="page-eyebrow">BRIGHTLOOP WORKSPACE</div><h1>{pageTitle}</h1><p>{pageDescription}</p></div><div className="page-meta">{page==="Reports"&&<Button variant="outline" onClick={exportReportSummary}><Download size={15}/> Export summary</Button>}<span className="demo-pill"><i/> Demo environment</span><span><CalendarDays size={14}/> {new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</span></div></div>
      {page==="Settings" ? renderSettings() : renderPage()}
      <footer><span>© 2026 {settings.company}</span><span><i/> Demo environment · Sample data may not reflect real revenue</span></footer></div>
    </main>
    {renderModal()}
    {detail && <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&setDetail(null)}><div className="modal detail-modal"><div className="modal-head"><div><h2>{detail.type} details</h2><p>{detail.item.id}</p></div><button className="icon-btn" onClick={()=>setDetail(null)}><X size={19}/></button></div><div className="detail-content">{Object.entries(detail.item).map(([key,value])=><div className="detail-row" key={key}><span>{key.replace(/([A-Z])/g," $1").replace(/^./,s=>s.toUpperCase())}</span><strong>{key.toLowerCase().includes("amount")||["total","subtotal","tax","discount","price","cost"].includes(key)?money(value):key==="status"?<Status value={value}/>:typeof value==="number"?value:String(value??"—")}</strong></div>)}</div><div className="modal-foot"><Button variant="outline" onClick={()=>setDetail(null)}>Close</Button></div></div></div>}
    {toast&&<div className="toast"><CircleCheck size={17}/>{toast}<button onClick={()=>setToast("")}><X size={15}/></button></div>}
  </div>;
}

function Stat({ icon: Icon, label, value, delta, color }) {
  return <div className="stat-card"><div className="stat-top"><div className={`stat-icon ${color}`}><Icon size={19}/></div><button className="icon-btn subtle-icon" aria-label={`${label} information`} title={delta}><MoreHorizontal size={18}/></button></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-delta"><span className="delta-dot"/> {delta}</div></div>;
}
function Avatar({ name }) {
  const initials = String(name).split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase();
  return <div className="person-avatar">{initials}</div>;
}
export default App;
