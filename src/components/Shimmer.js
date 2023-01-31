const Shimmer = () => {
  return (
    <>
      <div className="restaurant-list-shimmer">
        {Array(10)
          .fill([])
          .map((e, index) => (
            <div key={index} className="card-shimmer">
              <div className="img-shimmer"></div>
              <div className="heading-shimmer"></div>
              <div className="details-shimmer"></div>
              <div className="details-shimmer"></div>
            </div>
          ))}
      </div>
    </>
  );
};
export default Shimmer;
