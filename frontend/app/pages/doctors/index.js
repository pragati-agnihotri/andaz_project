// File: pages/doctors/index.js
"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({ gender: '', rating: '', feeMin: '', feeMax: '' });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchDoctors = async () => {
    const { gender, rating, feeMin, feeMax } = filters;
    const res = await axios.get(`http://localhost:5000/api/doctors/list-doctor-with-filter`, {
      params: { page, limit: 6, gender, rating, feeMin, feeMax }
    });
    setDoctors(res.data.data);
    setTotal(res.data.total);
  };

  useEffect(() => {
    fetchDoctors();
  }, [filters, page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = ['feeMin', 'feeMax'].includes(name) ? Number(value) || '' : value;
    setFilters((prev) => ({ ...prev, [name]: parsedValue }));
    setPage(1); 
  };
  
  return (
    <>
      <Head>
        <title>Best General Physicians | Apollo 24|7</title>
        <meta name="description" content="Book online consultations with the best General Physicians from Apollo 24|7." />
      </Head>

      <div className="wrapper">
        <header className="header">
          <h1>Doctors Listing</h1>
        </header>

        <div className="main">
          <aside className="filters">
            <h2>Filters</h2>
            <label>Gender:
              <select name="gender" onChange={handleFilterChange}>
                <option value="">All</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </label>

            <label>Rating (min):
              <select name="rating" onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
               
              </select>
            </label>

            <label>Fee Range:
              <input type="number" name="feeMin" placeholder="Min" onChange={handleFilterChange} />
              <input type="number" name="feeMax" placeholder="Max" onChange={handleFilterChange} />
            </label>
          </aside>

          <section className="doctors-list">
            {doctors.map((doc) => (
              <div key={doc._id} className="doctor-card">
  <div className="doctor-image">
  <img src={doc.profilePicture} alt={console.log(doc)} /></div>
  <div className="doctor-info">
    <h3>{doc.name}</h3>
    <p className="specialty">{doc.specialty}</p>
    <p>🧑‍⚕️ Experience: <strong>{doc.experience} yrs</strong></p>
    <p>⭐ Rating: <strong>{doc.rating}</strong></p>
    <p>💸 Fee: <strong>₹ {doc.fee}</strong></p>
  </div>
</div>
))}
          </section>
        </div>

        <div className="pagination">
          {Array.from({ length: Math.ceil(total / 6) }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .wrapper {
          font-family: 'Segoe UI', sans-serif;
          max-width: 1200px;
          margin: auto;
          padding: 1rem;
        }
        .header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .main {
          display: flex;
          gap: 2rem;
        }
        .filters {
          width: 25%;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 10px;
        }
        .filters h2 {
          margin-bottom: 1rem;
        }
        .filters label {
          display: block;
          margin-bottom: 1rem;
        }
        .filters input,
        .filters select {
          width: 100%;
          padding: 0.5rem;
          margin-top: 0.3rem;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .doctors-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          flex: 1;
        }
        .doctor-card {
          background: white;
          padding: 1rem;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          text-align: center;
        }
        .doctor-card img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 50%;
          margin-bottom: 1rem;
        }
        .doctor-card h3 {
          margin: 0.5rem 0;
          color: #0070f3;
        }

        .pagination {
          text-align: center;
          margin-top: 2rem;
        }
        .pagination button {
          margin: 0 5px;
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          background-color: #eee;
          cursor: pointer;
        }
        .pagination button.active {
          background-color: #0070f3;
          color: white;
          font-weight: bold;
        }
        .doctor-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s ease;
}

.doctor-card:hover {
  transform: translateY(-5px);
}

.doctor-image {
  background: #f0f0f0;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.doctor-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #0070f3;
}

.doctor-info {
  padding: 1rem;
  text-align: center;
}

.doctor-info h3 {
  margin: 0.5rem 0 0.2rem;
  color: #0070f3;
  font-size: 1.1rem;
}

.doctor-info .specialty {
  color: #444;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.doctor-info p {
  margin: 0.3rem 0;
  font-size: 0.95rem;
}

      `}</style>
    </>
  );
}
