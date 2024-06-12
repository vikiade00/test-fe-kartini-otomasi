import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL_API}/products`).then((response) => {
      const transformedData = response.data.products.map((product) => ({
        name: product.title,
        price: product.price,
        rating: product.rating,
        stock: product.stock,
      }));
      setData(transformedData);
    });
  }, []);

  return (
    <div className="pt-5 pl-10 flex flex-col w-full">
      <div className="text-xl font-semibold mb-5 flex justify-between">
        Dashboard
      </div>
      <div className="mt-10">
        <div className="mb-2">Graphic Product</div>
        <ComposedChart width={960} height={250} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area
            type="monotone"
            dataKey="price"
            fill="#8884d8"
            stroke="#8884d8"
          />
          <Bar dataKey="rating" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="stock" stroke="#ff7300" />
        </ComposedChart>
      </div>
    </div>
  );
}

export default Dashboard;
