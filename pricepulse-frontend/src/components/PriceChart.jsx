// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   Legend
// } from "recharts";

// const PriceChart = ({ data }) => {

//   const formatted = data.map(item => ({
//   price: item.price,
//   time: new Date(item.date).toLocaleTimeString([], {
//     hour: '2-digit',
//     minute: '2-digit'
//   })
// }));

//   // Custom tooltips configuration for dark theme
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="glass" style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
//           <p style={{ margin: 0, color: '#f8fafc', fontWeight: 600, fontSize: '14px' }}>Time: {label}</p>
//           <p style={{ margin: '4px 0 0 0', color: '#a78bfa', fontWeight: 700, fontSize: '16px' }}>
//             ₹{payload[0].value}
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div style={{ width: "100%", height: 350, marginTop: "16px" }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={formatted} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//           <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
//           <XAxis 
//             dataKey="time" 
//             stroke="#64748b" 
//             tick={{ fill: '#64748b', fontSize: 12 }} 
//             axisLine={false}
//             tickLine={false}
//             dy={10}
//           />
//           <YAxis 
//             stroke="#64748b" 
//             tick={{ fill: '#64748b', fontSize: 12 }}
//             axisLine={false}
//             tickLine={false}
//             tickFormatter={(value) => `₹${value}`}
//             dx={-10}
//           />
//           <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '3 3' }} />
//           <Legend wrapperStyle={{ paddingTop: '20px' }} />
//           <Line
//             type="monotone"
//             dataKey="price"
//             name="Price Trend"
//             stroke="url(#colorPrice)"
//             strokeWidth={3}
//             dot={{ r: 4, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
//             activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
//           />
//           <defs>
//             <linearGradient id="colorPrice" x1="0" y1="0" x2="1" y2="0">
//               <stop offset="0%" stopColor="#6366f1" />
//               <stop offset="100%" stopColor="#8b5cf6" />
//             </linearGradient>
//           </defs>
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default PriceChart;
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   Legend
// } from "recharts";

// const PriceChart = ({ data }) => {

//   const formatted = data.map(item => ({
//   price: item.price,
//   time: new Date(item.date).toLocaleTimeString([], {
//     hour: '2-digit',
//     minute: '2-digit'
//   })
// }));

//   // Custom tooltips configuration for dark theme
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="glass" style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
//           <p style={{ margin: 0, color: '#f8fafc', fontWeight: 600, fontSize: '14px' }}>Time: {label}</p>
//           <p style={{ margin: '4px 0 0 0', color: '#a78bfa', fontWeight: 700, fontSize: '16px' }}>
//             ₹{payload[0].value}
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div style={{ width: "100%", height: 350, marginTop: "16px" }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={formatted} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//           <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
//           <XAxis 
//             dataKey="time" 
//             stroke="#64748b" 
//             tick={{ fill: '#64748b', fontSize: 12 }} 
//             axisLine={false}
//             tickLine={false}
//             dy={10}
//           />
//           <YAxis 
//             stroke="#64748b" 
//             tick={{ fill: '#64748b', fontSize: 12 }}
//             axisLine={false}
//             tickLine={false}
//             tickFormatter={(value) => `₹${value}`}
//             dx={-10}
//           />
//           <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '3 3' }} />
//           <Legend wrapperStyle={{ paddingTop: '20px' }} />
//           <Line
//             type="monotone"
//             dataKey="price"
//             name="Price Trend"
//             stroke="url(#colorPrice)"
//             strokeWidth={3}
//             dot={{ r: 4, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
//             activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
//           />
//           <defs>
//             <linearGradient id="colorPrice" x1="0" y1="0" x2="1" y2="0">
//               <stop offset="0%" stopColor="#6366f1" />
//               <stop offset="100%" stopColor="#8b5cf6" />
//             </linearGradient>
//           </defs>
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default PriceChart;
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

const PriceChart = ({ data }) => {

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  // 🔥 Group by timestamp
  const grouped = {};

  data.forEach(item => {
    const time = new Date(item.recordedAt).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });

    if (!grouped[time]) {
      grouped[time] = { time };
    }

    grouped[time][item.seller] = item.price;
  });

  const chartData = Object.values(grouped);

  // 🔥 Extract unique sellers
  const sellers = [...new Set(data.map(d => d.seller))];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData}>
        
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="time" />
        <YAxis />

        <Tooltip />
        <Legend />

        {sellers.map((seller, index) => (
          <Line
            key={seller}
            type="monotone"
            dataKey={seller}
            stroke={`hsl(${index * 120}, 70%, 50%)`}
            strokeWidth={2}
          />
        ))}

      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;