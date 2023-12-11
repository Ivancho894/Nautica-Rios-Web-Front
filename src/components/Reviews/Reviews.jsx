import React, { useState, useEffect } from 'react';
import {db} from '../../../firebase-config'; 

const ReviewStars = ({ productId }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const doc = await db.collection('reviews').doc(productId).get();
        if (doc.exists) {
          setRating(doc.data().rating);
        }
      } catch (error) {
        console.error('Error al obtener la calificación:', error);
      }
    };

    fetchRating();
  }, [productId]);

  const handleStarClick = async (selectedRating) => {
    try {
      await db.collection('reviews').doc(productId).set({
        rating: selectedRating,
      });

      setRating(selectedRating);
    } catch (error) {
      console.error('Error al actualizar la calificación:', error);
    }
  };

  return (
    <div>
      <p>Calificación: {rating}</p>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer ${
            star <= rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
          onClick={() => handleStarClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default ReviewStars;
