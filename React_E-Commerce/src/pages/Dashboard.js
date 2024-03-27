
import { Footer, Navbar } from "../components";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';


const Dashboard = () => {
  // Données du graphique
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Ventes mensuelles',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Navbar />
    <div style={dashboardStyle}>
      <h1 style={headingStyle}>Dashboard</h1>
      <div style={chartContainer}>
        <Bar data={chartData} />
      </div>
    </div>
    <Footer />
    </div>
  );
};

const dashboardStyle = {
  padding: '20px',
  backgroundColor: '#f4f4f4',
  minHeight: '100vh',
};

const headingStyle = {
  color: '#333',
  textAlign: 'center',
};

const chartContainer = {
  marginTop: '20px',
};

export default Dashboard;

