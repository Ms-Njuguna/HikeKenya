import React, { useEffect, useState } from 'react';

const Reviews = ({ trailId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!trailId) {
            setLoading(false);
            return;
        }

        fetch(`http://localhost:3000/reviews?trailId=${trailId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch reviews');
            }
            return res.json();
        })
        .then(data => {
            setReviews(data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching reviews:", err);
            setError("Failed to load reviews. Please try again.");
            setLoading(false);
        });
    }, [trailId]);

    if (loading) {
        return <p>Loading reviews...</p>;
    }

    if (error) {
        return <p className="text-red-600">{error}</p>;
    }

    return (
        <div className="mt-4 border-t border-gray-100 border-opacity-10 pt-4">
            <h4 className="text-lg font-semibold mb-2">Reviews</h4>
            {reviews.length === 0 ? (
                <p className="text-gray-600 italic">No reviews yet for this trail.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review.id} className="bg-gray-100 p-3 rounded-[8px] mb-2">
                        <p className="font-medium">{review.userName || review.username}</p> {/* Handle both keys */}
                        <p className="text-gray-700 text-sm">{review.comment}</p>
                        <p className="text-gray-500 text-xs">
                            {new Date(review.date).toLocaleDateString()}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Reviews;