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

  const handleStarClick = async (selectedRating) => {
    try {
      const reviewsRef = collection(db, 'reviews');
      const q = query(reviewsRef, where('productId', '==', productId), limit(1));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const currentRating = Number(doc.data().averageRating) || 0;
        const totalReviews = doc.data().totalReviews || 0;

        await updateDoc(doc.ref, {
          averageRating: (currentRating * totalReviews + selectedRating) / (totalReviews + 1),
          totalReviews: totalReviews + 1,
        });

        setRating(() => selectedRating);
      } else {
        await addDoc(reviewsRef, {
          productId,
          averageRating: selectedRating,
          totalReviews: 1,
        });

        setRating(() => selectedRating);
      }
    } catch (error) {
      console.error('Error al actualizar la calificación:', error);
    }
  };

  const resetRating = async () => {
    try {
      const reviewsRef = collection(db, 'reviews');
      const q = query(reviewsRef, where('productId', '==', productId), limit(1));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        await updateDoc(doc.ref, {
          averageRating: 0,
          totalReviews: 0,
        });

        setRating(0);
      }
    } catch (error) {
      console.error('Error al reiniciar la calificación:', error);
    }
  };

  return (
    <div>
      <p>Calificación: {rating ? rating.toFixed(2) : 'N/A'}</p>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          role="button"
          className={`cursor-pointer ${
            star <= (hoveredRating || rating) ? 'text-yellow-500' : 'text-gray-300'
          }`}
          
          aria-label={`Calificar con ${star} estrellas`}
        >
          ★
        </span>
      ))}
      {/* <button className='bg-[#f80000]' onClick={resetRating}>Reiniciar Review</button> */}
    </div>
  );
};

export default ReviewStars;

