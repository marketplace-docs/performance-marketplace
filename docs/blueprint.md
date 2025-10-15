# **App Name**: Fulfillment Marketplace

## Core Features:

- Key Metrics Summary: Display forecast, actual packed orders, OOS orders, fulfillment rate, progress, and actual OOS percentage, with trend indicators compared to the previous day.
- Order Status Backlog: Provide a detailed table view of order status, including 'Payment Accepted', 'In Progress', 'Picked', and 'Packed', with order count, item count, and average items per order.
- Daily Breakdown: Showcase a small table presenting daily 'Actual' packed orders and the 'Total' packed orders for the period, including the 'Fulfillment %' per day.
- Data Visualization: Offer visual representations with a bar chart (order count per status) and a line chart (daily forecast vs. actual progress).
- Real-time Progress Calculation: The system updates progress in real-time every 15 minutes based on order status changes.
- Admin Input Form: Provide an admin interface for planners to input daily forecast, OOS data, and optional remarks into the forecast_monitoring table.

## Style Guidelines:

- Primary color: Use a calm blue (#73A5EB) to represent progress and stability.
- Background color: A very light, desaturated blue (#F0F4F8) to provide a clean, unobtrusive backdrop.
- Accent color: A soft green (#A2D9CE) to highlight successful fulfillment and positive metrics, with a contrasting color like red for Out-of-Stock alerts.
- Body and headline font: Use 'Inter', a sans-serif font, for a modern and readable interface. Use 'Source Code Pro' for snippets of code
- Use simple, clear icons to represent different order statuses and metrics, ensuring they are intuitive and easily understandable.
- Design a clean, well-organized layout with a clear hierarchy, using cards for key metrics, tables for backlog details, and intuitive charts for visualization.
- Incorporate subtle animations for data updates and transitions to provide visual feedback and enhance user engagement.