import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="text-center mt-5">

      <div className="skeleton-loader" />
      <div className="skeleton-loader" />
      <div className="skeleton-loader" />
      <div className="skeleton-loader" />
      <div className="skeleton-loader" />
      
      <style jsx>{`
        .skeleton-loader {
          width: 80%;
          height: 20px;
          margin: 10px auto;
          border-radius: 4px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }

        @keyframes loading {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SkeletonLoader;
