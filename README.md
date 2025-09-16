# Interschool Travel CRM

A comprehensive Customer Relationship Management system for educational travel companies to manage schools, tours, bookings, and suppliers. Built with React, TypeScript, and Supabase.

🌐 **Live Demo**: [Your Netlify URL will go here]

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/interschool-travel-crm.git
   cd interschool-travel-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your Supabase credentials to .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Features

- 🏫 **School Management**: Track school contacts and information
- 🗺️ **Tour Management**: Create and manage educational tours with detailed itineraries
- 📅 **Booking System**: Handle enquiries through to completed bookings
- 🏢 **Supplier Network**: Manage accommodation, attraction, and activity providers
- 📝 **Activity Tracking**: Log communications and interactions
- 📊 **Dashboard Analytics**: View booking pipeline and key metrics
- 💰 **Quotation System**: Generate detailed tour quotations with cost breakdowns
- 📤 **CSV Import/Export**: Bulk import schools, tours, and suppliers

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Build Tool**: Vite
- **Deployment**: Netlify
- **Icons**: Lucide React
- **State Management**: React Context API

## Deployment

See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for complete setup instructions with GitHub, Supabase, and Netlify.

## Database Setup

The application uses Supabase PostgreSQL with the following main tables:
- `schools`: Educational institutions
- `trips`: Tour offerings
- `bookings`: Booking records with status tracking
- `suppliers`: Service providers
- `excursions`: Activities and attractions
- `booking_excursions`: Link between bookings and excursions
- `activities`: Communication and interaction logs

## 📱 Screenshots

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Booking Management
![Bookings](./screenshots/bookings.png)

### Quotation System
![Quotations](./screenshots/quotations.png)

*Screenshots will be added after deployment*

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for setup help
2. Open an issue on GitHub
3. Check the Supabase and Netlify documentation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.