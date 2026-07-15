# Guide: Adding Edit/Delete to Remaining Pages

## ✅ Completed Pages:
1. **Rooms** - Edit & Delete working
2. **Bookings** - Edit & Delete working  
3. **Housekeeping** - Edit & Delete working

## 📋 Pattern to Follow for Remaining Pages:

### Step 1: Update Imports
```typescript
import { Pencil, Trash2, Plus } from "lucide-react";
import api from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
```

### Step 2: Add State
```typescript
const [editOpen, setEditOpen] = useState(false);
const [editingItem, setEditingItem] = useState<ItemType | null>(null);
```

### Step 3: Add Functions
```typescript
const handleEdit = async (event: React.FormEvent) => {
  // Call api.updateXXX()
  // Update state
  // Show toast
};

const handleDelete = async (item: ItemType) => {
  if (!confirm("Are you sure?")) return;
  // Call api.deleteXXX()
  // Update state
  // Show toast
};

const openEditDialog = (item: ItemType) => {
  setEditingItem(item);
  // Set form values
  setEditOpen(true);
};
```

### Step 4: Add Buttons to Table/Cards
```typescript
<td className="px-5 py-3">
  <div className="flex justify-end gap-2">
    <Button size="sm" variant="ghost" onClick={() => openEditDialog(item)}>
      <Pencil className="h-3 w-3" />
    </Button>
    <Button 
      size="sm" 
      variant="ghost" 
      className="text-destructive hover:text-destructive hover:bg-destructive/10"
      onClick={() => handleDelete(item)}
    >
      <Trash2 className="h-3 w-3" />
    </Button>
  </div>
</td>
```

### Step 5: Add Edit Dialog
Copy the Add dialog structure and:
- Change `open={addOpen}` to `open={editOpen}`
- Change `onOpenChange={setAddOpen}` to `onOpenChange={setEditOpen}`
- Change `onSubmit={handleCreate}` to `onSubmit={handleEdit}`
- Change button text from "Add" to "Update"

## 🔧 TODO Pages:

### 1. **Billing Page**
- Needs backend routes for invoices (already created!)
- API methods available: `api.getInvoices()`, `api.updateInvoice()`, `api.deleteInvoice()`
- Follow the pattern above

### 2. **Guests Page**
- Currently uses local state
- Can use bookings data for guests OR create separate guests table
- Option A: Extract guests from bookings
- Option B: Create backend `/api/guests` routes

### 3. **Staff Page**
- Needs backend routes: `/api/staff`
- Create staff.routes.js in backend similar to housekeeping
- Add API methods to frontend/src/lib/api.ts
- Follow the pattern above

## 🚀 Quick Commands for Backend Routes:

### Create Staff Routes (backend/src/routes/staff.routes.js):
```javascript
import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET all staff
router.get('/', authenticateToken, async (req, res) => {
  // ...
});

// POST create staff
router.post('/', authenticateToken, async (req, res) => {
  // ...
});

// PUT update staff
router.put('/:id', authenticateToken, async (req, res) => {
  // ...
});

// DELETE staff
router.delete('/:id', authenticateToken, async (req, res) => {
  // ...
});

export default router;
```

Then add to server.js:
```javascript
import staffRoutes from './routes/staff.routes.js';
app.use('/api/staff', staffRoutes);
```

And add to frontend API client:
```typescript
async getStaff() { /* ... */ }
async createStaff(staff: any) { /* ... */ }
async updateStaff(id: string, staff: any) { /* ... */ }
async deleteStaff(id: string) { /* ... */ }
```

## 📝 Notes:
- All patterns are already implemented in Rooms, Bookings, and Housekeeping
- Copy the structure and adapt field names
- Test each page after implementation
- Housekeeping is the simplest example to follow
