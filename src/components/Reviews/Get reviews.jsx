import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase-config';
import { collection, getDocs, addDoc, where, query, updateDoc, limit } from 'firebase/firestore';

const ReviewStars = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const reviewsRef = collection(db, 'reviews');
        const q = query(reviewsRef, where('productId', '==', productId), limit(1));

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setRating(doc.data().averageRating);
        }
      } catch (error) {
        console.error('Error al obtener la calificación:', error);
      }
    };

    fetchRating();
  }, [productId]);

  


};

export default ReviewStars;

