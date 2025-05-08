// File: pages/doctors/add.js
"use client";
import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function AddDoctor() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    gender: '',
    rating: '',
    fee: '',
    experience: '',
   profilePicture: ''
  });

  // ✅ This was missing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        rating: parseFloat(formData.rating),
        fee: parseFloat(formData.fee),
        experience: parseFloat(formData.experience)
      };
      console.log(payload)
      await axios.post('https://andaz-project-rhb3.vercel.app/api/doctors/add-doctor', payload);
      alert('Doctor added successfully!');
      router.push('/');
    } catch (error) {
      console.log('Error adding doctor:', error.response?.data || error.message);
      alert('Error adding doctor');
    }
  };

  return (
    <>
      <Head>
        <title>Add Doctor | Apollo Clone</title>
        <meta name="description" content="Add a new doctor to the system." />
      </Head>

      <div className="container">
        <h1>Add New Doctor</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="text" name="specialty" placeholder="Specialty" onChange={handleChange} required />
          <select name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="number" name="rating" placeholder="Rating" onChange={handleChange} required />
          <input type="number" name="fee" placeholder="Fee" onChange={handleChange} required />
          <input type="number" name="experience" placeholder="Years of Experience" onChange={handleChange} required />
          <input type="text" name="profilePicture" placeholder="Image URL (optional)" onChange={handleChange} />
          <button type="submit">Add Doctor</button>
        </form>

        <style jsx>{`
          .container {
            max-width: 600px;
            margin: 2rem auto;
            padding: 2rem;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
          }
          h1 {
            text-align: center;
            margin-bottom: 1.5rem;
          }
          form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          input, select {
            padding: 0.8rem;
            font-size: 1rem;
            border-radius: 5px;
            border: 1px solid #ccc;
          }
          button {
            padding: 0.8rem;
            background: #0070f3;
            color: white;
            font-weight: bold;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            background: #005bb5;
          }
        `}</style>
      </div>
    </>
  );
}
