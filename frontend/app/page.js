// File: app/page.js
"use client";
import { useState } from "react";
import DoctorsPage from "./pages/doctors/index.js";
import AddDoctor from "./pages/doctors/add.js";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '0.6rem 1.2rem',
            background: '#0070f3',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Back to List' : 'Add Doctor'}
        </button>
      </div>
      {showForm ? <AddDoctor /> : <DoctorsPage />}
    </div>
  );
}

